import React, {useState} from 'react';
import { Formik, Form } from 'formik';
import { Container, Box, Grid as StyledGrid, Button, Select, MenuItem } from '@material-ui/core'
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useDBContext } from '../../Config/DBProvider';

import { RutField, DateRangePicker } from '../../components/inputs'

import styled from 'styled-components'

const Grid = styled(StyledGrid)`
    gap: 1rem;
`

const initialSearchState={ rut:'', isPaid: 0, startDate: '', endDate: '' }

function FormXCobrar() {
    const { getDataWhereSearchCollection } = useDBContext();
    const [search, setSearch] = useState(initialSearchState);

    const handleDateErrors = (dates) => {
        setSearch({ ...search, startDate: !dates.startDate, endDate: !dates.endDate });
    };

    const handleDateChange = (dates) => {
        setSearch({ ...search, startDate: dates.startDate, endDate: dates.endDate });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearch({ ...search, [name]: value });
        console.log(value)
    };

    const handleChangeRut = (event) => {
        const { name, value } = event.target;
        setSearch({ ...search, [name]: [value.slice(0, -1), '-', value.slice(-1, value.length+1)].join('') });
    };

    const handleSearch =() => {
        const { rut, isPaid } = search;
        const where = [{Column:"Rutcliente", Data: rut }, {Column:"status", Data: isPaid}];
        getDataWhereSearchCollection('xcobrar', where)
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
                                handleChange={handleChangeRut}
                                handleBlur={handleChangeRut}
                            />
                            <Select
                                name='isPaid'
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'Without label' }}
                                defaultValue={initialSearchState.isPaid}
                            >
                                <MenuItem value={0}>Sin Pagar</MenuItem>
                                <MenuItem value={1}>Pagado</MenuItem>
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
                            <Divider />
                            ENVIOS MASIVOS
                            <Divider />
                            <Button
                                type="button"
                                color='secondary'
                                variant='contained'
                                startIcon={<MailOutlineIcon />}>
                            Mail por Factura
                            </Button>
                            <Button
                                type="button"
                                color='secondary'
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
