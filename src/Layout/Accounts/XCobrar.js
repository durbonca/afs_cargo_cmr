import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { appStyles } from '../../Config/AppStyle';
import { useDBContext } from '../../Config/DBProvider';
import Divider from '@material-ui/core/Divider';
import { TableContainer as TContainer, Table, TableHead as THead, TableRow, TableCell } from '@material-ui/core';
import uuid from 'react-uuid';

const TableHead = (props) => {

    return (
            <THead key={uuid()}>
                <TableRow>
                    <TableCell>{props.cliente.Rutcliente} {props.cliente.RazonSocial}</TableCell>
                </TableRow>
            </THead>
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


const TableClients = () => {
    const { getDataWhereCollection } = useDBContext();
    const [colheader, setColHeader] = useState([])

    const getDataClients = () => {
        getDataWhereCollection("XCobrarCSV",{Column:"status",Data:"0"}).then((data) => {
            setColHeader(data)
        });
    }

    useEffect(() => {
        getDataClients()
    },[])


    return (
            <Table>
                {colheader.map(item => (
                    <TableHead key={item.id} cliente={item} />
                ))}
            </Table>
    )
}

const ColForm = () => {
    const { btnSearch } = appStyles();
    const Formulariohorizontal = {
        textAlign: 'right'
    }

    return (
        <>
            <div style={{ Formulariohorizontal }}><Button className={btnSearch}>Buscar</Button></div>
            <Divider />
        </>
    )
}

export const XCobrar = ()=>{

    return  (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <ColForm/>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <h1>Analisis de Cuentas</h1>
                    <hr/>
                    <TableContainer>
                        <TableClients />
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );

}