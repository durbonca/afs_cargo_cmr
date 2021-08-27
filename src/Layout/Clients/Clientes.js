import React from 'react';
import { TableGrid } from '../TableGrid';

export const Clientes = ()=>{
    return  (
        <>
            <h1>Clientes</h1>
            <TableGrid
                DataCollection="Clientes"
                showBtnAdd = {true}
                showIdCell = {true}
                editRow = {true}
            />
        </>
    );

}