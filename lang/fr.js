/**
 * @param {string} field_name 
 *
 * @returns {object}
 */
const validatorMessages = (field_name) => {
    return {
        /** @returns {string} Message d'erreur */
        required: () => {return `Le champ ${field_name} est requis.`},
        /** @returns {string} Message d'erreur */
        isNumber:() => {return `Le champ ${field_name} doit être un nombre.`},
        /** @returns {string} Message d'erreur */
        isString:() => {return `Le champ ${field_name} doit être une chaîne de caractères.`},
        /** @returns {string} Message d'erreur*/
        isEmail:() => {return `Le champ ${field_name} doit inclure '@' et un domaine de messagerie valide : .com, .org, etc.`},
        /** @returns {string} Message d'erreur*/
        isEmpty:() => {return `Le champ ${field_name} doit être vide.`},
        /** @param {number} max @returns {string} Message d'erreur */
        max: (max) => {return `Le champ ${field_name} doit être inférieur ou égal à ${max}.`},
        /** @param {number} min @returns {string} Message d'erreur */
        min: (min) => {return `Le champ ${field_name} doit être supérieur ou égal à ${min}.`},
        /** @param {number} max @returns {string} Message d'erreur */
        maxLength: (max) => {return `Le champ ${field_name} doit avoir une longueur maximale de ${max} caractères.`},
        /** @param {number} min @returns {string} Message d'erreur */
        minLength: (min) => {return `Le champ ${field_name} doit avoir une longueur minimale de ${min} caractères.`},
        /** @param {string} second_field_name */
        notEqual: (second_field_name) => {return `La valeur du champ ${field_name} ne peut pas être égale à la valeur du champ ${second_field_name}.`}
    }
}

export default validatorMessages
