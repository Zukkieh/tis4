const connection = require('../connection');

module.exports = {
    get(req,res){
        var id= req.body.id;
        console.log(id);
        connection.query('SELECT permissao.nivel FROM permissao INNER JOIN paciente ON permissao.idPaciente = paciente.idPaciente WHERE paciente.usuarioPaciente = ?',[id], function (error, results, fields) {
        if (error) {
        // console.log("error ocurred",error);
        res.send({
            "code":400,
            "failed":"error ocurred"
        })
        }else{
        // console.log('The solution is: ', results);
        if(results.length >0){
                return res.json(results[0].nivel);
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