const connection = require('../connection');

module.exports = {
    register(req, res) {
        var users={
            "nomePaciente":req.body.nome,
            "nomeResp":req.body.responsavel,
            "telefone":req.body.telefone,
            "usuarioPaciente":req.body.user,
            "senhaPaciente":req.body.senha,
            "idFonoAssoc":req.body.id
        }
        connection.query('INSERT INTO paciente SET ?',users, function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            // res.send({
            // "code":400,
            // "failed":"error ocurred"
            // })
            return res.json(error.errno);
        }else{
            console.log('The solution is: ', results);
            return res.json(results.affectedRows);
        }
        });
    }
}