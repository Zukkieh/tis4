const connection = require('../connection');

module.exports = {
    update(req, res) {
        var id = req.body.id;
        var password = req.body.password;
        var current = req.body.current;
        var perfil = req.body.perfil;
        if(perfil == "paciente"){
            connection.query('UPDATE paciente SET senhaPaciente = ? WHERE usuarioPaciente = ? and senhaPaciente = ?', [password, id, current], function (error, results, fields) {
                if (error) {
                    // console.log("error ocurred",error);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    })
                } else {
                    // console.log('The solution is: ', results);
                    if (results.length > 0) {
                        return res.json(results);
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
        else {
            connection.query('UPDATE fonoaudiologo SET senhaPaciente = ? WHERE usuarioPaciente = ? and senhaPaciente = ?', [password, id, current], function (error, results, fields) {
                if (error) {
                    // console.log("error ocurred",error);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    })
                } else {
                    // console.log('The solution is: ', results);
                    if (results.length > 0) {
                        return res.json(results);
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
    }