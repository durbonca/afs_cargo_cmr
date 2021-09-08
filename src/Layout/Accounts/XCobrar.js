import React, { useEffect, useState } from 'react';
import { LinearProgress, TableContainer as TContainer, Table, TableHead as THead, TableBody, TableRow, TableCell, TableFooter  } from '@material-ui/core';
import { Grid, Box, Typography, Divider } from '@material-ui/core';
import { appStyles } from '../../Config/AppStyle';
import { useDBContext } from '../../Config/DBProvider';
import MailIcon from '@material-ui/icons/Mail';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import uuid from 'react-uuid';
import { Map } from "react-lodash"
import FormXCobrar from '../Form/FormXCobrar';

const TableSubHead = () => {

    return (
        <THead key={uuid()} >
            {/* <TableRow>
                <TableCell>DOCUMENTO</TableCell>
                <TableCell>CANCELACION</TableCell>
                <TableCell colSpan={4}></TableCell>
            </TableRow> */}
            <TableRow>
                {/* <TableCell>TD</TableCell> */}
                <TableCell align="center" style={{padding:'5px 10px', fontWeight: 'bold'}} >FOLIO</TableCell>
                {/* <TableCell>TD</TableCell>
                <TableCell>FOLIO</TableCell> */}
                <TableCell align="center" style={{padding:'5px 10px', fontWeight: 'bold'}} >FECHA</TableCell>
                {/* <TableCell>FECHA VENC.</TableCell> */}
                {/* <TableCell>GLOSA</TableCell> */}
                <TableCell align="center" style={{padding:'5px 10px', fontWeight: 'bold'}} >NCE / NDE</TableCell>
                <TableCell align="right" style={{padding:'5px 10px', fontWeight: 'bold'}} >MONTO</TableCell>
            </TableRow>
        </THead>
    )
}

const TableHead = ({cliente}) => {

    return (
        <THead key={uuid()}>
            <TableRow style={{backgroundColor:'#ccc',color:"#FFF"}}>
                <TableCell style={{padding:'5px 10px', fontWeight: 600}} >{cliente.Rutcliente} - {cliente.RazonSocial}</TableCell>
            </TableRow>
        </THead>
    )
}

const TableSubCliente = ({Dataset}) => {
    const [ Total, setTotal] = useState(0)
    const { sumByField } = useDBContext();

    useEffect(() => {
        setTotal(sumByField(Dataset,'Montototal'))
    }, [])

    return (
        <Table size="small" >
            <TableSubHead />
            <TableBody key={uuid()}>
                 {/* {Dataset.map((item, i) => { */}
                 <Map collection={Dataset} iteratee={(item, i) => {
                    return (
                        <TableRow style={{height: 10}} key={uuid()}>
                            <TableCell key={i+1} align="center" >{item.Folio}</TableCell>
                            <TableCell key={i+2} align="center" >{item.FechaDocto}</TableCell>
                            <TableCell key={i+3}>{item.NCEoNDEsobreFactdeCompra}</TableCell>
                            <TableCell key={i+4} align="right" >{item.Montototal}</TableCell>
                            <TableCell key={i+5} align="right" title="Enviar Correo Cobro por Factura" ><MailOutlineIcon/></TableCell>
                        </TableRow>
                    )
                }} />
                {/* })} */}

            </TableBody>
            <TableFooter >
                <TableRow key={uuid()}>
                    <TableCell align="right" variant="head" colSpan={3}>Total</TableCell>
                    <TableCell align="right" variant="head" >{Total}</TableCell>
                    <TableCell align="right" variant="head" title="Enviar Correo Cobro General" ><MailIcon/></TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

const TableMainCliente = ({children, header}) => {

    return (
        <Table>
            <TableHead key={header.id} cliente={header} />
            <TableBody key={uuid()} >
                <TableRow>
                    <TableCell style={{padding:'5px 10px'}}>{children}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

const Loading = () => {
    return (
        <>
            <Typography variant="caption" component="div" color="textSecondary">Cargando...</Typography>
            <LinearProgress />
        </>
    )
}

const TableClients = () => {
    const { getDataWhereCollection, removeDataDuplicates, groupByData, isLoading } = useDBContext();
    const [ colheader, setColHeader ] = useState([])
    const [ dataRowsBody, setdataRowsBody ] = useState([])

    const getDataClients = () => {
        getDataWhereCollection("XCobrarCSV",{Column:"status",Data:"0"}).then((data) => {
            let datafilter = removeDataDuplicates(data,"RazonSocial");
            setColHeader(datafilter)
            let dataByGroup = groupByData(data, "Rutcliente")
            setdataRowsBody(dataByGroup)
        });
    }



    useEffect(() => {
        getDataClients()
    },[])

    return (
            (colheader.length > 0)
            ? colheader.map((item) => {
                return (
                    <Box key={uuid()} component="div" style={{marginBottom:'20px'}}>
                        <TableMainCliente header={item}>
                            <TableSubCliente key={item.id} Dataset={dataRowsBody[item.Rutcliente]} Columns={item} />
                        </TableMainCliente>
                    </Box>
                )
            })
            : (isLoading && <Loading /> )
    )
}


const TableContainer = ({children}) => {

    const { containerTable } = appStyles();

    return (
        <TContainer className={containerTable}>
            {children}
        </TContainer>

    )
}

export const XCobrar = ()=>{

    return  (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h5" color="textSecondary">Analisis de cuentas</Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormXCobrar />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Box style={{padding:'5px 5px',height: '80vh', overflow:'Auto'}} >
                        <TableContainer>
                            <TableClients />
                        </TableContainer>
                    </Box>
                </Grid>
            </Grid>
        </>
    );

}