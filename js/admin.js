const localhost = 'http://localhost:8080';
const amazonec2 = 'http://34.229.205.194:8080';

document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch movies and update the table
    function fetchMovies() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${amazonec2}/movies`, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const movies = JSON.parse(xhr.responseText);
                        console.log('Fetched movies:', movies);
                        const tableBody = document.querySelector('.table tbody');

                        if (!tableBody) {
                            console.error('Table body not found');
                            return;
                        }

                        // Clear existing rows
                        tableBody.innerHTML = '';

                        // Append new rows
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
                    } catch (e) {
                        console.error('Error parsing JSON:', e);
                    }
                } else {
                    console.error(`Error fetching movies: ${xhr.status} ${xhr.statusText}`);
                }
            }
        };
    }

    // Call fetchMovies to load movies when the page loads
    fetchMovies();

    const agregarPelicula = document.getElementById('addMovieButton');

    agregarPelicula.onclick =  function () {
        event.preventDefault();
        const titulo = document.getElementById('titulo').value;
        const duracion = document.getElementById('duracion').value;
        const genero = document.getElementById('genero').value;
        const imagen = document.getElementById('imagen').value;

        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${amazonec2}/movies`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        try{
            xhr.send(JSON.stringify({
                titulo: titulo,
                duracion: duracion,
                genero: genero,
                imagen: imagen
            }));
        }catch(e){
            console.error('Error al agregar pelicula:', e);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 201) {
                    console.log('Pelicula agregada:', xhr.responseText);
                    fetchMovies();
                } else {
                    console.error(`Error al agregar pelicula: ${xhr.status} ${xhr.statusText}`);
                }
            }
        };
    };
});
