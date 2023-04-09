const express = require("express");
const oracledb = require('oracledb');
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');   //to keep user logind after refresh as express is statless

require('dotenv').config();

const app = express();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken')  //instance of pacakge...every single api request has the webtoken 


app.use(express.json())
app.use(express.static('build'))


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({

    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,   //24 hours 
    },
})
);

var connectionProperties = {
    user: 'airportdb',
    password: 'durga23' ,
    connectString: "localhost/xe"
 };


app.get('/test',(req,res)=>{
    async function getAirlines(){
        try{
            const db = await oracledb.getConnection({               
 
                user: 'airportdb',
                password: 'durga23',
                connectString: 'localhost/xe',
            
            });
            
            const result = await db.execute('SELECT * FROM airportdb.AIRLINES');
            console.log(result.rows);
            return result;
        }
        catch(error)
        {
           return error;
        }

    }
    getAirlines().then(dbRes => {
        console.log(dbRes);
        res.send(dbRes);
    })
    .catch(err=>{
    
        res.send(err);
    }
    )

}
)

app.post("/api/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;   //receiving value from back
	console.log("POST USER:");

    bcrypt.hash(password, saltRounds, (err, hash) => {

        if (err) {
            console.log(err);
        }
			oracledb.getConnection(connectionProperties, function (err, connection) {
			if (err) 
            {
					console.error(err.message);
					response.status(500).send("Error connecting to DB");
					return;
            }
        connection.execute(
            "INSERT INTO airportdb.login_system_users (username, password) VALUES (:username,:password)",
            [username, hash],{autoCommit: true},
            (err, result) => {
                if (!err) {
                    res.send("SignUp successful");
                }
                else if (err) {
                    res.send("Username already taken");
                    console.log(err)
                    
                }
            }
        );
    });
});
});



app.get("/api/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
    }
    else {
        res.send({ loggedIn: false })
    }
})



app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;   //receiving value from back


    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) 
        {
                console.error(err.message);
                response.status(500).send("Error connecting to DB");
                return;
        }
    connection.execute(
        "SELECT * FROM airportdb.login_system_users WHERE username = :searchValue",[username],
        (err, result) => {
            if (err) {
                res.send({ err: err });
                console.log("error");
            }
            console.log(result);
            if (result) {
                bcrypt.compare(password, result.rows[0][2], (error, response) => {  
                    if (response) {
                        const id = result.rows[0][1]
                        const token = jwt.sign({ id }, process.env.SECRET, {
                            expiresIn: 300,
                        })
                        console.log(result.rows[0][1]);
                        req.session.user = result.rows[0][1];

                        // const isAdmin = 0;

                        res.json({ auth: true, token: token, result: result, message: "Login Successful" });   //user is autheraized therefore creaying token
                    }
                    else {
                        res.json({ auth: false, message: "wrong username/password combination" });
                    }
                })
                console.log("found");
            }
            else {
                res.json({ auth: false, message: "no user exists" });
            }
        }
    );
});
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if (!token) {
        res.send("No token");
    }
    else {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "Failed to auth" })
            }
            else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

app.get('/api/isUserAuth', verifyJWT, (req, res) => {    //verifyJWT is a middleware which checks if the user is authenticated or not ...we will apply this middle ware to every request

    res.send("User Authenticated");
    console.log(req.body.username);

})


app.get('/api/exploreinfo',(req,res)=>{
    async function getFlights(){
        try{
            const db = await oracledb.getConnection({               
 
                user: 'airportdb',
                password: 'durga23',
                connectString: 'localhost/xe',
            
            });
            
            const result = await db.execute("select flight.flight_id,to_char(cast(flight.arrival_datetime as date),'DD-MM-YYYY') as arrival_date,to_char(cast(flight.departure_datetime as date),'DD-MM-YYYY') as departure_date,extract (hour from flight.arrival_datetime) as arrival_hour,extract (minute from flight.arrival_datetime) as arrival_minute,extract (hour from flight.departure_datetime) as departure_hour,extract (minute from flight.departure_datetime) as departure_minute,flight.seat_available,airlines.airlines_name,route.departure_airport_cd,route.destination_airport_cd,a.airport_city departure_city,b.airport_city destination_city,a.airport_country_cd departure_airport_country,b.airport_country_cd destination_airport_country,flight.base_price from flight, route, airlines, airport a, airport b where flight.route_id = route.route_id and flight.airlines_cd = airlines.airlines_cd and route.departure_airport_cd = a.airport_cd and route.destination_airport_cd = b.airport_cd",{});
            console.log(result.rows);
            return result;
        }
        catch(error)
        {
           return error;
        }

    }
    getFlights().then(dbRes => {
        res.send(dbRes);
    })
    .catch(err=>{
    
        res.send(err);
    }
    )

}
)



PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});