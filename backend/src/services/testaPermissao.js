const connection = require('../connection');

module.exports = {
    login(req, res) {
        var usuarioPaciente = req.body.id;
        var fonema = req.body.fonema;
        connection.query('SELECT permissao.fonema FROM permissao INNER JOIN paciente ON paciente.idPaciente = permissao.idPaciente WHERE paciente.usuarioPaciente = ? AND permissao.fonema = ?', [usuarioPaciente, fonema], function (error, results, fields) {
            if (error) {
                // console.log("error ocurred",error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                // console.log('The solution is: ', results);
                if (results.length > 0) {
                      return res.json(results);
                }
                else {
                    res.send({
                        "code": 204,
                        "success": "!Exist"
                    });
                }
            }
        }
        );
    }
}