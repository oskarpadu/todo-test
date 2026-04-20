const mongoose = require('mongoose');

async function connect() { 
try {
    await mongoose.connect(
        'mongodb://localhost:27017/todo-tdd'
    );
    } catch (error) {
        console.error('Error connecting to MongoDB',);
        console.error(error);
    } 
}

module.exports = {connect};
