import React from 'react';
import { Container, Button } from '@material-ui/core';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { invoiceSchema } from '../../schemas/invoiceData';
import { TextField, /* Date, */ RutField } from '../../components/inputs'
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

export function FormCreate ({handleCreate, handleCancel}) {
    return (
        <Container fixed>
            <h1>Formulario</h1>
            <Formik
                initialValues={invoiceSchema}
                validationSchema={invoiceValidation}
                onSubmit={(values, { setSubmitting }) => {
                    handleCreate(values);
                    setSubmitting(false);
                }}
            >
            {({isValid, dirty, initialValues, handleChange, handleBlur}) => (
                <StyledForm>
                    <Item width="200">
                        <Field
                            label="Rut"
                            name="Rutcliente"
                            defaultValue={initialValues.Rutcliente}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            maxLength={12}
                            as={RutField}
                            />
                        <ErrorMessage component={Error} name="Rutcliente" />
                    </Item>
                    <Item width="200">
                        <Field
                            label="Razón Social"
                            name="RazonSocial"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            as={TextField}
                            />
                        <ErrorMessage component={Error} name="RazonSocial" />
                    </Item>
                    <Item width="200">
                        <Field
                            label="Folio"
                            name="Folio"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            type="text"
                            as={TextField}
                            />
                        <ErrorMessage component={Error} name="Folio" />
                    </Item>
                    {/* <Item width="200">
                        <Field
                            label="Fecha Documento"
                            name="documentDate"
                            type="text"
                            as={Date}
                            />
                        <ErrorMessage component={Error} name="documentDate" />
                    </Item> */}
                    {/* <Item width="200">
                        <Field
                            label="correo"
                            name="email"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            as={TextField}
                            />
                        <ErrorMessage component={Error} name="email" />
                    </Item> */}
                    <Item width="200">
                        <Field
                            label="Monto Total"
                            name="Montototal"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            as={TextField}
                            />
                        <ErrorMessage component={Error} name="Montototal" />
                    </Item>
                    <Item width="425">
                        <Field
                            label="NCE o NDE sobre Fact. de Compra"
                            name="NCEoNDEsobreFactdeCompra"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            as={TextField}
                            />
                        <ErrorMessage component={Error} name="NCEoNDEsobreFactdeCompra" />
                    </Item>
                    <Item width="200">
                        <Button
                            onClick={() => handleCancel()}
                            style={{ marginTop: "40px" }}
                            variant="contained"
                            color="secondary">
                        Cancelar
                        </Button>
                    </Item>
                    <Item width="200">
                        <Button
                            disabled={!isValid || !dirty}
                            type="submit"
                            style={{ marginTop: "40px" }}
                            variant="contained"
                            color="primary">
                        Guardar
                        </Button>
                    </Item>
                </StyledForm>
            )}
            </Formik>
        </Container>
    )
}


