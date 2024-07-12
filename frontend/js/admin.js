//Se utiliza una constante global par almacenar la URL base de la API, que se utilizará para realizar las solicitudes HTTP.
const localhost = 'http://localhost:8080/api_movie_maven_war';

// Este código JavaScript se ejecuta cuando el DOM (Document Object Model) 
// ha sido completamente cargado. 
// Hace una solicitud GET a un servidor para obtener una lista de películas, 
// y luego crea y añade elementos de tabla para cada película al cuerpo de una tabla.

document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch movies and update the table
    async function fetchMovies() {
        fetch(`${localhost}/movies`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error fetching movies: ${response.status} ${response.statusText}`);
                }
            })
            .then(movies => {
                console.log('Fetched movies:', movies);
                const tableBody = document.querySelector('.table tbody');

                if (!tableBody) {
                    console.error('Table body not found');
                    return;
                }

                // Limpiar la tabla antes de agregar las películas
                tableBody.innerHTML = '';

                // Recorremos todas las peliculas y agregamos su contenido a la tabla por cada pelicula
                movies.forEach(movie => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${movie.titulo}</td>
                        <td>${movie.duracion}</td>
                        <td>${movie.genero}</td>
                        <td><img src="${movie.imagen}" alt="${movie.titulo}" width="200"></td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
        }
    
    // LLamado a la función fetchMovies para que se ejecute al cargar la página
    fetchMovies();

    const agregarPelicula = document.getElementById('addMovieButton');

    //Esta función se ejecuta cuando se hace clic en el botón Agregar película, utilizando el método POST para agregar una nueva película en base a los datos ingresados en el form.

    agregarPelicula.onclick = function () {
        event.preventDefault();
        const titulo = document.getElementById('titulo').value;
        const duracion = document.getElementById('duracion').value;
        const genero = document.getElementById('genero').value;
        const imagen = document.getElementById('imagen').value;

        if (!titulo || !duracion || !genero || !imagen) {
            console.error('Faltan datos');
            return;
        }

        fetch(`${localhost}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: titulo,
                duracion: duracion,
                genero: genero,
                imagen: imagen
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Pelicula agregada:', response);
                // Se llama a la función fetchMovies para actualizar la tabla con la nueva película.
                fetchMovies();
            } else {
                throw new Error(`Error al agregar pelicula: ${response.status} ${response.statusText}`);
            }
        })
        .catch(error => {
            console.error('Error al agregar pelicula:', error);
        });
    };
});