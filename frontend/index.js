//variables
const url = 'http://localhost:3000/api/contactos/';
var contenedor = document.querySelector('tbody');
let resultados = '';


const modalContactos =  new bootstrap.Modal(document.getElementById('modalContactos'))
const formContacto = document.querySelector('form');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const correo_electronico = document.getElementById('correo_electronico');
const telefono = document.getElementById('telefono');
let opcion = '';

btnCrear.addEventListener('click', ()=>{
        nombre.value = ''
        apellido.value = ''
        correo_electronico.value = ''
        telefono.value = ''
        modalContactos.show();
        opcion = 'crear'

})

const mostrar = (contactos) =>{
    contactos.forEach(contacto => {
        resultados += 
        `<tr>
            <td>${contacto.id}</td>
            <td>${contacto.nombre}</td>
            <td>${contacto.apellido}</td>
            <td>${contacto.correo_electronico}</td>
            <td>${contacto.telefono}</td>
            <td class="text-center"><a class="btnEdictar btn btn-primary">Edictar</a><a class="btnEliminar btn btn-danger">Eliminar</a></td>
            
        </tr>
    `
    });
    contenedor.innerHTML = resultados;
}


fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch( error => console.log(error));


//Borrar
    const on = (element, event, selector, handler) => {
        element.addEventListener(event, e => {
            if(e.target.closest(selector)){
                handler(e)
            }
        })
    }

    on(document, 'click', '.btnEliminar', e => {

        const fila = e.target.parentNode.parentNode
        const id = fila.firstElementChild.innerHTML
        alertify.confirm("¿Estas seguro que quieres eliminar el contacto?",
        function(){
            fetch(url+id, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(()=> location.reload())
            // alertify.success('Contacto eliminado');
        },

        function(){
        alertify.error('Se cancelo la operacion');
        });
    })




    let id = 0;
    on(document, 'click', '.btnEdictar', e => {
        const fila = e.target.parentNode.parentNode
        id = fila.children[0].innerHTML
        const nombreForm = fila.children[1].innerHTML
        const apellidoForm = fila.children[2].innerHTML
        const correo_electronicoForm = fila.children[3].innerHTML
        const telefonoForm = fila.children[4].innerHTML


        nombre.value = nombreForm
        apellido.value = apellidoForm
        correo_electronico.value = correo_electronicoForm
        telefono.value = telefonoForm

        opcion = 'edictar'
        modalContactos.show();
    })

    formContacto.addEventListener('submit', (e) => {
        e.preventDefault()
        if(opcion == 'crear'){ 
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre:nombre.value,
                    apellido:apellido.value,
                    correo_electronico:correo_electronico.value,
                    telefono:telefono.value
                })
            })
            .then(response => response.json())
            .then(data => {
                const nuevoContacto = []
                nuevoContacto.push(data)
                mostrar(nuevoContacto)
            })
            .then(response => location.reload())
        }
        if(opcion == 'edictar'){
            fetch(url+id, {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                
                body: JSON.stringify({
                nombre:nombre.value,
                apellido:apellido.value,
                correo_electronico:correo_electronico.value,
                telefono:telefono.value
            })
        })
        .then(response => response.json())
        .then(response => location.reload())
    }
        modalContactos.hide()
    })