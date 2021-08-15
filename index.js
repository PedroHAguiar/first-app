const express = require("express");
const app = express();
const routes = require("./routes");
const expressLayouts = require("express-ejs-layouts");
const { urlencoded } = require("express");

const port=3030;
const address = "localhost";

global.users =[
    {name:"Wellington W. F. Sarmento", email:"wwagner@virtual.ufc.br", address:"Rua Dom Jeronimo, 666", age:46, height:1.70, vote:true},
    {name:"PAtricia S. Paula", address:"Rua Dom Jeronimo, 666", email:"patricia@virtual.ufc.br", age:46, height:1.70,vote:true},
    {name:"Henrique Sérgio L. Pequeno",address:"Rua do Henrique, 666",email:"henrique@virtual.ufc.br",age:46,height:1.70,vote:true}];
  
app.set('view engine','ejs');
app.use(expressLayouts); 
 
app.use(express.urlencoded({extended:false}));
app.use(express.json()); 

app.use('/',routes);  

const server = app.listen(port,address,()=>{
    let host = server.address().address;
    let port = server.address().port;
    console.log(`Servidor executando no endereço ${host} e porta ${port}`);
});