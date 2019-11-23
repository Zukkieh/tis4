const connection = require('../connection');

module.exports = {
    set(req, res) {
        var id = req.body.id;
        var level = req.body.level
        connection.query('UPDATE permissao SET nivel = ? where idPaciente = ?', [level, id], function (error, results, fields) {
            if (error) {
                // console.log("error ocurred",error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
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
            }
        });
    }
}