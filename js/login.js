const localhost= 'http://localhost:8080'
const localhost = 'http://34.229.205.194:8080';

var nombreUsuario = "nombre";
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
    const nombreUsuario = String(formulario.nombre.value);
    const encodedNombreUsuario = encodeURIComponent(nombreUsuario);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${localhost}/users?nombre=${encodedNombreUsuario}`, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4){
            if (xhr.status === 200) {
            const users = JSON.parse(xhr.responseText);
            if (users.length === 0) {
                mostrarAlerta('Error', 'Error al iniciar sesión, Credenciales Incorrectas', 'error', formulario.nombre);
                document.getElementsByClassName('errorName')[0].innerText = 'Credenciales Incorrectas';
                return false;
            }
            else {
                users.forEach(user => {
                    if(formulario.password.value != user.password){
                        mostrarAlerta('Error','Error al iniciar sesión,  Credenciales Incorrectas', 'error', formulario.nombre);
                        document.getElementsByClassName('errorName').innerText = 'Credenciales Incorrectas';
                        return false
                    }
                    mostrarAlerta('Éxito',"Gracias, Se ha logueado Correctamente!", "success")
                    setTimeout(() => { return true; }, 5000);
                });
            }
        }
        else {
            mostrarAlerta('Error','Error al iniciar sesión,  Credenciales Incorrectas', 'error', formulario.nombre);
            document.getElementsByClassName('errorName').innerText = 'Credenciales Incorrectas';
            console.error('Error fetching users:', xhr.responseText);
        }
    }
    };
}