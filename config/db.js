const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://0.0.0.0/MEN').then(()=>{
    console.log('Database connected');
})

module.exports = connection;