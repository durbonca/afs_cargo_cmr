import React from 'react';
import { Container, TextField, Button } from '@material-ui/core';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { invoiceSchema } from '../../schemas/invoiceData';
import Item from '../../components/Item/';
import Error from '../Error/';
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
                            label="Nombre" 
                            name="name" 
                            type="text"
                            placeholder="Nombre" 
                            as={TextField}
                            />
                        <ErrorMessage component={Error} name="name" />
                    </Item>
                    <Item width="200">
                        <Field 
                            label="Apellido"
                            name="lastName" 
                            type="text"
                            placeholder="Nombre" 
                            as={TextField}
                            />
                        <ErrorMessage component={Error} name="lastName" />
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
                            label="mensaje"
                            name="message" 
                            type="text"
                            placeholder="Nombre" 
                            as={TextField}
                            />
                        <ErrorMessage component={Error} name="message" />
                    </Item>
                    <Item width="200">
                        <Button style={{ marginTop: "40px" }} variant="contained" color="primary">Enviar</Button>
                    </Item>
                </StyledForm>
            </Formik>
        </Container>
            
    )
}


