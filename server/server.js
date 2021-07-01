const express = require('express');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser');
var methodOvereide = require('method-override');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(methodOvereide());
const allowedOrigins = [
'capacitor://localhost',
'ionic://localhost',
'http://localhost',
'http://localhost:8080',
'http://localhost:8100'
];

const corsOptions = {
    origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
    callback(null, true);
    } else {
    callback(new Error('Origin not allowed by CORS'));
    }
    }
    }
    app.options('*', cors(corsOptions));

    app.get('/', cors(corsOptions), (req, res, next) => {
        res.json({ message: 'Deployment has no issue' });
        })

    const db = mysql.createPool({
    connectionLimit: 100,
    host: '182.50.133.92',
    user: 'team2',
    password: 'team2pwd',
    database: 'Team2'
    });
    db.getConnection((err1) => {
    console.log('Connecting mySQL....')
    if (err1) {
    throw err1;
    }
    console.log('Mysql connected....')
    db.query('select * from UserAccount;', function (err2, result, field) {
    if (!err2) {
    console.log(result);
    }
    else {
    console.log(err2)
    }
    });
    });


//Get User Details
app.route('/getUser', cors(corsOptions))
    .post(function (request, response) {
        var ADDRESS = request.body.location;
        var CURRENTUSER = request.body.currentUser

       //var AGE = request.body.username;
       // var USERCREATED = request.params.USERCREATED;
        db.query('SELECT * FROM Team2.UserProfile where address like ? AND userID !=?;', ['%' + ADDRESS + '%', CURRENTUSER], function (error, result, fields) {
            if (error) {
                console.log('Error message: ', error);
                throw error;
            };
          //  console.log(Gender)
            console.log(result)
           // userId = userID
            response.send(result);
            //send all details
        })
    });

    app.route('/sendRequest', cors(corsOptions))
    .post(function (request, response) {
       // var ADDRESS = request.body.location;
       //var AGE = request.body.username;
       var RECEIVERID = request.body.receiverId;
       var CURRENTUSER = request.body.currentUser
       // var USERCREATED = request.params.USERCREATED;
        db.query('INSERT INTO Team2.Request (requesterId, receiverId, status) VALUES (?,?,"Pending");', [CURRENTUSER, RECEIVERID], function (error, result, fields) {
            if (error) {
                console.log('Error message: ', error);
                throw error;
            };
          //  console.log(Gender)
            console.log(result)
            response.send(result);
            //send all details
        })
    })



    // Basic things to include
    app.set('port', process.env.PORT || 3000);
    app.listen(app.get('port'), function () {
    console.log("listening to Port", app.get("port"));
    });