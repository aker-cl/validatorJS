/**
 * @param {string} field_name 
 *
 * @returns {object}
 */
const validatorMessages = (field_name) => {
    return {
        /** @returns {string} Messaggio di errore */
        required: () => {return `Il campo ${field_name} è obbligatorio.`},
        /** @returns {string} Messaggio di errore */
        isNumber:() => {return `Il campo ${field_name} deve essere un numero.`},
        /** @returns {string} Messaggio di errore */
        isString:() => {return `Il campo ${field_name} deve essere una stringa.`},
        /** @returns {string} Messaggio di errore*/
        isEmail:() => {return `Il campo ${field_name} deve includere '@' e un dominio email valido: .com, .org, ecc.`},
        /** @returns {string} Messaggio di errore*/
        isEmpty:() => {return `Il campo ${field_name} deve essere vuoto.`},
        /** @param {number} max @returns {string} Messaggio di errore */
        max: (max) => {return `Il campo ${field_name} deve essere minore o uguale a ${max}.`},
        /** @param {number} min @returns {string} Messaggio di errore */
        min: (min) => {return `Il campo ${field_name} deve essere maggiore o uguale a ${min}.`},
        /** @param {number} max @returns {string} Messaggio di errore */
        maxLength: (max) => {return `Il campo ${field_name} deve avere una lunghezza massima di ${max} caratteri.`},
        /** @param {number} min @returns {string} Messaggio di errore */
        minLength: (min) => {return `Il campo ${field_name} deve avere una lunghezza minima di ${min} caratteri.`},
        /** @param {string} second_field_name */
        notEqual: (second_field_name) => {return `Il valore del campo ${field_name} non può essere uguale al valore del campo ${second_field_name}.`}
    }
}

export default validatorMessages
