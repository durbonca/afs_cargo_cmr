import * as Yup from 'yup';

const messages = {
    max: 'Este texto es muy largo!',
    min: 'Este texto es muy corto!',
    email: 'Por favor ingrese un email valido',
    required: 'Este campo es requerido'
}

export const invoiceValidation = Yup.object({
    name: Yup.string()
    .max(15, messages.max)
    .min(2, messages.min)
    .required(messages.required),
    lastName: Yup.string()
    .max(20, messages.max)
    .required(messages.required),
    email: Yup.string().email(messages.email).required(messages.required),
    message: Yup.string()
    .min(5, messages.min)
    .required(messages.required),
})