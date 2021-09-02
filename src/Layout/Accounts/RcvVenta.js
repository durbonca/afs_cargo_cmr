import React, {useEffect} from 'react';
import { DataGrid, GridOverlay } from '@mui/x-data-grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useDBContext } from '../../Config/DBProvider';
import { appStyles } from '../../Config/AppStyle';
import { Typography, Box } from '@material-ui/core';
import CSVImport from '../../components/CSVImport/CSVImport';

// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/DeleteOutlined';
// import SaveIcon from '@material-ui/icons/Save';
// import CancelIcon from '@material-ui/icons/Close';

export const RcvVenta = ()=>{
    const { getDataCollection, DataSet, isLoading } = useDBContext();
    const { ContentRight } = appStyles();

    const columns = [
        { field: 'Rutcliente', headerName: 'Rut Cliente',  width: 150,  headerAlign: 'center', editable: true },
        { field: 'RazonSocial', headerName: 'Razon Social', flex: 1, editable: true },
        { field: 'Folio', headerName: 'Folio', type: 'number', width: 110, headerAlign: 'center', editable: true },
        { field: 'FechaDocto', headerName: 'Fecha Docto', type: 'date', headerAlign: 'center', width: 160, editable: true },
        { field: 'Montototal', headerName: 'Monto total', type: 'number', width: 150, editable: true },
        { field: 'NCEoNDEsobreFact.deCompra', headerName: 'NCE/NDE', type: 'number', width: 150, editable: true }
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

    useEffect(() => {
        getDataCollection('XCobrarCSV')
    },[])

    return  (
        <>
            <Typography variant="caption" component="h1" color="textSecondary">Datos Cargados Rcv Venta</Typography>
            <Box component="div" className={ContentRight}>
                <CSVImport />
            </Box>
            <div style={{ width: '100%' }}>
            <DataGrid
                rows={DataSet}
                columns={columns}
                pageSize={20}
                rowHeight={25}
                rowsPerPageOptions={[15,20,25]}
                autoHeight
                pagination
                editMode="row"
                components={{
                    LoadingOverlay: CustomLoadingOverlay,
                }}
                loading={isLoading}
                checkboxSelection
            />
            </div>
        </>
    );

}