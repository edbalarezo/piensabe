const express = require('express');
const Database = require('./mysqlcon');
const cors = require('cors')
const port = 3001
const app = express();
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Servidor OK !!!');
})

app.get('/cards', (req, res) => 
{
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM alumnos', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

app.get('/cards/:id_alumno', (req, res) => {
    const { id_alumno } = req.params;
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM alumnos WHERE id = ?', [id_alumno],
        function (err, results, fields) {
            res.json(results[0])
        }
    );

})

 app.post('./cards',(req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO ALUMNOS    
                (id_alumno, nombre, apellidos, fech_nac) VALUES
                 (?,?,?,?)`;

    cn.execute(
        query, [body.id_alumno, body.nombre, body.apellidos, body.fech_nac],
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

app.put('/cards', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `UPDATE ALUMNOS 
               SET nombre=?, apellidos=?, fecha_nac=?
               WHERE id_alumno = ?`;
    cn.execute(
        query, [body.nombre, apellidos, body.fech_nac],
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
});
app.listen(port, () => {
    console.log('Servidor Express en: http://localhost:'+ port)


}
)