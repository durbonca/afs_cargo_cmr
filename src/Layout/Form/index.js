import React from 'react';
import { Container, Button } from '@material-ui/core';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { invoiceSchema } from '../../schemas/invoiceData';
import { TextField, Date, RutField } from '../../components/inputs'
import Item from '../../components/Item';
import Error from '../../components/Error';
import { invoiceValidation } from '../../helpers/invoice';
import styled from 'styled-components';

const StyledForm = styled(Form)`
    height: auto;
    margin-right: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    `;

export function Formulario () {

    return (
        <Container fixed>
            <h1>Formulario</h1>
            <Formik
                initialValues={invoiceSchema}
                validationSchema={invoiceValidation}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    }, 400);
                }}
            >
                <StyledForm>
                    <Item width="200">
                        <Field
                            label="Folio" 
                            name="invoiceNumber" 
                            type="text"
                            as={TextField}
                            />
                        <ErrorMessage component={Error} name="companyName" />
                    </Item>
                    <Item width="200">
                        <Field
                            label="Razon Social" 
                            name="companyName" 
                            type="text"
                            as={TextField}
                            />
                        <ErrorMessage component={Error} name="companyName" />
                    </Item>
                    <Item width="200">
                        <Field
                            label="Rut" 
                            name="rut" 
                            type="text"
                            as={RutField}
                            />
                        <ErrorMessage component={Error} name="rut" />
                    </Item>
                    <Item width="200">
                        <Field 
                            label="correo"
                            name="email" 
                            type="text"
                            placeholder="Nombre" 
                            as={TextField}
                            />
                        <ErrorMessage component={Error} name="email" />
                    </Item>
                    <Item width="200">
                        <Field
                            label="Fecha Documento" 
                            name="documentDate" 
                            type="text"
                            as={Date}
                            />
                        <ErrorMessage component={Error} name="documentDate" />
                    </Item>
                    <Item width="200">
                        <Button style={{ marginTop: "40px" }} variant="contained" color="primary">Guardar</Button>
                    </Item>
                </StyledForm>
            </Formik>
        </Container>
            
    )
}


