/**
 * @param {string} field_name 
 *
 * @returns {object}
 */
const validatorMessages = (field_name) => {
    return {
        /** @returns {string} Fehlermeldung */
        required: () => {return `Feld ${field_name} ist erforderlich.`},
        /** @returns {string} Fehlermeldung */
        isNumber:() => {return `Feld ${field_name} muss eine Nummer sein.`},
        /** @returns {string} Fehlermeldung */
        isString:() => {return `Feld ${field_name} muss eine Zeichenkette sein.`},
        /** @returns {string} Fehlermeldung*/
        isEmail:() => {return `Feld ${field_name} muss ein '@' und eine gültige E-Mail-Domäne enthalten: .com, .org, usw.`},
        /** @returns {string} Fehlermeldung*/
        isEmpty:() => {return `Feld ${field_name} muss leer sein.`},
        /** @param {number} max @returns {string} Fehlermeldung */
        max: (max) => {return `Feld ${field_name} muss kleiner oder gleich ${max} sein.`},
        /** @param {number} min @returns {string} Fehlermeldung */
        min: (min) => {return `Feld ${field_name} muss größer oder gleich ${min} sein.`},
        /** @param {number} max @returns {string} Fehlermeldung */
        maxLength: (max) => {return `Feld ${field_name} darf maximal ${max} Zeichen lang sein.`},
        /** @param {number} min @returns {string} Fehlermeldung */
        minLength: (min) => {return `Feld ${field_name} muss mindestens ${min} Zeichen lang sein.`},
        /** @param {string} second_field_name */
        notEqual: (second_field_name) => {return `Der Wert des Feldes ${field_name} darf nicht gleich dem Wert des Feldes ${second_field_name} sein.`}
    }
}

export default validatorMessages
