import React, { useEffect,useState } from 'react';
import { DataGrid, GridOverlay } from '@mui/x-data-grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useDBContext } from '../../Config/DBProvider';
import { Typography } from '@material-ui/core';


export const Clientes = ()=>{
    const { getDataCollection, removeDataDuplicates, isLoading  } = useDBContext();
    const [ dataRowsBody, setdataRowsBody ] = useState([])

    const columns = [
        { field: 'Rutcliente', headerName: 'Rut Cliente',  width: 150,  headerAlign: 'center', editable: false },
        { field: 'RazonSocial', headerName: 'Razon Social', flex: 1, editable: false },
        { field: 'email', headerName: 'Correo', type: 'string', width: 250, headerAlign: 'center', editable: true },
        { field: 'datetime', headerName: 'Fecha Registro', type: 'date', headerAlign: 'center', width: 160, editable: false }

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
        getDataCollection('XCobrarCSV').then((data) => {
            let datafilter = removeDataDuplicates(data,"RazonSocial");
            console.log(datafilter)
            setdataRowsBody(datafilter)
        })
    },[])

    return  (
        <>
            <Typography variant="h4" color="textSecondary">Clientes Registrados</Typography>
            <div style={{ width: '100%' }}>
            <DataGrid
                rows={dataRowsBody}
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
            />
            </div>
        </>
    );

}