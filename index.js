const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const {typeDefs, resolvers, mocks } = require('./schema')
require('./db/setup')

// inicializar express
const app = express()



const apollo = new ApolloServer({
    typeDefs,   
    resolvers
})


apollo.applyMiddleware({ app })

app.listen({
    port: 5678
}, () =>
console.log(`🚀 Server ready at http://localhost:5678${apollo.graphqlPath}`)
)
