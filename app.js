const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const app = express();
const mongoose = require('./mongodb/mongodb.connect');

mongoose.connect();

app.use(express.json());

app.use("/api/todos", todoRoutes);

app.get('/', (req, res) => {
    res.send('express test')
})

app.use((err, req, res, next) => {
    res.status(500).json({Message: err.message});
});

// app.listen(3000, () => {
//    console.log('server is running on http://localhost:3000');
// })

module.exports = app;