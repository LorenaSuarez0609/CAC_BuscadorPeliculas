var nombreUsuario = "nombre"
var password = "123456"

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

function mostrarAlerta(titulo, mensaje, tipo,campoFocus) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: tipo, // 'success', 'error', 'warning', 'info'
        confirmButtonText: 'Aceptar'
    }).then(() => {
        if (campoFocus) {
            campoFocus.focus();
        }
    });
}

function validar(formulario) {
    //valido el nombre
    if(formulario.nombre.value != nombreUsuario){
        mostrarAlerta('Error','Error al iniciar sesión,  Credenciales Incorrectas', 'error', formulario.nombre);
        document.getElementsByClassName('errorName').innerText = 'Credenciales Incorrectas';
        return false
    } 
    //validar password
    if(formulario.password.value != password) {
        mostrarAlerta('Error','Error al iniciar sesión,   Credenciales Incorrectas', 'error', formulario.password);
        document.getElementsByClassName('errorPassword').innerText = 'Credenciales Incorrectas';
        formulario.password.focus();
        return false;
    }
    mostrarAlerta('Éxito',"Gracias, Se ha logueado Correctamente!", "success")
    setTimeout(() => { return true; }, 5000);
}