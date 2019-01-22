
const express = require("express");
const cors = require("cors");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require('path')
var fs = require('fs');
var expressValidator = require('express-validator');
var upload = require('express-fileupload');
var session = require('express-session');




var app = express();

app.use(cookieParser());
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.json());





//Connection to DB
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myshop'

});

con.connect((err)=>{
  if(err){
    console.log("Connection to DB fail");
    throw err;

  }else{
    console.log("Connected successfully to DB");
  }


});


app.use(expressValidator());

//I dont know if it will be necessary
app.use(express.static('src'));


app.use(session({secret:'chaim', saveUninitialized:true, resave:true,
                  cookie: {
                            expires: new Date(Date.now() + 1000000),
                            maxAge: 5000000}
                }
));



//Root
app.get('/', (req, res)=>{
  res.render('/index.html');

});



//USERS QUERIES
//Login Control
//ATTENTION, IT IS CASE SENSITIVE
app.route('/login').post((req,res)=>{
  //Admin-> Username: Chaim  Password:1234
  //Client -> Username:    Password:1234
  console.log("User is trying to login");
  console.log(req.body.username);
  console.log(req.body.password);
  console.log(req.body.date);
  //To do pass to MD5 before
  con.query(`SELECT * FROM users WHERE username='${req.body.username}' && password='${req.body.password}'`, (err,row)=>{
    if(err){
      console.log(err);
      console.log("Error in function select");
      res.status(400).send(err);
    }else{
      if(row.length==1){
        //Assign values to the object session
        //req.session.name = row[0].name;
        req.session.username = row[0].username;
        req.session.role = row[0].role;
        req.session.authenticated = true;
        req.session.date = req.body.date;
        console.log("User has been authentified");

        res.status(200).send(row[0]);
        //res.send(req.session.username);
      }else{
        console.log("User/password not valid");
        res.status(400).send('User/password not valid');
      }
    }
  })

})



//LOGOUT
app.route('/logout').post((req,res)=>{
    console.log(req.session.name);
    console.log('User has been logged out')

    req.session.destroy();
    res.end();
});




//Get all users
app.route('/users').get((req,res)=>{
  console.log("Client get all users")
  con.query(`SELECT * FROM users`, (err, data)=>{
    if(err){
      console.log(err);
      console.log("Error retriving all users");
      res.status(400).send(err);
    }else{
      res.send(data);
    }
  })
});


//Check if exist this user (by teudat zehut), if exist return in body=1, if not, returns body-0
app.route('/existuser').post((req,res)=>{
  console.log("Client wants to check if exist user with this teudat zehut");
  con.query(`SELECT * FROM users WHERE zehut=${req.body.zehut}`, (err,rows)=>{
    if(err){
      console.log(err);
      console.log("Checking zehut doenst worked properly");
    }else{
      if(rows.length ==1){
        console.log("Exist user with this zehut");
        res.send('1');
      }else{
        console.log("Doenst exist user with this zehut");
        res.send('0');
      }
    }

  })


})

//Insert new user
app.route('/user').post((req,res)=>{
  con.query(`INSERT INTO users (name, surname, username, password, role, email, zehut, street, city)
             VALUES
             ("${req.body.name}", "${req.body.surname}", "${req.body.username}", "${req.body.password}", "user",
             "${req.body.email}", "${req.body.zehut}", "${req.body.street}", "${req.body.city}")`, (err,body)=>{

                if(err){
                  console.log(err);
                  console.log("Error INSERTING new user into DB");
                  res.status(400).send(err);
                }else{
                  console.log("User added successfully");
                  console.log(req.body);
                  res.status(201).send(req.body);
                }


             })



});







//PRODUCTS/CATEGORIES QUERYS
//Getting all categories
app.route('/cat').get((req,res)=>{
  con.query(`SELECT categoryName FROM categories`, (err,data)=>{
    if(err){
      console.log(err);
      console.log("Error getting all categories");
      res.status(400).send(err);
    }else{
      console.log("Client asked for category name");
      console.log(data);
      res.status(200).send(data);
    }

  })


});

//Get all products
app.route('/products').get((req, res)=>{
  console.log("Client asked for all products");
  //con.query(`select * from products where category=`)
  con.query(`SELECT * FROM products`, (err, data)=>{
    if(err){
      console.log("Error getting all products");
      console.log(err);
      res.status(400).send(err);
    }else{
      console.log(data);
      console.log("All products retrieved successfully");
      res.send(data);
    }

  });


});




//Getting products of a category
app.route('/category').get((req, res)=>{
  //const reqCategory = req.params['catname'];
  const reqCategory = req.query.catname;
  console.log("Client asked for "+reqCategory+" Kippot.");

  //con.query(`select * from products where category=`)
  con.query(`SELECT * FROM products WHERE category IN (SELECT id FROM categories WHERE categoryName='${reqCategory}')`, (err, data)=>{
    if(err){
      console.log("Error getting products of category");
      console.log(err);
      res.status(400).send(err);
    }else{
      console.log(data);
      console.log("Products of this category retrieved successfully");
      res.send(data);
    }

  });


});


//Get product by ID
app.route('/product/:id').get((req, res)=>{
  console.log("Searching product by id");
  const prodIdRequested = req.params['id'];
  con.query(`SELECT * FROM products WHERE id='${prodIdRequested}'`, (err, data)=>{
    if(err){
      console.log(err);
      console.log("Error retriving info of this product id");
      res.status(400);
    }else{
      console.log("Retrieved data of this product ID successfully");
      res.status(400).send(data);
    }
  })

})


//Inserting a product to the database
app.route('/newproduct').post((req, res)=>{
  const bodyreq = req.body;
  console.log(bodyreq);
  con.query(`INSERT INTO products (name, price, category, description, image) values
            ('${req.body.name}', '${req.body.price}', '${req.body.category}','${req.body.description}','${req.body.image}')`,
            (err)=>{
    if(err){
      console.log(err);
      console.log("Inserting product into db failed");

      res.send(err);
    }else{
      console.log("Yes! Product added successfully");

      res.status(200).send();
    }
  })
  res.status(200).send(bodyreq);



});



//Updating an product
app.route('/product/:id').put((req,res)=>{
  const prodToUpdate = req.params['id'];
  //console.log(req.body);
  console.log("This is the product to update:");
  console.log(prodToUpdate);

  con.query(`UPDATE products SET name='${req.body.name}', price='${req.body.price}', description='${req.body.description}' WHERE id='${prodToUpdate}'`, (err)=>{
    if(err){
      console.log("Product hasnt been updated successfully");
      console.log(err);
      res.status(400);
    }else{
      console.log("Yes! product has been updated!");
      res.status(200).send();
    }
  })

  res.status(200).send(req.body);

});



//Deleting a product
app.route('cat/:id').delete((req,res)=>{
  const prodToDelete = req.params['id'];
  //The deleteproceess

  res.status(204);

});

app.route('*').get((req,res)=>{
  res.sendFile('/index.html', {
    root: './src/'
  });
})

app.listen(4040,()=>{
  console.log("Listening app.js in 4040");
})
