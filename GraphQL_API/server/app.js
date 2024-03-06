const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Evebaker:1229@cluster0.thj2qkm.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

const app = express();


app.use('/graphql', graphqlHTTP({
  schema, 
  graphiql: true, 
}));

app.listen(4000, () => {
  console.log('Now listening for requests on port 4000');
});