/**
 * @param {string} field_name 
 *
 * @returns {object}
 */
const validatorMessages = (field_name) => {
    return {
        /** @returns {string} Mensagem de erro */
        required: () => {return `O campo ${field_name} é obrigatório.`},
        /** @returns {string} Mensagem de erro */
        isNumber:() => {return `O campo ${field_name} deve ser um número.`},
        /** @returns {string} Mensagem de erro */
        isString:() => {return `O campo ${field_name} deve ser uma cadeia de caracteres.`},
        /** @returns {string} Mensagem de erro*/
        isEmail:() => {return `O campo ${field_name} deve incluir '@' e um domínio de e-mail válido: .com, .org, etc.`},
        /** @returns {string} Mensagem de erro*/
        isEmpty:() => {return `O campo ${field_name} deve estar vazio.`},
        /** @param {number} max @returns {string} Mensagem de erro */
        max: (max) => {return `O campo ${field_name} deve ser menor ou igual a ${max}.`},
        /** @param {number} min @returns {string} Mensagem de erro */
        min: (min) => {return `O campo ${field_name} deve ser maior ou igual a ${min}.`},
        /** @param {number} max @returns {string} Mensagem de erro */
        maxLength: (max) => {return `O campo ${field_name} deve ter no máximo ${max} caracteres.`},
        /** @param {number} min @returns {string} Mensagem de erro */
        minLength: (min) => {return `O campo ${field_name} deve ter no mínimo ${min} caracteres.`},
        /** @param {string} second_field_name */
        notEqual: (second_field_name) => {return `O valor do campo ${field_name} não pode ser igual ao valor do campo ${second_field_name}.`}
    }
}

export default validatorMessages
