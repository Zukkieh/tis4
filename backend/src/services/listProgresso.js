const connection = require('../connection');

module.exports = {
    list(req,res){
        var id= req.body.id;
        console.log(id);
        connection.query('SELECT paciente.nomePaciente, progresso.jogo, progresso.evolucao FROM progresso INNER JOIN paciente ON progresso.idPaciente = paciente.idPaciente WHERE paciente.idPaciente = ?',[id], function (error, results, fields) {
        if (error) {
        // console.log("error ocurred",error);
        res.send({
            "code":400,
            "failed":"error ocurred"
        })
        }else{
        // console.log('The solution is: ', results);
        if(results.length >0){
                return res.json(results);
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