/**
 * @param {string} field_name 
 *
 * @returns {object}
 */
const validatorMessages = (field_name) => {
    return {
        /** @returns {string} エラーメッセージ */
        required: () => {return `フィールド ${field_name} は必須です。`},
        /** @returns {string} エラーメッセージ */
        isNumber:() => {return `フィールド ${field_name} は数字である必要があります。`},
        /** @returns {string} エラーメッセージ */
        isString:() => {return `フィールド ${field_name} は文字列である必要があります。`},
        /** @returns {string} エラーメッセージ*/
        isEmail:() => {return `フィールド ${field_name} は '@' と有効なメールドメイン（.com、.org など）を含む必要があります。`},
        /** @returns {string} エラーメッセージ*/
        isEmpty:() => {return `フィールド ${field_name} は空である必要があります。`},
        /** @param {number} max @returns {string} エラーメッセージ */
        max: (max) => {return `フィールド ${field_name} は ${max} 以下である必要があります。`},
        /** @param {number} min @returns {string} エラーメッセージ */
        min: (min) => {return `フィールド ${field_name} は ${min} 以上である必要があります。`},
        /** @param {number} max @returns {string} エラーメッセージ */
        maxLength: (max) => {return `フィールド ${field_name} の長さは最大で ${max} 文字である必要があります。`},
        /** @param {number} min @returns {string} エラーメッセージ */
        minLength: (min) => {return `フィールド ${field_name} の長さは最小で ${min} 文字である必要があります。`},
        /** @param {string} second_field_name */
        notEqual: (second_field_name) => {return `フィールド ${field_name} の値はフィールド ${second_field_name} の値と同じであってはいけません。`}
    }
}

export default validatorMessages
