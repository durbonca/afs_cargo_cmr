import React, {useEffect} from 'react';
import { /* DataGrid, */ esES, /* GridOverlay, GridToolbarContainer, GridToolbarDensitySelector */ } from '@mui/x-data-grid';
// import LinearProgress from '@material-ui/core/LinearProgress';
import { useDBContext } from '../../Config/DBProvider';
// import { Typography } from '@material-ui/core';
// import CSVImport from '../../components/CSVImport/CSVImport';
// import Item from '../../components/Item';

// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/DeleteOutlined';
// import SaveIcon from '@material-ui/icons/Save';
// import CancelIcon from '@material-ui/icons/Close';

export const RcvVenta = ()=>{
    const { getDataCollection, updateDataCollection, DataSet, isLoading } = useDBContext();
    const [ editRowsModel, setEditRowsModel ] = React.useState({});

    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
      }, []);

    const columns = [
        { field: 'Rutcliente', headerName: 'Rut Cliente',  width: 150,  headerAlign: 'center', align: 'right', editable: true },
        { field: 'RazonSocial', headerName: 'Razon Social', flex: 1, minWidth: 200, editable: true },
        { field: 'email', headerName: 'Email', width: 160, hide: true, editable: true },
        { field: 'Folio', headerName: 'Folio', width: 110, headerAlign: 'center', align: 'right', editable: true },
        { field: 'FechaDocto', headerName: 'Fecha Docto', type: 'date', headerAlign: 'center', align: 'right', width: 160, editable: false },
        { field: 'Montototal', headerName: 'Monto total', width: 150, align: 'right', editable: true },
        { field: 'NCEoNDEsobreFact.deCompra', headerName: 'NCE/NDE', width: 150, align: 'right', editable: true }
    ];

    function CustomLoadingOverlay() {
        return (
            <GridOverlay>
                <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                    <LinearProgress />
                </div>
            </GridOverlay>
        );
    }
    

    function Toolbar() {
        return (
          <GridToolbarContainer style={{ flexDirection: 'row-reverse'}}>
            <Item>
                <CSVImport />
            </Item>
            <Item>
                <GridToolbarDensitySelector />
            </Item>
          </GridToolbarContainer>
        );
      }

    const commitChanges = ( id ) => {
        // construct object from editRowsModel
        const model = editRowsModel[id];
        const data = Object.assign({}, ...Object.keys(model).map( key => {return ({[key]: model[key].value})}))
        if (data) {
            updateDataCollection('XCobrarSCV', id, data)
        }else{
            console.error('no se puede actualizar una entrada vacia')
        }
    }

    useEffect(() => {
        getDataCollection('XCobrarCSV')
    },[])

    return  (
        <>
            <Typography style={{margin:'2rem'}} variant="h4" component="h1" color="textSecondary">Datos Cargados Rcv Venta</Typography>
            <div style={{ height: 'auto', width: '100%' }}>
                <DataGrid
                    localeText={esES.props.MuiDataGrid.localeText}
                    rows={DataSet}
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