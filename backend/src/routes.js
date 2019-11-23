const express = require('express');

const register = require('./services/register');

const registerPaciente = require('./services/registerPaciente');

const loginPaciente = require('./services/loginPaciente');

const loginFono = require('./services/loginFono');

const findFono = require('./services/findFono');

const listPacientes = require('./services/listPacientes');

const updatePassword = require('./services/updatePassword');

const registerPermissao = require('./services/registerPermissao');

const registerProgresso = require('./services/registerProgresso');

const listProgresso = require('./services/listProgresso');

const updateProgresso = require('./services/updateProgresso');

const testaPermissao = require('./services/testaPermissao');

const listCertificado = require('./services/listCertificado');

const getProgressoJogo = require('./services/getProgressoJogo');

const setLevel = require('./services/setLevel');

const clearGame = require('./services/clearGame');

const getLevel = require('./services/getLevel');


const routes = express.Router();

routes.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});

routes.post('/findFono',findFono.find);
routes.post('/listPacientes',listPacientes.list);
routes.post('/register',register.register);
routes.post('/registerPaciente',registerPaciente.register);
routes.post('/loginP',loginPaciente.login);
routes.post('/loginF',loginFono.login);
routes.post('/updatePassword',updatePassword.update);
routes.post('/registerPermissao', registerPermissao.register);
routes.post('/registerProgresso', registerProgresso.register);
routes.post('/listProgresso', listProgresso.list);
routes.post('/updateProgresso', updateProgresso.update);
routes.post('/testaPermissao', testaPermissao.login);
routes.post('/listCertificado', listCertificado.list);
routes.post('/getProgressoJogo', getProgressoJogo.get);
routes.post('/setLevel', setLevel.set);
routes.post('/clearGame', clearGame.delete);
routes.post('/getLevel', getLevel.get);


module.exports = routes;
