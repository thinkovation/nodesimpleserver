const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true 
  }));

  const bodyParser = require('body-parser');

app.use(bodyParser.json());

const loginHandler = (req, res) => {
 
  const { username, password } = req.body;
 


  const jwt = require('njwt')
  const claims = { iss: 'thinkovation', sub: 'test', uid:"gary" }
  const token = jwt.create(claims, 'top-secret-phrase')
  token.setExpiration(new Date().getTime() + 60*1000*60)
 

  const user = {
    firstname: 'Gary',
    lastname: 'Barnett',
    apikey: token.compact()
  };


  // validation logic
  const validUsername = "gary";
  const validPassword="bazil";
  if(username === validUsername && password === validPassword){

  res.json(user);

} else {
const err = {
    code: 401,
    message: "invalid credentials"
}
  res.status(err.code).json(err);

}


}

const userHandler = (req, res) => {
    

    const jwt = require('njwt')
    const token  = req.get("Authorization");

    try {
        var decoded = jwt.verify(token.substring(7), 'top-secret-phrase');
      } catch(err) {
        const errResult = {
            code: 401,
            message: "invalid credentials"
        }
          res.status(errResult.code).json(errResult);
      }
 
   
    

    const user = {
        uid: req.params.uid,
        firstname: 'Gary',
        lastname: 'Barnett',
        department: 'Tech'
      };
      res.json(user);


}

const usersListHandler = (req, res) => {
    

    const jwt = require('njwt')
    const token  = req.get("Authorization");

    try {
        var decoded = jwt.verify(token.substring(7), 'top-secret-phrase');
      } catch(err) {
        const errResult = {
            code: 401,
            message: "invalid credentials"
        }
          res.status(errResult.code).json(errResult);
      }
 
   
    

    const users = [{
        uid: 1,
        firstname: 'Gary',
        lastname: 'Barnett',
        department: 'Tech'
      },
      {
        uid: 2,
        firstname: 'Sally',
        lastname: 'Barnett',
        department: 'Design'
      },
      {
        uid: 3,
        firstname: 'Andy',
        lastname: 'Barnett',
        department: 'Ops'
      },
    ];
      res.json(users);


}
const usersDataHandler = (req, res) => {
    

    const jwt = require('njwt')
    let token  = req.get("Authorization");
    if (token != undefined){
        console.log("we have a token:" + token)
    }else{
      console.log("No token in header checking for a tkn query param (only for use in dev")
      if (req.query.tkn=="test"){
        token = req.query.tkn
      }
      if (token === undefined){
        console.log("Nada");
        const errResult = {
          code: 401,
          message: "invalid credentials"
      }
        res.status(errResult.code).json(errResult);
        return
      }
    }
    if (token != "test"){

    try {
        var decoded = jwt.verify(token.substring(7), 'top-secret-phrase');
      } catch(err) {
        const errResult = {
            code: 401,
            message: "invalid credentials"
        }
          res.status(errResult.code).json(errResult);
          return
      }
    }
 
// Sample data 
const falso = require('@ngneat/falso');

const data = [];

for (let i=0;i<1000;i++){
    data.push(
        {
            id: falso.randUuid(),
            firstName: falso.randFirstName(),
            lastName: falso.randLastName(),
            email: falso.randEmail(),
            department: falso.randDepartment(),
        }
    )
}
   
    

      res.json(data);


}


app.get('/', (req, res) => {
  res.send('Hello World!');


});
app.post('/login', loginHandler);

app.get('/userslist',usersListHandler);
app.get('/userdata', usersDataHandler)
app.get('/users/:uid',userHandler);
app.listen(3030, () => {
  console.log('API listening on port 3030!');
});
