import React, {useState} from 'react'
import { Container, Box, Grid as StyledGrid, Button, Select, MenuItem } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { RutField, DateRangePicker } from '../../components/inputs'
import { Formik, Form } from 'formik'
import styled from 'styled-components'

const Grid = styled(StyledGrid)`
    gap: 1rem;
`

const initialSearchState={ rut:'', isPaid: 'unPaid', startDate: '', endDate: '' }

function SearchForm() {

    const [search, setSearch] = useState(initialSearchState);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearch({ ...search, [name]: value.replace(/[^\w\s]/gi, '') });
      };

    const handleDateErrors = (dates) => {
        setSearch({ ...search, startDate: !dates.startDate, endDate: !dates.endDate });
      };

    const handleDateChange = (dates) => {
        setSearch({ ...search, startDate: dates.startDate, endDate: dates.endDate });
      };

    return (
        <Box>
            <Container maxWidth='sm'>
                <Formik
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2))
                            setSubmitting(false)
                        }, 400)
                    } }
                >
                    { ({ handleBlur }) => (
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
                            <DateRangePicker
                                handleErrors={handleDateErrors}
                                disableFuture
                                onChange={(dates) => handleDateChange(dates)}
                            />
                            <Button 
                                onClick={()=> console.table(search)} 
                                color='primary' 
                                variant='contained' 
                                startIcon={<SearchIcon />}>
                            Buscar
                            </Button>
                        </Grid>
                    </Form>
                    )}
                </Formik>
            </Container>
        </Box>
    )
}

export default SearchForm
