express = require("express");
homeRoutes = require("./routes/index");
userRoutes = require("./routes/users");
notesRoutes = require("./routes/notes");
require('./config/passport');
path = require("path");
methodOverride = require("method-override");
session = require("express-session");
const {engine} = require("express-handlebars");
flash = require('connect-flash');
passport = require('passport');

app = express();

//Setings
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
  })
);
app.set("view engine", ".hbs");

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "mysecretapp",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req,res,next) =>{
res.locals.success_msg = req.flash('success_msg');
res.locals.error_msg = req.flash('error_msg');
res.locals.error = req.flash('error');
res.locals.user = req.user || null;
next();
})

//Routes
app.use(homeRoutes);
app.use(userRoutes);
app.use(notesRoutes);

//Static Files
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
