const connection = require('../connection');

module.exports = {
    delete(req,res){
        var id= req.body.id;
        var jogo= req.body.jogo;
        connection.query('SELECT idPaciente FROM paciente WHERE usuarioPaciente = ?', [id], function (error, results, fields) {
            if (error) {
                // console.log("error ocurred",error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                // console.log('The solution is: ', results);
                idPaciente = results[0].idPaciente;
                connection.query('DELETE FROM progresso WHERE idPaciente = ? AND jogo = ? ',[idPaciente, jogo], function (error, results, fields) {
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