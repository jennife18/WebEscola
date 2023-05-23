const db = require('./db');
//Reproduzindo a tabela turma
const Turma = db.sequelize.define('turma', {
    id_turma: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: db.Sequelize.TEXT
    }
    //freezeTableName: true define
    //o nome da tabela sem o S
}, { freezeTableName: true});
module.exports = Turma;