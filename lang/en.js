/**
 * @param {string} field_name 
 *
 * @returns {object}
 */
const validatorMessages = (field_name) => {
    return {
        /** @returns {string} Error message */
        required: () => {return `Field ${field_name} is required.`},
        /** @returns {string} Error message */
        isNumber:() => {return `Field ${field_name} must be a number.`},
        /** @returns {string} Error message */
        isString:() => {return `Field ${field_name} must be a string.`},
        /** @returns {string} Error message*/
        isEmail:() => {return `Field ${field_name} must include '@' and a valid email domain: .com, .org, etc.`},
        /** @returns {string} Error message*/
        isEmpty:() => {return `Field ${field_name} must be empty.`},
        /** @param {number} max @returns {string} Error message */
        max: (max) => {return `Field ${field_name} must be less than or equal to ${max}.`},
        /** @param {number} min @returns {string} Error message */
        min: (min) => {return `Field ${field_name} must be greater than or equal to ${min}.`},
        /** @param {number} max @returns {string} Error message */
        maxLength: (max) => {return `Field ${field_name} must have a maximum length of ${max} characters.`},
        /** @param {number} min @returns {string} Error message */
        minLength: (min) => {return `Field ${field_name} must have a minimum length of ${min} characters.`},
        /** @param {string} second_field_name @returns {string} Error message */
        notEqual: (second_field_name) => {return `The value of field ${field_name} cannot be equal to the value of field ${second_field_name}.`}
    }
}

export default validatorMessages