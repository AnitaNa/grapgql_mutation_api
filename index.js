require("dotenv").config(); 
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Database connection
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
.then(() => {
    console.log('mangoDB connection successful')
    return server.listen({port: 4000})
})
.then((res) => {
    console.log(`server is running at ${res.url}`)
})
.catch((err) => console.log(err));

 