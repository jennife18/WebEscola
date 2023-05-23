const express = require("express");
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const rota_turma = require('./routes/rota_turma');
const rota_aluno = require('./routes/rota_aluno');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Rota principal
app.get('/', (req, res) => {
    res.render('home')
});

//Remanejando Rotas de cargo 
app.use('/rota_turma', rota_turma);

//Remanejando Rotas de Cargo
app.use('/rota_aluno', rota_aluno);

const PORT = 8081;
app.listen(PORT, () => {
    console.log("Servidor Rodando");
});
