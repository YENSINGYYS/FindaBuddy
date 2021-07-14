const express = require('express');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser');
var methodOvereide = require('method-override');
var cors = require('cors');
var session = require('express-session');
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

//login authentication 
app.route('/authentication', cors(corsOptions))
    .post(function (request, response) {
        var EMAIL = request.body.email;
        var PASSWORD = request.body.password
        db.query('SELECT userID FROM Team2.UserAccount where email = ? and password = ?;', [EMAIL, PASSWORD], function (error, result, fields) {
            if (error) {
                console.log('Error message: ', error);
                throw error;
            };
            console.log(result)
            response.send(result);
            //send all details
        })
    });

    

//Get User Details
app.route('/getUser', cors(corsOptions))
    .post(function (request, response) {
        var ADDRESS = request.body.location;
        var CURRENTUSER = request.body.currentUser
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
  
       var RECEIVERID = request.body.receiverId;
       var CURRENTUSER = request.body.currentUser
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


    //get request notification

    app.route('/notification/:id', cors(corsOptions))
    .get(function (request, response) {
        var USERID = request.params.id
        db.query('select up.username, up.Gender, up.fitnessLevel, up.DOB, r.requesterId, r.receiverId, r.idRequest, up.image from Team2.Request r inner join Team2.UserProfile up where (r.requesterId = up.userID and r.receiverId=?) and status="Pending";', [USERID], function (error, result, fields) {
            if (error) {
                console.log('Error message: ', error);
                throw error;
            };
            console.log(result)
            response.send(result);
        })
    });

    //UPDATE REQUEST STATUS
    app.route('/update', cors(corsOptions))
    .post(function (request, response) {
        var REQUESTID = request.body.requestId
        var STATUS = request.body.status
        db.query('UPDATE Team2.Request SET status = ? where idRequest = ?;', [STATUS, REQUESTID], function (error, result, fields) {
            if (error) {
                console.log('Error message: ', error);
                throw error;
            };
            console.log(result)
            response.send(result);
        })

        var USERID1 = request.body.userid1
        var BUDDYID1 = request.body.buddyid1
        var USERID2 = request.body.userid2
        var BUDDYID2 = request.body.buddyid2
      
      
        db.query('INSERT INTO Team2.Buddy (buddyID, userID) VALUES (?,?), (?,?)', [USERID1, BUDDYID1, USERID2, BUDDYID2], function (error, result, fields) {
            if (error) {
                console.log('Error message: ', error);
                throw error;
            };
            console.log(result)
            response.send(result);
        })

    });

    //Jie Xiang's 
    
    //get newsfeeds
    app.route('/NewsFeeds', cors(corsOptions)).get(function (request, response) {    
        var idNewsFeeds = request.body.idNewsFeeds;
        var userID = request.body.userID;
        db.query('SELECT * FROM NewsFeeds WHERE userID = ? order by idNewsFeeds desc;',[idNewsFeeds,userID],
        function (error, result, fields) {
        if (error) {
        console.log('Error message: ', error);
        throw error;
        };
        
        console.log(result)
        response.send(result);
        //sent all item details
        })
        })

   
 


    // Basic things to include
    app.set('port', process.env.PORT || 3000);
    app.listen(app.get('port'), function () {
    console.log("listening to Port", app.get("port"));
    });