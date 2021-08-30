import React from 'react';
import { TableGrid } from '../TableGrid';

export const XCobrar = ()=>{
    const columns = [
        "Razon Social",
        "Rut cliente",
        "Folio",
        "Fecha Recepcion",
        "Monto total"
    ]
    return  (
        <>
            <h1>Cuentas por Cobrar</h1>
            <TableGrid
                DataCollection="XCobrarCSV"
                showBtnAdd = {false}
                showIdCell = {false}
                editRow = {true}
                ShowBtnCSV={true}
                Columns= {columns}
            />
        </>
    );

}