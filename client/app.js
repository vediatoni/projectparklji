//Example usage in the command prompt
//node Server.js
// Parameters
const port = 3000; //Specify a port for our web server
const express = require('express'); //load express with the use of requireJs
const path = require('path');
const app = express(); //Create an instance of the express library

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, './Client', 'index.html'));   
})

app.get('/index.html',(req,res)=>{
    res.redirect('/')
})

app.get('/copperlichtdata/loading.gif',(req,res)=>{
    res.sendFile(path.join(__dirname,'./Client/src/copperlichtdata/loading.gif'))
});

app.get('/engine.js',(req,res)=>{
    res.sendFile(path.join(__dirname,'/Client/engine.js'));
})


app.use(express.static(path.join(__dirname,'./Client/src/copperlichtdata')))

app.use(express.static(path.join(__dirname,'./Client/dist/')))


app.all('*',(req,res)=>{
    res.status(404).send({msg:"Request not found"})
})


app.listen(port, function() { //Listener for specified port
    console.log("Server running at: http://localhost:" + port)
});