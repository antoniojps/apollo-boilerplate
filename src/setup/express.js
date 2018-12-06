import express from 'express'
import { typeDefs, resolvers } from './../graphql'
import { ApolloServer } from 'apollo-server-express'

function setupGraphQL () {
  return new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
      settings: {
        'editor.theme': 'light',
        'request.credentials': 'include',
      },
      tabs: [
        {
          endpoint: '/graphql',
          query: '{ hello { hello } }',
        },
      ],
    },
  })
}

async function setupExpress () {
  const app = express()
  const server = await setupGraphQL()
  server.applyMiddleware({ app })

  app.listen({ port: process.env.PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
  )
}

export default setupExpress
