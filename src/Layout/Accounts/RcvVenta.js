import React, {useEffect} from 'react';
import { DataGrid, esES, GridOverlay, GridToolbarContainer, GridToolbarDensitySelector } from '@mui/x-data-grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useDBContext } from '../../Config/DBProvider';
import { Typography, Button } from '@material-ui/core';
import CSVImport from '../../components/CSVImport/CSVImport';
import Item from '../../components/Item';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { Modal } from '@material-ui/core'

// import EditIcon from '@material-ui/icons/Edit';
// import SaveIcon from '@material-ui/icons/Save';
// import CancelIcon from '@material-ui/icons/Close';

export const RcvVenta = ()=>{
    const { getDataCollection, updateDataCollection, delDataCollection, DataSet, setState, isLoading } = useDBContext();
    const [ editRowsModel, setEditRowsModel ] = React.useState({});
    const [ openModal, setOpenModal] = React.useState(false);
    const [ editRows, setEditRows ] = React.useState([]);

    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
      }, []);

    const columns = [
        { field: 'Rutcliente', headerName: 'Rut Cliente',  width: 150,  headerAlign: 'center', align: 'right', editable: true },
        { field: 'RazonSocial', headerName: 'Razon Social', flex: 1, minWidth: 200, editable: true },
        { field: 'Folio', headerName: 'Folio', width: 110, headerAlign: 'center', align: 'right', editable: true },
        { field: 'FechaDocto', headerName: 'Fecha Docto', type: 'date', headerAlign: 'center', align: 'right', width: 160, editable: false },
        { field: 'Montototal', headerName: 'Monto total', width: 150, align: 'right', editable: true },
        { field: 'NCEoNDEsobreFactdeCompra', headerName: 'NCE/NDE', width: 150, align: 'right', editable: true },
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
                <Button
                    startIcon={<DeleteIcon/>}
                    disabled={!editRows.length}
                    color='secondary'
                    variant='contained'
                    onClick={()=>{setOpenModal(true);}}
                >
                        Borrar
                </Button>
            </Item>
            <Item>
                <GridToolbarDensitySelector />
            </Item>
          </GridToolbarContainer>
        );
      }

    const commitChanges = ( id ) => {
        const model = editRowsModel[id];
        const data = Object.assign({}, ...Object.keys(model).map( key => {return ({[key]: model[key].value})}))
        !data.NCEoNDEsobreFactdeCompra ? data.NCEoNDEsobreFactdeCompra = "" : null;
        if (data) {
            updateDataCollection('XCobrarCSV', id, data)
        }else{
            console.error('no se puede actualizar una entrada vacia')
        }
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleDelete = async () => {
        await editRows.map( async (row) => {
            await delDataCollection('XCobrarCSV', row)
        })
        setEditRows([]);
        setOpenModal(false);
    }

    useEffect(() => {
        getDataCollection('XCobrarCSV').then((data)=> {
            setState((prevState) => ({...prevState, DataSet: data }))
        })
    },[])

    return  (
        <>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
            >
                <div style={{
                        position: 'absolute',
                        width: '40%',
                        padding: '2rem',
                        border: '2px solid #000',
                        backgroundColor: '#fff',
                        boxShadow: '0px 0px 10px #000',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                        }} >
                    <p style={{textAlign:'center', marginButton:'1.5rem' }}>
                        Desea borrar las {editRows.length} facturas?
                    </p>
                    <div style={{display:'flex', justifyContent:'space-around'}}>
                        <Item>
                            <Button
                                variant='contained'
                                color='inherit'
                                onClick={() => handleCloseModal()}>Cancelar</Button>
                        </Item>
                        <Item>
                            <Button
                                variant='contained'
                                color='secondary'
                                onClick={() => handleDelete()}>Borrar</Button>
                        </Item>
                    </div>
                </div>
            </Modal>
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
                    onSelectionModelChange={(array) => setEditRows(array)}
                    onRowEditCommit={(id)=> commitChanges(id) }
                    editRowsModel={editRowsModel}
                    onEditRowsModelChange={handleEditRowsModelChange}
                />
            </div>
        </>
    );

}