/**
 * @param {string} field_name 
 *
 * @returns {object}
 */
const validatorMessages = (field_name) => {
    return {
        /** @returns {string} Error message */
        required: () => {return `El campo ${field_name} es obligatorio.`},
        /** @returns {string} Error message */
        isNumber:() => {return `El campo ${field_name} debe ser un número.`},
        /** @returns {string} Error message */
        isString:() => {return `El campo ${field_name} debe ser una cadena de texto.`},
        /** @returns {string} Error message*/
        isEmail:() => {return `El campo ${field_name} debe incluir un '@' y el dominio de correo electrónico: .com, .org, .etc.`},
        /** @returns {string} Error message*/
        isEmpty:() => {return `El campo ${field_name} debe estar vacío.`},
        /** @param {number} max @returns {string} Error message */
        max: (max) => {return `El campo ${field_name} debe ser menor o igual a ${max}.`},
        /** @param {number} min @returns {string} Error message */
        min: (min) => {return `El campo ${field_name} debe ser mayor o igual a ${min}.`},
        /** @param {number} max @returns {string} Error message */
        maxLength: (max) => {return `El campo ${field_name} debe tener un máximo de ${max} caracteres.`},
        /** @param {number} min @returns {string} Error message */
        minLength: (min) => {return `El campo ${field_name} debe tener un mínimo de ${min} caracteres.`},
        /** @param {string} second_field_name @returns {string} Error message */
        notEqual: (second_field_name) => {return `El valor del campo ${field_name} no puede ser igual al valor del campo ${second_field_name}`}
    }
}

export default validatorMessages