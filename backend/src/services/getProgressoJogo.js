const connection = require('../connection');

module.exports = {
    get(req,res){
        var id= req.body.id;
        var jogo= req.body.jogo;
        console.log(id);
        connection.query('SELECT progresso.evolucao FROM progresso INNER JOIN paciente ON progresso.idPaciente = paciente.idPaciente WHERE paciente.usuarioPaciente = ? AND progresso.jogo = ?',[id, jogo], function (error, results, fields) {
        if (error) {
        // console.log("error ocurred",error);
        res.send({
            "code":400,
            "failed":"error ocurred"
        })
        }else{
        // console.log('The solution is: ', results);
        if(results.length >0){
                return res.json(results[0].evolucao);
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