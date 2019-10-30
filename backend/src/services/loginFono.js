const connection = require('../connection');

module.exports = {
    login(req, res) {
        var crfa = req.body.user;
        var senhaFono = req.body.senha;
        connection.query('SELECT * FROM fonoaudiologo WHERE crfa = ?', [crfa], function (error, results, fields) {
            if (error) {
                // console.log("error ocurred",error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                // console.log('The solution is: ', results);
                if (results.length > 0) {
                    if (results[0].senhaFono == senhaFono) {
                        console.log(results[0])
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