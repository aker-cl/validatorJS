/**
 * @param {string} field_name 
 *
 * @returns {object}
 */
const validatorMessages = (field_name) => {
    return {
        /** @returns {string} Сообщение об ошибке */
        required: () => {return `Поле ${field_name} обязательно для заполнения.`},
        /** @returns {string} Сообщение об ошибке */
        isNumber:() => {return `Поле ${field_name} должно быть числом.`},
        /** @returns {string} Сообщение об ошибке */
        isString:() => {return `Поле ${field_name} должно быть строкой.`},
        /** @returns {string} Сообщение об ошибке*/
        isEmail:() => {return `Поле ${field_name} должно содержать символ '@' и действительный домен электронной почты: .com, .org и так далее.`},
        /** @returns {string} Сообщение об ошибке*/
        isEmpty:() => {return `Поле ${field_name} должно быть пустым.`},
        /** @param {number} max @returns {string} Сообщение об ошибке */
        max: (max) => {return `Поле ${field_name} должно быть меньше или равно ${max}.`},
        /** @param {number} min @returns {string} Сообщение об ошибке */
        min: (min) => {return `Поле ${field_name} должно быть больше или равно ${min}.`},
        /** @param {number} max @returns {string} Сообщение об ошибке */
        maxLength: (max) => {return `Поле ${field_name} должно иметь максимальную длину в ${max} символов.`},
        /** @param {number} min @returns {string} Сообщение об ошибке */
        minLength: (min) => {return `Поле ${field_name} должно иметь минимальную длину в ${min} символов.`},
        /** @param {string} second_field_name */
        notEqual: (second_field_name) => {return `Значение поля ${field_name} не может быть равным значению поля ${second_field_name}.`}
    }
}

export default validatorMessages
