import React, { useEffect, useState } from 'react';
import { LinearProgress, TableContainer as TContainer, Table, TableHead as THead, TableBody, TableRow, TableCell, TableFooter } from '@material-ui/core';
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
    const { sumByField, getDataById, SendMail, formatNumber } = useDBContext();

    useEffect(() => {
        setTotal(sumByField(Dataset,'Montototal'))
    }, [])


    const sendMailxFact = (e) => {
        getDataById("XCobrarCSV",e.target.id).then((doc) => {
            if(doc){
                const message = {
                    name: doc.RazonSocial,
                    to: doc.email,
                    subject: "Cobro por Factura Pendiente",
                    html: '<table border="0" align="center" cellpadding="0" cellspacing="0" width="600" bgcolor="#ffffff" style="margin:0 auto;font-family:Overpass,sans-serif;color:#5e5e5e">'+
                                '<tbody>'+
                                    '<tr><td><img src="#" width="100%" tabindex="0" /></td></tr>'+
                                    '<tr>'+
                                        '<td>'+
                                            '<table border="0" align="center" cellpadding="0" cellspacing="0" width="80%" style="text-align:center">'+
                                                '<tbody>'+
                                                    '<tr>'+
                                                        '<td style="font-size:18px;line-height:24px;font-weight:100;color:#546e7a">'+
                                                            'Hola<br/><b style="display:block">'+doc.RazonSocial+'</b>'+
                                                        '</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                        '<td style="font-size:28px;line-height:33px;padding-top:10px;color:#37474f;text-align:center;font-weight:100;font-family:Overpass,sans-serif">'+
                                                            'Recordatorio<br/><b>Pago de Factura Pendiente</b>.'+
                                                        '</td>'+
                                                    '</tr>'+
                                                    '<tr><td height="20"></td></tr>'+
                                                '</tbody>'+
                                            '</table>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td align="center" valign="top">'+
                                            '<table width="80%" style="border:solid 1px #0073cb;border-radius:4px;padding:8px;font-size:16px;line-height:20px;font-weight:300;border-spacing:0 2px">'+
                                                '<tbody>'+
                                                    '<tr>'+
                                                        '<td width="50%" align="left" style="text-align:right;padding:8px 15px">Factura Numero</td>'+
                                                        '<td width="50%" align="left" style="padding:8px 15px">'+doc.Folio+'</td>'+
                                                    '</tr>'+
                                                    '<tr style="background-color:#ebebec">'+
                                                        '<td width="50%" align="left" style="text-align:right;padding:10px 15px">Monto</td>'+
                                                        '<td width="50%" align="left" style="padding:10px 15px">$'+formatNumber(doc.Montototal)+'</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                        '<td width="50%" align="left" style="text-align:right;padding:10px 15px">Fecha</td>'+
                                                        '<td width="50%" align="left" style="padding:10px 15px">'+doc.FechaDocto+'</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                        '<td width="50%" align="left" style="text-align:right;padding:10px 15px">Rut</td>'+
                                                        '<td width="50%" align="left" style="padding:10px 15px">'+doc.Rutcliente+'</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                        '<td width="50%" align="left" style="text-align:right;padding:10px 15px">Razon Social</td>'+
                                                        '<td width="50%" align="left" style="padding:10px 15px">'+doc.RazonSocial+'</td>'+
                                                    '</tr>'+
                                                '</tbody>'+
                                            '</table>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>'+
                                            '<table border="0" align="center" cellpadding="0" cellspacing="0" width="80%" style="text-align:center">'+
                                                '<tbody>'+
                                                    '<tr>'+
                                                        '<td height="20"></td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                        '<td height="20"></td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                        '<td style="font-size:16px!important;line-height:24px!important;font-weight:300;text-align:center;letter-spacing:-0.03px">'+
                                                            'Al Realizar el pago de tu factura pendiente debes notificar AFS SISTEMAS enviando un correo a '+
                                                            '<b>afssistemas@gmail.com</b> ingresando tus datos personales y el detalle del pago'+
                                                        '</td>'+
                                                    '</tr>'+
                                                    '<tr><td height="20"></td></tr>'+
                                                '</tbody>'+
                                            '</table>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>'+
                                            '<table align="center" border="0" cellpadding="0" cellspacing="0" style="font-family:Overpass,sans-serif;font-size:16px" width="100%">'+
                                                '<tbody>'+
                                                    '<tr>'+
                                                        '<td align="center" style="background:#fff;display:inline-block;line-height:220%;color:#546e7a;font-weight:200" valign="middle" width="100%">'+
                                                            'Contactanos +56 9<font style="letter-spacing:-1px;color:#fff">.</font> 577<font style="letter-spacing:-1px;color:#fff">.</font> 1118'+
                                                        '</td>'+
                                                    '</tr>'+
                                                    '<tr><td height="20"></td></tr>'+
                                                '</tbody>'+
                                            '</table>'+
                                        '</td>'+
                                    '</tr>'+
                            '</tbody>'+
                        '</table>'
                }
                //console.log(mailto)
                SendMail(message)
            }
        })
    }

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
                            <TableCell key={i+4} align="right" >{formatNumber(item.Montototal)}</TableCell>
                            <TableCell key={i+5} align="right" title="Enviar Correo Cobro por Factura" >
                                {item.email &&
                                    <MailOutlineIcon fontSize="small" cursor="pointer" id={item.id} onClick={sendMailxFact}/>
                                }
                            </TableCell>
                        </TableRow>
                    )
                }} />
                {/* })} */}

            </TableBody>
            <TableFooter >
                <TableRow key={uuid()}>
                    <TableCell align="right" variant="head" colSpan={3}>Total</TableCell>
                    <TableCell align="right" variant="head" >{formatNumber(Total)}</TableCell>
                    <TableCell align="right" variant="head" title="Enviar Correo Cobro General" >
                        <MailIcon fontSize="small"/>
                    </TableCell>
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
    const { removeDataDuplicates, groupByData, DataSetXCobrar, isLoading } = useDBContext();
    const [ colheader, setColHeader ] = useState([])
    const [ dataRowsBody, setdataRowsBody ] = useState([])

    const getDataClients = () => {
        let datafilter = removeDataDuplicates(DataSetXCobrar,"RazonSocial");
        setColHeader(datafilter)
        let dataByGroup = groupByData(DataSetXCobrar, "Rutcliente")
        setdataRowsBody(dataByGroup)
    }



    useEffect(() => {
        getDataClients()
    },[DataSetXCobrar])

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