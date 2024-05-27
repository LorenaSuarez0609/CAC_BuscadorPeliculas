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


function validar(formulario) {
    //valido el nombre
    if(formulario.name.value.length != nombreUsuario){
        mostrarAlerta('Su Registro es incorrecto, nombre de usuario incorrecto');
        formulario.name.focus();
        return false
    } else{
        document.getElementsByClassName('errorName').innerText = "Campo Correcto";
    }
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
        //valido el nombre
        if(formulario.name.value != nombreUsuario){
            mostrarAlerta('Su Registro es incorrecto, falta Nombre');
            document.getElementsByClassName('errorName').innerText = "Completar Campo";
            formulario.name.focus();
            return false
        } else{
            document.getElementsByClassName('errorName').innerText = "Campo Correcto";
        }
        //validar password
        if(formulario.password.value != password) {
            mostrarAlerta('Su Registro es incorrecto, Ingresar una contraseña valida');
            document.getElementsByClassName('errorPassword').innerText = 'Ingresar una contraseña valida';
            formulario.password.focus();
            return false;
        }
        mostrarAlerta("Gracias, Se ha logueado Correctamente!")
        return true;
    }
    
    function mostrarAlerta(mensaje) {
        Swal.fire(mensaje);
    }
    

function mostrarAlerta(mensaje) {
    Swal.fire(mensaje);
}