var ConnectyCube = require('connectycube');

var CREDENTIALS = {
    appId: 653,
    authKey: 'Nza5QLtJgXb29Yv',
    authSecret: '9nRQYVvGeyNbPxK'
};
var CONFIG = {
    debug: { mode: 1 } // enable DEBUG mode (mode 0 is logs off, mode 1 -> console.log())
};
ConnectyCube.init(CREDENTIALS, CONFIG);

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 4000;

var router = express.Router();

router.route('/registration')
    .post(function (req, res) {
        ConnectyCube.createSession(CREDENTIALS, function (error, session) {
            var userProfile = {
                'login': req.body.login,
                'password': req.body.password,
                'email': req.body.email,
            };

            ConnectyCube.users.signup(userProfile, function (error, user) {
                if (error) res.send(error).status(500)
                else {
                    res.status(200).send({ token: session.token, id: user.id })
                }
            });
        });
    })

router.route('/login')
    .post(function (req, res) {
        ConnectyCube.createSession(CREDENTIALS, function (error, session) {
            var userCredentials = { email: req.body.email, password: req.body.password };

            ConnectyCube.login(userCredentials, function (error, user) {
                if (error) res.send({ message: "login or password is wrong" })
                else {
                    console.log("sessssssssssionID", user.id)
                    res.status(200).send({ token: session.token, id: user.id })
                }
            });
        });
    })

router.route('/get-user')
    .post(function (req, res) {
        ConnectyCube.createSession(CREDENTIALS, function (error, session) {
            console.log("IDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",req.body.id)
            var searchParams = { filter: { field: 'id', param: 'in', value: req.body.id } };

            ConnectyCube.users.get(searchParams, function (error, result) {
                if (error) {
                    console.log("error");
                }
                else {
                    console.log(result);
                    res.status(200).send(result);
                }
            });
        });
    })

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}
app.use(allowCrossDomain);

app.use('/api', router);

app.listen(port);