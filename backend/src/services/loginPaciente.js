const connection = require('../connection');

module.exports = {
    login(req, res) {
        var usuarioPaciente = req.body.user;
        var senhaPaciente = req.body.senha;
        connection.query('SELECT * FROM paciente WHERE usuarioPaciente = ?', [usuarioPaciente], function (error, results, fields) {
            if (error) {
                // console.log("error ocurred",error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                // console.log('The solution is: ', results);
                if (results.length > 0) {
                    if (results[0].senhaPaciente == senhaPaciente) {
                        return res.json(results[0]);
                    }
                    else {
                        res.send({
                            "code": 204,
                            "success": "!Exist"
                        });
                    }
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
}