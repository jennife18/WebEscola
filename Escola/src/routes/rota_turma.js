const express = require('express');
const router = express.Router();
//Vamos carregar nosso modelo

const Turma = require("../models/Turma");

//____________Rotas da Turma_________________
//Carregando todas as turmas 
router.get('/turma', (req, res) => {
    Turma.findAll().then((turmas) => {
        turmas = turmas.map((turma) => {
            return turma.toJSON();
        });
        res.render("admin/turma/turma", { turmas: turmas });
    });
});

//Abre o Formulario addturma.handlebars
router.get('/turma/add', (req, res) => {
    res.render("admin/turma/addturma");
});

//Abre e preenche o form de edição de turma
router.get('/editar_turma/:id', (req, res) => {
    Turma.findAll({ where: { 'id_turma': req.params.id } }).then((turmas) => {
        turmas = turmas.map((turma) => { return turma.toJSON() });
        res.render("admin/turma/editturma", { turmas: turmas });
    });
}); 

router.post('/turma/nova', (req, res) => {
    Turma.create({
        descricao: req.body.descricao
    }).then(() => {
        res.redirect("/rota_turma/turma");
    }).catch((erro) => {
        res.send('Houve um erro: ' + erro);
    });
});

router.post('/turma/editar_turma', (req, res) => {
    Turma.update({
        descricao: req.body.descricao
    },
        {
            where: { id_turma: req.body.id_turma }
        }).then(() => {
            res.redirect("/rota_turma/turma");
        }).catch((erro) => {
            res.send("Esta turma não existe " + erro);
        });
});

router.get('/deletar_turma/:id', (req, res) => {
    Turma.destroy({ where: { 'id_turma': req.params.id } }).then(() => {
        res.redirect("/rota_turma/turma");
    }).catch((err) => {
        res.render("Essa turma não existe");
    });
});
//_________ Fim das Rotas de Turma __________
module.exports = router;