import express from "express";
import Mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import methodOverride from "method-override";
// import { config } from "dotenv";
import "dotenv/config";
import morgan from "morgan";
import exphbs from "express-handlebars";
import passport from "passport";
import passportConfig from "./config/passport.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import helmet from "helmet";
import connectDB from "./config/db.js";

import * as hbsHelpers from "./helpers/hbs.js";

import indexRoutes from "./routes/index.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";

//Load config
// config({path : './config/config.env'})

//passport config
// require('./config/passport')(passport)
passportConfig(passport);

connectDB();

const app = express();

//Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Method overide
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

//Logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Register `hbs.engine` with the Express app.
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: hbsHelpers
  })
);
app.set("view engine", ".hbs");

//Session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
  })
);

//Disable x-powered-by header
app.disable("x-powered-by");

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Setting Global var
// app.use((req, res, next)=>{
//   console.log(typeof(req.user) != undefined);
//   if(typeof(req.user) != undefined) res.locals.user = req.user.toJSON();
//   next()
// })

//Static Folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, "public")));

//Routes
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/post", postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever is up at ${PORT} in ${process.env.NODE_ENV} mode`));
