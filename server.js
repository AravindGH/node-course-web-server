//Express is a nodeJs server.
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

//no arguments needed
var app = express();

//we need to register the partials before the view engines
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

/************************************************************************ */
// Creating the logger and then Saving it to the file..
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.path}`;
    console.log(`${now} : ${req.method} ${req.path}`);
    //we are checking for the errors other it will throw you the error information. like deprecated
    fs.appendFile('server.log',log+ '\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
})

/*****************************IMPORTANT***************************************** */
//Maintainence, if you want to mention the user about the maintainence uncomment this block...
// app.use((req, res, next) => {
//     res.render('maintainence.hbs');
// });
/*****************************IMPORTANT***************************************** */

//creating static page
//add some middleware , we are using app.use() --> existing one.
//__dirname holds the directory location
app.use(express.static(__dirname + '/public'));

//if a method is repeating in the many of the views then we can go with the hbs.registerHealper()
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

//to make the lowercase into uppercase
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})


// Setting up the routeHandler
//we can register the httpHandler using this when user tries to access the page, need to send something back..
//http request
//Home page

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to my website',
    })

})

//Setting up the About page..
app.get('/about', (req, res) => {
    // res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

//bad --> send back json with an error message property
//handling the bad request..
app.get('/*', (req, res) => {
    res.send({
        BadRequest: 'Unable to handle'
    });
});


//But we need to make our app listening, so we have to add the listener.
//Binding the port to our application.
//this will take second argument which is optional
//app.listen(3000); also we can mention like this
app.listen(port, () => {
    console.log(`Server is up and running on the port:${port}`);
});
