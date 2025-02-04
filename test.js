import Validator from "./validator.js";

const btnEnviar = document.querySelector("#btn-enviar");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
var validator 


const validate = () => {
    const validator = new Validator('es');
    validator.add(nombre.value, 'Nombre', nombre.id).required().minLength(nombre.minLength).maxLength(nombre.maxLength)
    .addListener();
    validator.add(apellido.value, 'Apellido', apellido.id).required().maxLength(apellido.maxLength)
    // .addListener();

    return validator
}

validator = validate()

btnEnviar.addEventListener("click", () => {
    // let validator = validate()

    if (validator.hasErrors()) {
        validator.showErrorsMessages()
        console.log('error');
    }else{
        console.log('success');
    }
})

