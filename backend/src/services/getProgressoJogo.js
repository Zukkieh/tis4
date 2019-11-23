const connection = require('../connection');

module.exports = {
    get(req,res){
        var id= req.body.id;
        var jogo= req.body.jogo;
        console.log(id);
        connection.query('SELECT progresso.evolucao, permissao.nivel FROM progresso INNER JOIN paciente ON progresso.idPaciente = paciente.idPaciente INNER JOIN permissao ON permissao.idPaciente = paciente.idPaciente WHERE paciente.usuarioPaciente = ? AND progresso.jogo = ? AND permissao.fonema = "R"',[id, jogo], function (error, results, fields) {
        if (error) {
        // console.log("error ocurred",error);
        res.send({
            "code":400,
            "failed":"error ocurred"
        })
        }else{
        // console.log('The solution is: ', results);
        if(results.length >0){
                return res.json(results[0]);
        }
        else{
            res.send({
            "code":204,
            "success":"Empty"
                });
        }
        }
        });
    }
}