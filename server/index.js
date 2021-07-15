const express = require('express');
const expressGraphQl=require('express-graphql');
const port = 4800;
const app = express();
const schema_old =require('./schema/schema_old');
const schema =require('./schema/schema');



app.use('/graphql',expressGraphQl({
    schema,
  graphiql:true  
 }) )



app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})