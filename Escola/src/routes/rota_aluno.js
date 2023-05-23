//Importações
const express = require('express');
const router = express.Router();
//Vamos carregar nosso modelo
const Turma = require("../models/Turma");
const Aluno = require("../models/Aluno");
//__________Rotas dos Alunos_________

//Abre e carrega todas informações do aluno no formulário aluno.handlebarss
router.get('/aluno', (req, res) => {
    Aluno.sequelize.query("select * from selecAluno",
    { model: Aluno }).then(function (alunos) {
        var nalunos = JSON.parse(JSON.stringify(alunos));
        res.render("admin/aluno/aluno",
            { alunos: nalunos });
    });
});

//Abre o Formulário addaluno.handlebars
router.get('/aluno/add', (req, res) => {
    //Pega as turma cadastradas para popular o select do html
    Turma.findAll().then((turmas) => {
        var nturmas = JSON.parse(JSON.stringify(turmas));
        res.render("admin/aluno/addaluno", { turmas: nturmas});
    });
});

//Abre e preenche o formulário editaluno.handlebars com informações do id passado
router.get('/editar_aluno/:id', (req, res) => {
    Aluno.findAll({ where: { 'id_aluno': req.params.id } }).then((alunos) => {
        //Pega as turmas cadastradas para popular o select do html
        Turma.findAll().then((turmas) => {
            var nturmas = JSON.parse(JSON.stringify(turmas));
            var nalunos = JSON.parse(JSON.stringify(alunos));
            res.render("admin/aluno/editaluno", { alunos: nalunos, turmas: nturmas });
        });
    });
});

//Recebe as informações do botão que está no e efetua o cadastro no banco de dados
router.post('/aluno/nova', (req, res) => {
    Aluno.create({
        matricula: req.body.matricula,
        nome: req.body.nome,
        fk_turma: req.body.fk_turma
    }).then(() => {
        res.redirect("/rota_aluno/aluno");
    }).catch((erro) => {
        res.send('Houve um erro: ' + erro);
    });
});

//Recebe as informações do botão que está no edialuno e efetua a alteração no banco de dados. Volta para li
router.post('/aluno/editar_aluno', (req, res) => {
    Aluno.update({
        matricula: req.body.matricula,
        nome: req.body.nome,
        fk_turma: req.body.fk_turma
    },
        {
            where: { id_aluno: req.body.id_aluno }
        }).then(() => {
            res.redirect("/rota_aluno/aluno");
        }).catch((erro) => {
            res.send("Este aluno não existe " + erro);
        });
});

//No form aluno.handlebars que lista os alunos possui um botão para deletar Ele deleta informação e refaz a lista no aluno.handlebars
router.get('/deletar_aluno/:id', (req, res) => {
    Aluno.destroy({ where: { 'id_aluno': requestAnimationFrame.params.id } }).then(() => {
        res.redirect("/rota_aluno/aluno");
    }).catch((err) => {
        res.render("Esse aluno não existe");
    });
});

//__________Fim das Rotas do Aluno_____________
module.exports = router;