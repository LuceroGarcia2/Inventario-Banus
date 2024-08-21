const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'arturo1234',
    database: 'inventario'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

// CRUD para Productos

// Crear un producto
app.post('/productos', (req, res) => {
    const { nombreProducto, categoria, fechaRegistro, stock, precio, fechaCaducidad } = req.body;

    // Validar campos requeridos
    if (!nombreProducto || !categoria || stock === undefined || stock < 0 || !precio || !fechaCaducidad) {
        return res.status(400).json({ error: 'Faltan campos requeridos o stock no puede ser negativo' });
    }

    const query = 'INSERT INTO Productos (NombreProducto, Categoria, FechaRegistro, Stock, Precio, FechaCaducidad) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [nombreProducto, categoria, fechaRegistro, stock, precio, fechaCaducidad], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Producto agregado exitosamente', id: result.insertId });
    });
});

// Obtener todos los productos
app.get('/productos', (req, res) => {
    const query = 'SELECT * FROM Productos';
    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Obtener un producto por ID
app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Productos WHERE Id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

// Actualizar un producto por ID
app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { cantidad } = req.body;

    // Validar que se proporcione la cantidad
    if (!cantidad || cantidad < 0) {
        return res.status(400).json({ error: 'Cantidad requerida y no puede ser negativa.' });
    }

    // Consultar el stock actual del producto
    connection.query('SELECT Stock FROM Productos WHERE Id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const producto = results[0];
        if (producto.Stock < cantidad) {
            return res.status(400).json({ error: 'No hay suficiente stock disponible' });
        }

        // Actualizar el stock restando la cantidad proporcionada
        connection.query('UPDATE Productos SET Stock = Stock - ? WHERE Id = ?', [cantidad, id], (err) => {
            if (err) return res.status(500).json({ error: 'Error al actualizar el stock: ' + err.message });
            res.status(200).json({ message: 'Stock actualizado correctamente.' });
        });
    });
});


// Eliminar un producto por ID
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Productos WHERE Id = ?';
    connection.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Producto eliminado correctamente.' });
    });
});

// CRUD para Empleados

// Crear un empleado
app.post('/empleado', (req, res) => {
    const { Nombres, Apellidos, Correo, Contraseña, RFC, CURP, Telefono, Direccion } = req.body;
    const query = 'INSERT INTO empleado (Nombres, Apellidos, Correo, Contraseña, RFC, CURP, Telefono, Direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [Nombres, Apellidos, Correo, Contraseña, RFC, CURP, Telefono, Direccion], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId });
    });
});

// Obtener todos los empleados
app.get('/empleado', (req, res) => {
    const query = 'SELECT * FROM empleado';
    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Obtener un empleado por ID
app.get('/empleado/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Empleado WHERE Id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

// Actualizar un empleado por ID
app.put('/empleado/:id', (req, res) => {
    const { id } = req.params;
    const { Nombres, Apellidos, Correo, Contraseña, RFC, CURP, Telefono, Direccion } = req.body;
    const query = 'UPDATE Empleado SET Nombres = ?, Apellidos = ?, Correo = ?, Contraseña = ?, RFC = ?, CURP = ?, Telefono = ?, Direccion = ? WHERE Id = ?';
    connection.query(query, [Nombres, Apellidos, Correo, Contraseña, RFC, CURP, Telefono, Direccion, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Empleado actualizado correctamente.' });
    });
});

// Eliminar un empleado por ID
app.delete('/empleado/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM empleado WHERE Id = ?';
    connection.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Empleado eliminado correctamente.' });
    });
});

// Iniciar sesión de un empleado
app.post('/empleado/login', (req, res) => {
    const { Correo, Contraseña } = req.body;

    if (!Correo || !Contraseña) {
        return res.status(400).send('Correo y contraseña son requeridos');
    }

    const sql = 'SELECT * FROM Empleado WHERE Correo = ? AND Contraseña = ?';
    connection.query(sql, [Correo, Contraseña], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).send(err);
        }

        if (results.length === 0) {
            return res.status(401).send('Credenciales inválidas');
        }

        const user = results[0];
        delete user.Contraseña; // Eliminar la contraseña de la respuesta

        res.status(200).send(user);
    });
});

// Obtener el conteo de productos por mes
app.get('/producto/contarPorMes', (req, res) => {
    const query = 'CALL contar_productos_por_mes();'; // Llama al procedimiento almacenado

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        // El resultado de un procedimiento almacenado en MySQL viene en un array
        res.json(results[0]); // En este caso, el primer elemento contiene los resultados
    });
});



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
