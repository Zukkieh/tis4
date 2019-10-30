const connection = require('../connection');

module.exports = {
    register(req, res) {
        var permission ={
            "idPaciente":req.body.idPaciente,
            "fonema":req.body.fonema
        }
        connection.query('INSERT INTO permissao SET ?',permission, function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            // res.send({
            // "code":400,
            // "failed":"error ocurred"
            // })
            return res.json(error.errno);
        }else{
            console.log('The solution is: ', results);
            return res.json(results.affectedRows);
        }
        });
    }
}