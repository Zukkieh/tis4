const connection = require('../connection');

module.exports = {
    register(req, res) {
        var users={
            "nomeFono":req.body.nome,
            "crfa":req.body.crfa,
            "cpf":req.body.cpf,
            "emailFono":req.body.email,
            "senhaFono":req.body.senha,
        }
        connection.query('INSERT INTO fonoaudiologo SET ?',users, function (error, results, fields) {
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