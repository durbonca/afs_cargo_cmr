import React, {useState} from 'react';
import { Formik, Form } from 'formik';
import { Container, Box, Grid as StyledGrid, Button, Select, MenuItem } from '@material-ui/core'
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import { RutField, DateRangePicker } from '../../components/inputs'

import styled from 'styled-components'

const Grid = styled(StyledGrid)`
    gap: 1rem;
`

const initialSearchState={ rut:'', isPaid: 'unPaid', startDate: '', endDate: '' }

function FormXCobrar() {

    const [search, setSearch] = useState(initialSearchState);

    const handleDateErrors = (dates) => {
        setSearch({ ...search, startDate: !dates.startDate, endDate: !dates.endDate });
    };

    const handleDateChange = (dates) => {
        console.log(dates)
        setSearch({ ...search, startDate: dates.startDate, endDate: dates.endDate });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearch({ ...search, [name]: value.replace(/[^\w\s]/gi, '') });
        console.log(value)
    };

    const handleBlur = (values) => {
         setSearch({ ...search, rut: values.target.value });
    };

    const handleSearch =(values) => {
        console.log(values)
    }

    return (
        <Box style={{padding:'20px 5px',border:'1px solid #ccc',borderRadius:'10px'}} >
            <Container maxWidth='sm'>
                <Formik>
                    <Form>
                        <Grid container direction='column'>
                            <RutField
                                name='rut'
                                label='Rut'
                                defaultValue={initialSearchState.rut}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                            />
                            <Select
                                name='isPaid'
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'Without label' }}
                                defaultValue={initialSearchState.isPaid}
                            >
                                <MenuItem value='unPaid'>Sin Pagar</MenuItem>
                                <MenuItem value='paid'>Pagado</MenuItem>
                            </Select>
                            <Divider />
                            <DateRangePicker
                                handleErrors={handleDateErrors}
                                disableFuture
                                onChange={(dates) => handleDateChange(dates)}
                            />
                            <Button
                                onClick={handleSearch}
                                type="button"
                                color='primary'
                                variant='contained'
                                startIcon={<SearchIcon />}>
                            Buscar
                            </Button>
                            <Button
                                type="button"
                                color='secundary'
                                variant='contained'
                                startIcon={<MailOutlineIcon />}>
                            Mail por Factura
                            </Button>
                            <Button
                                type="button"
                                color='secundary'
                                variant='contained'
                                startIcon={<MailIcon />}>
                            Mail por Total
                            </Button>

                        </Grid>
                    </Form>

                </Formik>
            </Container>
        </Box>
    )
}

export default FormXCobrar
