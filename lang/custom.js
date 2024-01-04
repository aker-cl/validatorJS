/**
 * This function is the structure of the validator messages, copy them and add your custom messages of the validations
 * 
 * @param {string} field_name 
 *
 * @returns {object}
 */
const validatorMessages = (field_name) => {
    return {
        /** @returns {string} Error message */
        required: () => {return ``},
        /** @returns {string} Error message */
        isNumber:() => {return ``},
        /** @returns {string} Error message */
        isString:() => {return ``},
        /** @returns {string} Error message*/
        isEmail:() => {return ``},
        /** @returns {string} Error message*/
        isEmpty:() => {return ``},
        /** @param {number} max @returns {string} Error message */
        max: (max) => {return ``},
        /** @param {number} min @returns {string} Error message */
        min: (min) => {return ``},
        /** @param {number} max @returns {string} Error message */
        maxLength: (max) => {return ``},
        /** @param {number} min @returns {string} Error message */
        minLength: (min) => {return ``},
        /** @param {string} second_field_name @returns {string} Error message */
        notEqual: (second_field_name) => {return ``}
    }
}

export default validatorMessages