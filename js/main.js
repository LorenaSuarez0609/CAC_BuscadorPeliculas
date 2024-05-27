document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log(this);
    if (validar(this)) {
        this.submit();
    }
});

function limpiarError() {
    var errores = document.getElementsByClassName('error');
    for ( let i = 0; i< errores.length; i++ ){
        errores[i].innerHTML = '';
    }
    limpiarError();
}


function validar(formulario) {
    //variable para el campo email
    var expReg =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/
    //valido el nombre
    if(formulario.name.value.length == 0){
        mostrarAlerta('Su Registro es incorrecto, falta Nombre');
        document.getElementsByClassName('errorName').innerText = "Completar Campo";
        formulario.name.focus();
        return false
    } else{
        document.getElementsByClassName('errorName').innerText = "Campo Correcto";
    }
    //valido el apellido
    if(formulario.lastName.value.length == 0){
        mostrarAlerta('Su Registro es incorrecto, falta Apellido');
        document.getElementsByClassName('errorLastName').innerText = "Completar campo";
        formulario.lastName.focus();
        return false
    }else{
        document.getElementsByClassName('errorLastName').innerText = "Campo Correcto";
    }
    //valido email
    if(!expReg.test(formulario.email.value)) {
        mostrarAlerta('Su Registro es incorrecto, ingrese un mail valido');
        document.getElementsByClassName('errorEmail').innerText = "ingresar un email valido";
        formulario.email.focus();
        return false;
    }else{
        document.getElementsByClassName('errorEmail').innerText = "Campo Correcto";
    }
    //validar password
    if(formulario.password.value.trim().length ==0) {
        mostrarAlerta('Su Registro es incorrecto, Ingresar una contraseña valida');
        document.getElementsByClassName('errorPassword').innerText = 'Ingresar una contraseña valida';
        formulario.password.focus();
        return false;
    }
    //validacio de pais
    if(formulario.pais.value==''){
        mostrarAlerta('Su Registro es incorrecto, Ingresar un pais');
        document.getElementsByClassName('errorPais').innerText = 'Ingresar un pais';
        formulario.pais.focus();
        return false;
    }
    //validar fecha
     //validación de fecha
    if (formulario.fecha.value == ''){  
        mostrarAlerta('Su Registro es incorrecto, Seleccione una fecha válida');
        document.getElementsByClassName('errorFecha').innerText = 'Seleccione una fecha válida';
        formulario.fecha.focus();
        return false;
    }
    //contraseñass iguales
    if (formulario.password.value != formulario.confirmarPassword.value){
        mostrarAlerta('Su Registro es incorrecto, Las contraseñas no son iguales');
        document.getElementsByClassName('confirmarErrorPassword').innerText = 'Las contraseñas no son iguales';
        formulario.confirmarPassword.focus();
        return false;
    }else{
        document.getElementsByClassName('errorEmail').innerText = "Campo Correcto";
    }
    if(!formulario.terminos.checked){
        mostrarAlerta('Su Registro es incorrecto, terminos no esta confirmado');
        document.getElementsByClassName('confirmarTerminos').innerText = 'debe confirmar terminos';
        formulario.terminos.focus();
        return false;
    }
    Swal.fire("Gracias, Se ha registrado Correctamente!")
    return true;
}

function mostrarAlerta(mensaje) {
    Swal.fire(mensaje);
}