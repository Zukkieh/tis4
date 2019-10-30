const connection = require('../connection');

module.exports = {
    list(req,res){
        var crfa= req.body.id;
        connection.query('SELECT * FROM paciente INNER JOIN fonoaudiologo ON paciente.idFonoAssoc = fonoaudiologo.idFono WHERE fonoaudiologo.crfa = ?',[crfa], function (error, results, fields) {
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