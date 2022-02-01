const express = require('express');
const Database = require('./mysqlcon');
const cors = require('cors')
const port = 3001;

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Servidor OK !!!');
})

app.get('/cards', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM alumno', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

app.get('/cards/:id', (req, res) => {
    const { id } = req.params;
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM alumno WHERE id = ?', [id],
        function (err, results, fields) {
            res.json(results[0])
        }
    );

})

app.post('/cards', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO ALUMNO     
                (id, nombre, apellido1, apellido2, discapacidad_fisica, telefono) VALUES
                 (?,?,?,?,?,?)`;

    cn.execute(
        query, [body.id, body.nombre, body.apellido1, body.apellido2, body.discapacidad_fisica, body.telefono],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})

//update
app.put('/cards', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `UPDATE PROFESOR     
                SET nombre=?, apellido1=?, apellido2=?, discapacidad_fisica=?, telefono=? 
                WHERE id = ?`;
    cn.execute(
        query, [body.nombre, body.apellido1, body.apellido2, body.discapacidad_fisica, body.telefono, body.id],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})

app.listen(port, () => {
    console.log('Sevidor Express en: http://localhost:' + port);
})