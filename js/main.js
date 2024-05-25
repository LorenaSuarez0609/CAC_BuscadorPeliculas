document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (validar(this)) {
        this.submit();
    }
});

function limpiarError() {
    var errores = document.getElementsByClassName('error');
    for ( let i=0; i<errores.length; i++){
        errores[i].innerHTML = '';
    }
    limpiarError();
}

function validar(formulario) {

    var expReg = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

    if(formulario.name.value.length == 0){
        alert('Su Registro es incorrecto, faltan datos o datos incorrectos en Nombre');
        document.getElementById('errorName').innerText = "Completar Campo";
        formulario.name.focus();
        return false
    } else{
        document.getElementById('errorName').innerText = "Campo Correcto";
    }

    if(formulario.lastName.value.length == 0){
        alert('Su Registro es incorrecto, faltan datos o datos incorrectos en apellido')
        document.getElementById('errorLastName').innerText = "completar campo";
        formulario.lastName.focus();
        return false
    }else{
        document.getElementById('errorLastName').innerText = "Campo Correcto";
    }

    if(!expReg.test(formulario.email.value)) {
        document.getElementById('errorEmail').innerText = "ingresar un email valido";
        formulario.email.focus();
        return false;
    }

    if(formulario.password.value.trim().length ==0) {
        document.getElementById('errorPassword').innerText = 'Ingresar una contraseña valida';
        formulario.password.focus();
        return false;
    }

    if (formulario.password.value != formulario.confirmarPassword.value){
        document.getElementById('confirmarErrorPassword').innerText = 'Las contraseñas no son iguales';
        formulario.confirmarPassword.focus();
    }

    alert('se genero registro correctamente');
    return true;
}

function mostrarAlerta() {
    Swal.fire("Se ha guardado tu confirmacion, Gracias!");
}