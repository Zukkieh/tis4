const connection = require('../connection');

module.exports = {
    list(req,res){
        var crfa= req.body.id;
        connection.query('Select * from paciente p inner join fonoaudiologo on fonoaudiologo.idFono = p.idFonoAssoc WHERE p.idPaciente in (Select p2.idPaciente from paciente p2 inner join progresso on progresso.idPaciente = p2.idPaciente where (select COUNT(evolucao) from progresso where evolucao = 100 and idPaciente = p2.idPaciente) = 1) and fonoaudiologo.crfa = ?',[crfa], function (error, results, fields) {
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