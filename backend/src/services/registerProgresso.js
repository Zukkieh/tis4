const connection = require('../connection');

module.exports = {
    register(req, res) {
        var jogo = req.body.jogo;
        var user = req.body.idPaciente;
        var evolucao = req.body.porcentagem;

        connection.query('SELECT idPaciente FROM paciente WHERE usuarioPaciente = ?', [user], function (error, results, fields) {
            if (error) {
                // console.log("error ocurred",error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                // console.log('The solution is: ', results);
                idPac = results[0].idPaciente;
                connection.query('INSERT INTO progresso (idPaciente, jogo, evolucao) values (?,?,?)', [idPac, jogo, evolucao], function (error, results, fields) {
                    if (error) {
                        console.log("error ocurred", error);
                        // res.send({
                        // "code":400,
                        // "failed":"error ocurred"
                        // })
                        return res.json(error.errno);
                    } else {
                        console.log('The solution is: ', results);
                        return res.json(results.affectedRows);
                    }
                });
            }
        });

    }
}