//No tocar el codigo desde aqui hacia abajo
const express = require ('express');
const mysql = require('mysql');
const cors = require('cors');
const { result } = require('lodash');
const app = express();

app.use(express.json());
app.use(cors());

//Parametros
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_contactos'
});

//Conexion a la base de datos
conexion.connect((error)=>{
    if(error){
        throw error;
    }
    else{
        console.log('Conexion exitosa');
    } 
})


const puerto = process.env.PUERTO || 3000;
//Ruta de inicio
app.get('/', function(req,res){
    res.send('Ruta INICIO');
});

app.listen('3000', () => {
    console.log('Server on port: ' + puerto);
});

//No tocar el codigo desde aqui hacia arriba





//Mostrar registros de la BD
app.get('/api/contactos/', (req, res) => {
    conexion.query('SELECT * FROM contactos', (error, fila) => {
        if(error){
            throw error;
        }
        else{
            res.send(fila);
        }
    });
});

//Insertar datos en la bd
app.post('/api/contactos', (req, res) => {
    let datos = {nombre:req.body.nombre, apellido:req.body.apellido, correo_electronico:req.body.correo_electronico, telefono:req.body.telefono};
    let sql = "INSERT INTO contactos SET ?";
    conexion.query(sql, datos, (error, resultado) =>{
        if(error){
            throw error;
        }
        else{
            Object.assign(data, {id: result.insertid})
            res.send(data);
        }   
    });       
});

//Actualizar datos en la BD
app.put('/api/contactos/:id', (req, res) => {

    let id = req.params.id;
    let nombre = req.body.nombre, apellido = req.body.apellido, 
    correo_electronico = req.body.correo_electronico, telefono = req.body.telefono;
    
    let sql = "UPDATE contactos SET nombre = ?, apellido = ?, correo_electronico = ?, telefono = ? WHERE id = ?";
    conexion.query(sql, [nombre, apellido, correo_electronico, telefono, id], (error, resultados) => {
        if(error){
            throw error;
        }
        else{
            res.send(resultados);
        }

    })  
});

//Eliminar datos en la BD
app.delete('/api/contactos/:id', (req, res) => {
    conexion.query('DELETE FROM contactos WHERE id = ?', [req.params.id], (error, resultados) => {
        if(error){
            throw error;
        }
        else{
            res.send(resultados);
        }
    });

});








