const { error } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("./models/Contacto");
const app = express();

const Contacto = mongoose.model('contacto');

app.use(express.json());

app.use((req, res, next)=>{
    console.log("Acessou o middleware!");
    res.header("Access-Control-Allow-Origin", "http://localhost:4000/");
    res.header("Access-Control-Allow-Methods", 'GET', 'PUT', 'POST, DELETE')
    app.use(cors());
    next();
});

mongoose.connect('mongodb://localhost/contactos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('conexao com MongoDB feita com successo !');
}).catch((erro) => {
    console.log('erro de conexao com o MongoDB');
});

app.get("/", (req, res) => {
    Contacto.find({}).then((contacto) => {
        return res.json(contacto);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum contacto encontrado!"
        })
    })
});

app.get("/contacto/:id", (req, res) => {
    console.log(req.params.id);
    Contacto.findOne({ _id: req.params.id }).then((contacto) => {
        return res.json(contacto);
    }).catch((erro) => {
        return res.status(400)({
        error: true,
        message: "Nenhum contacto encontrado!"

        })
    })
    
})

app.put("/contacto/:id", (req, res)=>{
    const contacto = Contacto.updateOne({_id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message:"Ocorreu um erro no registo!"
        });
        return res.json({
            error: false,
            message:"Contacto actualizado com sucesso"
        });
    });
});


app.delete("/contacto/:id", (req, res)=>{
    const contacto = Contacto.deleteOne({_id: req.params.id}, (err)=>{
        if(err) return res.status(400).json({
            error:true,
            message:"Error: Contacto nao foi apagado"
        });
        return res.status(400).json({
            error:false,
            message:"Contacto foi apagado do DB"
        });
    });
});

app.post("/contacto", (req, res) => {
    const contacto = Contacto.create(req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Error: Contacto nao foi cadastrado!"
        });
        return res.status(400).json({
            error: false,
            message: "Sucesso Contacto foi cadastrado no mongoBD!"
        });
    });
});

app.listen(8080, () => {
    console.log('servidor iniciado na porta 8080 confira');
});
