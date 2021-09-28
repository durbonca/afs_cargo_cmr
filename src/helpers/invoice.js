import * as Yup from 'yup';
import idFormat from '../helpers/idFormat';

const messages = {
    email: 'Por favor ingrese un email valido',
    required: 'Este campo es requerido',
    rut: 'El rut ingresado es inválido',
}

export const invoiceValidation = Yup.object({
    Rutcliente: Yup.string().required(messages.required)
    .test('check-rut', messages.rut, (value) => idFormat.checkFormat(value)),
    RazonSocial: Yup.string().required(messages.required),
    Folio: Yup.string().required(messages.required),
    FechaDocto: Yup.date().required(messages.required),
    Montototal: Yup.string().required(messages.required),
    NCEoNDEsobreFactdeCompra: Yup.string(),
})