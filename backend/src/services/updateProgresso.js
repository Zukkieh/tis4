const connection = require('../connection');

module.exports = {
    update(req, res) {
        var evolucao = req.body.progresso;
        var jogo = req.body.jogo;
        var user = req.body.idPaciente;

        connection.query('SELECT idPaciente FROM paciente WHERE usuarioPaciente = ?', [user], function (error, results, fields) {
            if (error) {
                // console.log("error ocurred",error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                // console.log('The solution is: ', results);
                idPaciente = results[0].idPaciente;
                connection.query('UPDATE progresso SET evolucao = ? where idPaciente = ? and jogo = ? and evolucao < ?', [evolucao, idPaciente, jogo, evolucao], function (error, results, fields) {
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
                                "success": "Empty"
                            });
                        }
                    }
                });
            }
        });
        
    }
}