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


app.get('/', (req, res) => {
  res.send('Hello World!');


});
app.post('/login', loginHandler);

app.get('/userslist',usersListHandler);

app.get('/users/:uid',userHandler);
app.listen(3030, () => {
  console.log('API listening on port 3030!');
});
