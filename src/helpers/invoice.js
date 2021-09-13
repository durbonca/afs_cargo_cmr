import * as Yup from 'yup';
import idFormat from '../helpers/idFormat';

const messages = {
    email: 'Por favor ingrese un email valido',
    required: 'Este campo es requerido',
    rut: 'El rut ingresado es inválido',
}

export const invoiceValidation = Yup.object({
    rut: Yup.string().required(messages.required)
    .test('check-rut', messages.rut, (value) => idFormat.checkFormat(value)),
    companyName: Yup.string().required(messages.required),
    invoiceNumber: Yup.string().required(messages.required),
    email: Yup.string().email(messages.email),
    // documentDate: Yup.date().required(messages.required),
    totalAmount: Yup.string().required(messages.required),
    NCE: Yup.string(),
})