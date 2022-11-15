export function valida(input){
    const tipoInput = input.dataset.tipo;
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoInput, input);
    }
}

const tipoErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio"
    },
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Al menos un número, una letra en mayúscula, una letra en minúscula. Mínimo 6 y máximo 12 caracteres"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes ser mayor de 18 años"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es xxxxxxxxxx"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Este campo debe contener entre 10 y 40 caracteres"
    },
    cuidad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Este campo debe contener entre 5 y 40 caracteres"
    },
    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Este campo debe contener entre 5 y 40 caracteres"
    }
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeError(tipoInput, input){
    let mensaje = ""

    tipoErrores.forEach(error =>{
        if(input.validity[error]){
            mensaje = mensajesError[tipoInput][error];
        };
    });


    return mensaje
}

function validarNacimiento(input){
    const fechaUsuario = new Date (input.value);
    let mensaje = ""
    if (!mayorEdad(fechaUsuario)){
        mensaje = "Debes ser mayor de 18 años"
    }

    input.setCustomValidity(mensaje)
};

function mayorEdad(fecha) {
    const fechaActual = new Date ();
    const diferenciaFecha = new Date (fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());

    return diferenciaFecha <= fechaActual
};