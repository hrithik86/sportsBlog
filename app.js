const express=require("express");
const app=express();
const path=require("path");
const session=require("express-session");
const bodyParser=require("body-parser");
const expressValidator=require("express-validator");

const port=3000;

//view setup
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set static folder
app.use(express.static(path.join(__dirname,"public")));


//express messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express validator
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        const namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));
  
  app.get('/', (req, res, next) => {
    res.send('Hello');
  });
  
  app.listen(port, () => {
    console.log('Server started on port '+port);
  });
  