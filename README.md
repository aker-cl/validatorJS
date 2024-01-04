<p align="center"><img src="https://utilesjs.neocities.org/LogosProyectos/validatorjs.png" alt="UtilesJS Logo"></p>

JavaScript library to validate the values of the fields of forms or variables in general

## Installation

```sh
npm i @aker/validatorjs
```

## Available languages

- English ('en') Default
- Spanish ('es')
- Italian ('it')
- Portuguese ('pt')
- French ('fr')
- Deutsch ('de')
- Japanese ('ja')
- Chinese ('zh')
- Russian ('ru')

## Usage example

```js
import Validator from '@aker/validatorjs'
import it from '@aker/validatorjs/lang/it'

const validator = new Validator()
// const validator = new Validator('es')
// const validator = new Validator(it)

const number = 133
const text = 'John Doe'
const inputLastName = document.querySelector('#last-name')
const inputEmail = document.querySelector('#email')

validator.add(number, 'Number const').required().isNumber().min(150).maxLength(4)
validator.add(text, 'Text const').isString().minLength(3)
validator.add(inputLastName.value, 'Last name', inputLastName.id).required('The last name is required, please check it.').isString().minLength(inputLastName.minLength)
validator.add(inputEmail.value, 'Email', 'error_email_div').required().isString().isEmail()

if(validator.hasErrors()){
    console.log(validator.getFirstError())
    // or
    console.log(validator.getErrorsMessages())
    // or
    console.log(validator.getErrorsDetail())
    // or
    document.querySelector('#div-errors').appendChild(validator.getErrorsList())
}
```

## Methods

> Note: The `personalized_message` parameter is to show a custom error message for each error.

| Method | Description |
|-|-|
| `add(value: string/number/null, field_name: string, element_id: string/number/null)` | Add the value to the validations |
| `required(personalized_message: string/null)` | Check if the field value is empty or null |
| `isNumber(personalized_message: string/null)` | Check if the field value is a number or not |
| `isString(personalized_message: string/null)` | Check if the field value is a text or not |
| `isEmail(personalized_message: string/null)` | Check if the field value has email format |
| `isTrue(personalized_message: string/null)` | Check if the field value is true or not |
| `isFalse(personalized_message: string/null)` | Check if the field value is false or not |
| `isNull(personalized_message: string/null)` | Check if the field value is null or not |
| `isEmpty(personalized_message: string/null)` | Check if the field value is empty or not |
| `max(max: number, personalized_message: string/null)` | Check if the field value is less than or equal to the max value |
| `min(min: number, personalized_message: string/null)` | Check if the field value is greater than or equal to the min value |
| `maxLength(max: number, personalized_message: string/null)` | Check if the length of the field value is less than or equal to the max value |
| `minLength(min: number, personalized_message: string/null)` | Check if the length of the field value is greater than or equal to the min. |
| `notEqual(value: string/number/null, second_field_name: string, personalized_message: string/null)` | Check if the field value is not equal to the first value entered. |
| `hasErrors()` | Check if any field has an error. Return true o false |
| `getErrorsMessages()` | Returns errors messages in an array |
| `getErrorsDetail()` | Returns errors in this format [... {field_name: string, error: string, message: string}] |
| `getErrorsList(ulAttributes: Object/null, liAtributes: Object/null` | Returns errors in an HTML listing. You can indicate the attributes of the elements UL and LI through an object: {class, id, etc} |

## Release Notes

### v1.0.0 - Jan 04, 2024

- Validator project uploaded

## License

This library is licensed under the MIT License.
