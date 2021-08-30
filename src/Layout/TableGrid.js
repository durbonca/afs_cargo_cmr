import React, { useEffect } from 'react';
import { LinearProgress, TableContainer as TContainer, Table, TableBody as TBody, TableHead as THead ,TableRow, TableCell } from '@material-ui/core';
import { Typography, Button, Box, IconButton, Dialog, DialogContent } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { appStyles } from '../Config/AppStyle';
import { useDBContext } from '../Config/DBProvider';
import uuid from 'react-uuid';
import { Formulario } from './Form'
import CSVImport from '../components/CSVImport/CSVImport';
import Swal from "sweetalert2";

/* const ConfirmButton = () => {
    const { btnIcon  } = appStyles();
    return (
        <IconButton key={uuid()} className={btnIcon} color="secondary" aria-label="Done" onClick={() => { alert('clicked Ok') }}>
            <DoneIcon />
        </IconButton>
    );
} */

/* const CancelButton = () => {
    const { btnIcon  } = appStyles();
    const { handleCancelRow } = useDBContext();

    return (
        <IconButton key={uuid()} className={btnIcon} color="secondary" aria-label="Done" onClick={() => handleCancelRow()}>
            <ClearIcon />
        </IconButton>
    );
} */


const DeleteButton = (props) => {
    const { btnIcon  } = appStyles();
    const { delDataCollection } = useDBContext();

    const handleDeleteRow = () => {
        Swal.fire({
            text: 'Se procedera a eliminar el registro, esta seguro ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No!'
        }).then((result) => {
            if(result.isConfirmed === true){
                delDataCollection(props.id)
                .then(() => {
                    console.log("registro "+ props.id + " Eliminado !")
                })
            }
        })

    }

    return (
        <IconButton key={props.id} className={btnIcon} color="secondary" aria-label="Delete" onClick={() => handleDeleteRow()}>
            <DeleteIcon />
        </IconButton>
    );
}

const DialogForm = () => {
    const { handleCloseDialog, openDialog } = useDBContext();

    const handleClose = () => {
        handleCloseDialog()
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openDialog}>
            <DialogContent>
                <Formulario />
            </DialogContent>
        </Dialog>
    )

}

const EditButton = (props) => {
    const { btnIcon  } = appStyles();
    const { handleOpenDialog, setDialogMode, handleIdRowSelected } = useDBContext();

    const handleOpenDialogEdit = () => {
        setDialogMode('update');
        handleOpenDialog();
        handleIdRowSelected(props.id)
    }

    return (
        <IconButton key={props.id} className={btnIcon} color="secondary" aria-label="Edit" onClick={() => handleOpenDialogEdit() }>
            <EditIcon />
        </IconButton>
    );
}

const TableAction = (props) => {
    const { editRow } = useDBContext();

    return (
        <Box key={uuid()} component="div">
            { editRow && <EditButton {...props} /> }
            <DeleteButton  {...props} />
        </Box>
    )
}

const TableBody = () => {
    const { Columns, DataSet } = useDBContext()

    const RowsBody = () => {
        return (
            DataSet.map((item, idat)=> (
                <TableRow key={idat+1}>
                    {Columns.map((field, icol) => {
                        return <TableCell key={icol}>{item[field]}</TableCell>
                    })}
                    <TableCell>
                        <TableAction id={item.id} />
                    </TableCell>
                </TableRow>
            ))
        )
    }

    return (
        <TBody key={uuid()}>
               { (Columns.length > 0 && DataSet.length > 0) && <RowsBody /> }
        </TBody>
    )
}

const TableHead = () => {
    const { Columns,isLoading } = useDBContext();

    const RowsHead = () => {
        return (
            <TableRow>
                    {Columns.map(item => <TableCell key={item}>{item}</TableCell>)}
                    <TableCell>Accion</TableCell>
            </TableRow>
        )
    }

    const Loading = () => {
        return (
             <TableRow>
                <TableCell>
                    <Typography variant="caption" component="div" color="textSecondary">Cargando...</Typography>
                    <LinearProgress />
                </TableCell>
            </TableRow>
        )
    }

    return (
        <THead>
            { (Columns.length > 0) ? <RowsHead /> : (isLoading && <Loading /> )}
        </THead>
    )
}

const TableContainer = ({children}) => {
    const { showbtnAdd, handleOpenDialog, setDialogMode, ShowBtnCSV } = useDBContext();
    const { ContentRight, btnAddTableGrid, containerTable } = appStyles();

    const handleOpenDialogAdd= () => {
        setDialogMode('Add');
        handleOpenDialog()
    }

    return (
        <TContainer className={containerTable}>
            <Box component="div" className={ContentRight}>
                { showbtnAdd &&
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={btnAddTableGrid}
                        startIcon={<AddBoxIcon />}
                        onClick={handleOpenDialogAdd}
                    >
                        Agregar
                    </Button>
                }
                { ShowBtnCSV && <CSVImport /> }
            </Box>
            {children}
        </TContainer>

    )
}

export const TableGrid = ({...props}) => {
    const { getDataCollection,
            handleshowbtnAdd,
            handleshowIdCell,
            handleEditRow,
            handleShowBtnCSV,
            handleSetShowColumns,
            setDataCollectionNow
        } = useDBContext()

    const { DataCollection, showBtnAdd, showIdCell, editRow, ShowBtnCSV, Columns } = props
    useEffect(() => {
        if(DataCollection){
            setDataCollectionNow(DataCollection)
            getDataCollection(DataCollection)
        }
        if(showBtnAdd){
            handleshowbtnAdd()
        }
        if(showIdCell){
            handleshowIdCell()
        }
        if(editRow){
            handleEditRow()
        }
        if(ShowBtnCSV){
            handleShowBtnCSV()
        }
        if(Columns){
            handleSetShowColumns(props.Columns)
        }

        // eslint-disable-next-line
    },[])

    return (
        <TableContainer>
            <Table>
                <TableHead />
                <TableBody />
            </Table>
            <DialogForm />
        </TableContainer>
    )
}