import React, {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDBContext } from '../Config/DBProvider';

const columns = [
  "Razon Social",
  "Rut cliente",
  "Folio",
  "Fecha Recepcion",
  "Monto total"
]

/* const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
]; */

export default function DataTable(/* { DataCollection, showBtnAdd, showIdCell, editRow, ShowBtnCSV, Columns } */) {

  const { 
    getDataCollection,
    // DataSet,
    /* handleshowbtnAdd,
    handleshowIdCell,
    handleEditRow,
    handleShowBtnCSV,
    handleSetShowColumns,
    setDataCollectionNow */
} = useDBContext()

  const [data, /* setData */] = useState(getDataCollection('XCobrarCSV'))
  
  // const {rows} = data

  useEffect (() => {
  getDataCollection('XCobrarCSV').then(() => {
    // setData(DataSet)
  })}, [])

  console.log('data', data)

  /* const [data, setData] = useState(getDataCollection('XCobrarCSV')) */
  

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid

        /* rows={rows} */
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
