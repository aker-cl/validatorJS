/**
 * @param {string} field_name 
 *
 * @returns {object}
 */
const validatorMessages = (field_name) => {
    return {
        /** @returns {string} 错误消息 */
        required: () => {return `字段 ${field_name} 是必填的。`},
        /** @returns {string} 错误消息 */
        isNumber:() => {return `字段 ${field_name} 必须是一个数字。`},
        /** @returns {string} 错误消息 */
        isString:() => {return `字段 ${field_name} 必须是一个字符串。`},
        /** @returns {string} 错误消息*/
        isEmail:() => {return `字段 ${field_name} 必须包含'@'和有效的电子邮件域名：.com，.org等。`},
        /** @returns {string} 错误消息*/
        isEmpty:() => {return `字段 ${field_name} 必须为空。`},
        /** @param {number} max @returns {string} 错误消息 */
        max: (max) => {return `字段 ${field_name} 必须小于或等于 ${max}。`},
        /** @param {number} min @returns {string} 错误消息 */
        min: (min) => {return `字段 ${field_name} 必须大于或等于 ${min}。`},
        /** @param {number} max @returns {string} 错误消息 */
        maxLength: (max) => {return `字段 ${field_name} 的最大长度不能超过 ${max} 个字符。`},
        /** @param {number} min @returns {string} 错误消息 */
        minLength: (min) => {return `字段 ${field_name} 的最小长度必须为 ${min} 个字符。`},
        /** @param {string} second_field_name */
        notEqual: (second_field_name) => {return `字段 ${field_name} 的值不能与字段 ${second_field_name} 的值相等。`}
    }
}

export default validatorMessages
