import React, { useEffect,useState } from 'react';
import { DataGrid, esES, GridOverlay, GridToolbarDensitySelector, GridToolbarContainer } from '@mui/x-data-grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useDBContext } from '../../Config/DBProvider';
import { Typography } from '@material-ui/core';
import Item from '../../components/Item';

export const Clientes = ()=>{
    const { getDataCollection, updateDataCollection, setState, isLoading  } = useDBContext();
    const [ dataRowsBody, setdataRowsBody ] = useState([])
    const [ editRowsModel, setEditRowsModel ] = useState({});

    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
      }, []);

    const columns = [
        { field: 'Rutcliente', headerName: 'Rut Cliente',  width: 150,  headerAlign: 'center', editable: false },
        { field: 'RazonSocial', headerName: 'Razon Social', flex: 1, editable: false },
        { field: 'email', headerName: 'Correo', type: 'string', width: 250, headerAlign: 'center', editable: true },
        { field: 'datetime', headerName: 'Fecha Registro', type: 'date', headerAlign: 'center', width: 160, editable: false }

    ];

    function Toolbar() {
        return (
          <GridToolbarContainer style={{ flexDirection: 'row-reverse'}}>
            <Item>
                <GridToolbarDensitySelector />
            </Item>
          </GridToolbarContainer>
        );
      }

    function CustomLoadingOverlay() {
        return (
            <GridOverlay>
                <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                    <LinearProgress />
                </div>
            </GridOverlay>
        );
    }

    const commitChanges = ( id ) => {
        const model = editRowsModel[id];
        const data = Object.assign({}, ...Object.keys(model).map( key => {return ({[key]: model[key].value})}))
        if (data) {
            updateDataCollection('Clientes', id, data)
        }else{
            console.error('no se puede actualizar una entrada vacia')
        }
    }

    useEffect(() => {
        getDataCollection('Clientes').then((data) => {
            setdataRowsBody(data)
            setState((prevState) => ({...prevState, DataSetClientes: data }))
        })
    },[])

    return  (
        <>
            <Typography variant="h4" color="textSecondary">Clientes Registrados</Typography>
            <div style={{ width: '100%' }}>
            <DataGrid
                localeText={esES.props.MuiDataGrid.localeText}
                rows={dataRowsBody}
                columns={columns}
                pageSize={20}
                rowHeight={25}
                rowsPerPageOptions={[20]}
                autoHeight
                pagination
                editMode="row"
                components={{
                    LoadingOverlay: CustomLoadingOverlay,
                    Toolbar: Toolbar,
                }}
                loading={isLoading}
                checkboxSelection
                disableSelectionOnClick
                onRowEditCommit={(id)=> commitChanges(id) }
                editRowsModel={editRowsModel}
                onEditRowsModelChange={handleEditRowsModelChange}
            />
            </div>
        </>
    );

}