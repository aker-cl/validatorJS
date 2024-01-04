import messages from './lang/en.js'
import messages_es from './lang/es.js'

export default class Validator {
    /** @type {'en'|'es'|Function} */
    constructor(lang = 'en') {
        /** @type {string} */
        this.lang = lang
        /** @type {string} */
        this.lang = lang
        /** @type {Object} */
        this.value
        /** @type {string} */
        this.field_name = ''
        /** @type {string|number|null} */
        this.element_id = ''
        /** @type {Array} */
        this.errors = []
   
        if(lang == 'en'){
            /** @type {Function} */
            this.getMessage = messages
        }else if(lang == 'es'){
            /** @type {Function} */
            this.getMessage = messages_es
        }else{
            /** @type {Function} */
            //@ts-ignore
            this.getMessage = lang
        }
    }
    /** 
     * @param {Function} messages 
     */
    setLocale(messages){
        this.getMessage = messages
    }
    /**
     * @param {string|number|null} value 
     * @param {string} field_name 
     * @param {string|number|null} element_id 
     */
    add(value, field_name, element_id = null) {
        this.value = value
        this.field_name = field_name
        this.element_id = element_id

        return this
    }
    /** @param {string|null} personalized_message */
    required(personalized_message = null){
        if(['', null].includes(this.value))
            this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'required', message: personalized_message ?? this.getMessage(this.field_name).required()})
        return this
    }
    /** @param {string|null} personalized_message */
    isNumber(personalized_message = null){
        if(!['', null].includes(this.value))
            if (typeof this.value !== "number")
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'isNumber', message: personalized_message ?? this.getMessage(this.field_name).isNumber()})
        return this
    }
    /** @param {string|null} personalized_message */
    isString(personalized_message = null) {
        if(!['', null].includes(this.value))
            if (typeof this.value !== "string") 
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'isString', message: personalized_message ?? this.getMessage(this.field_name).isString()})
        return this
    }
    /** @param {string|null} personalized_message */
    isEmail(personalized_message = null) {
        if(!['', null].includes(this.value)){
            const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
            if(!this.value.match(validRegex))
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'isEmail', message: personalized_message ?? this.getMessage(this.field_name).isEmail()})
        }
        return this
    }
    /** @param {string|null} personalized_message */
    isTrue(personalized_message = null){
        if(!['', null].includes(this.value))
            if(this.value != true)
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'isTrue', message: personalized_message ?? ''})
        return this
    }
    /** @param {string|null} personalized_message */
    isFalse(personalized_message = null){
        if(!['', null].includes(this.value))
            if(this.value != false)
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'isTrue', message: personalized_message ?? ''})
        return this
    }
    /** @param {string} personalized_message */
    isNull(personalized_message){
        if(this.value != null)
            this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'isFalse', message: personalized_message})
        return this
    }
    /** @param {string} personalized_message */
    isEmpty(personalized_message = null){
        if(this.value != '')
            this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'isEmpty', message: personalized_message ?? this.getMessage(this.field_name).isEmpty()})
    }
    /** @param {number|string} max @param {string|null} personalized_message */
    max(max, personalized_message = null) {
        if(!['', null].includes(this.value) && !['', null].includes(max.toString()))
            if(this.value > max)
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'max', message: personalized_message ?? this.getMessage(this.field_name).max(max)})
        return this
    }
    /** @param {number|string} min @param {string|null} personalized_message */
    min(min, personalized_message = null) {
        if(!['', null].includes(this.value) && !['', null].includes(min.toString()))
            if(this.value < min)
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'min', message: personalized_message ?? this.getMessage(this.field_name).min(min)})
        return this
    }
    /** @param {number} max @param {string|null} personalized_message */
    maxLength(max, personalized_message = null) {
        if(!['', null].includes(this.value))
            if(this.value.toString().length > max)
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'maxLength', message: personalized_message ?? this.getMessage(this.field_name).maxLength(max)})
        return this
    }
    /** @param {number} min @param {string|null} personalized_message */
    minLength(min, personalized_message = null) {
        if(!['', null].includes(this.value))
            if(this.value.toString().length < min)
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'minLength', message: personalized_message ?? this.getMessage(this.field_name).minLength(min)})
        return this
    }
    /**
     * @param {string|number|null} value 
     * @param {string} second_field_name 
     * @param {string|null} personalized_message 
     */
    notEqual(value, second_field_name, personalized_message = null){
        if(!['', null].includes(this.value))
            if(this.value == value)
                this.errors.push({field_name: this.field_name, element_id: this.element_id, error: 'notEqual', message: personalized_message ?? this.getMessage(this.field_name).notEqual(second_field_name)})
        return this
    }
    /** @returns {boolean} */
    hasErrors(){
        const check = this.errors.every(error => error === false);

        return check == true ? false : true    
    }
    /** @returns {string|false} */
    getFirstError(){
        if (this.errors.length > 0) {
            return this.errors[0].message
        }
        return false
    }
    /**
     * @param {Function|null|*} callback 
     * @returns {Array<string>|false|void}
     */
    getErrorsMessages(callback = null) {
        if (this.errors.length > 0) {
            const messages = []

            for (const {message} of this.errors) {
                messages.push(message)
            }

            if(callback)
                return callback(messages)
            return messages
        }

        return false
    }
    /** 
     * @param {Function|null|*} callback 
     * @returns {Array<{field_name: string, element_id: string|number|null, error: string, message: string}>|false}
     */
    getErrorsDetail(callback = null) {
        if (this.errors.length > 0){
            if(callback)
                return callback(this.errors)
            return this.errors
        }
           
        return false
    }
    /**
     * @param {Object|null} ulAttributes id, class, etc.
     * @param {Object|null} liAtributes id, class, etc
     * @returns {HTMLUListElement|false} List of errors with ul and li elements
     */
    getErrorsList(ulAttributes = null, liAtributes = null){
        if (this.errors.length > 0){
            const ul = document.createElement('ul')
            if (ulAttributes) {
                for (const [name, value] of Object.entries(ulAttributes)) {
                    ul.setAttribute(name, value)
                }
            }
        
            for (const {message} of this.errors) {
                const li = document.createElement('li')
                if (liAtributes) {
                    for (const [name, value] of Object.entries(liAtributes)) {
                        ul.setAttribute(name, value)
                    }
                }
                li.innerHTML = message
                ul.appendChild(li)    
            }
        
            return ul
        }

        return false
    }
}