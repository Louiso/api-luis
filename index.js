const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const morgan = require('morgan');

const app = express();
const PORT = 3000 || process.env.PORT;

const Kitten = require('./models/kitty');

app.use(bodyParser.urlencoded( { extended: false } ));
app.use(morgan('dev'));
mongoose.connect('mongodb://127.0.0.1:27017/LouisoDB', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('La base de datos esta conectada :)');
    app.listen(PORT,()=>{
        console.log('El servidor esta corriendo en el puerto : ' + PORT);
    });
});

var router = express.Router();

router.get('/',(req,res)=>{
    res.status(200);
    res.json({message:'Hola'});
});

router.post('/api/kitten',(req,res)=>{
    console.log(req.body);
    let gatito = new Kitten();
    gatito.name = req.body.name;
    gatito.dueño = req.body.dueño;
    gatito.save((err,productoGuardado)=>{
        if(err){
            res.status(500);
            res.send('Ella no te ama');
        }
        res.status(200);
        res.json(productoGuardado);
    });
    
});

router.get('/api/kittens',(req,res)=>{
    
});

app.use(router);