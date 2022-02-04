const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const PORT = 8001
const db = require("./models")
const session = require('express-session');
const passport = require('passport');
const config = require("./config/auth.config")

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

// app.get("/", (req, res) => {
// 	res.render('../form/login.ejs');
// })


var userProfile;

app.use(passport.initialize());
app.use(passport.session());


app.get('/success', (req, res) => {
	var jwt = require("jsonwebtoken")

	var token = jwt.sign({ id: userProfile.id,name: userProfile.displayName }, config.secret, {
			expiresIn: 86400 // 24 jam
	})
	
	localStorage.setItem('token', token);

	res.redirect('/input');

});
app.get('/error', (req, res) => {
	res.send("error logging in")
	res.redirect('/')
});


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8001/auth/google/callback"
  },

  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success');
  });



db.sequelize.sync()

require("./routes/data_handphone.route")(app)


const httpServer = app.listen(PORT, () => {
	console.log("connected port " + PORT)
})


const io = require("socket.io")(httpServer)

io.on("connection", socket => {
	socket.on("addData", data => {
		console.log(data)
		io.emit("listData", data)
	})
	socket.on("updateData", data => {
		console.log(data)
		io.emit("listData", data)
	})
	socket.on("deleteData", data => {
		console.log(data)
		io.emit("listDeleteData", data)
	})
})

