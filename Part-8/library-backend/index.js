const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { typeDefs } = require("./schema.js");
const { resolvers } = require("./resolvers.js");

mongoose.set("strictQuery", false);
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to MongoDB");
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error while connecting to MongoDB: ", error.message);
  });

//const server = new ApolloServer({
//  typeDefs,
//  resolvers,
//});

const loggedUser = async (req) => {
  const auth = req ? req.headers.authorization : null;
  if (auth && auth.startsWith("Bearer ")) {
    const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
    const currentUser = await User.findById(decodedToken.id);
    return currentUser;
  }
};

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const currentUser = await loggedUser(req);
        return { currentUser };
      },
    }),
  );
  const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`),
  );
};
start();

//startStandaloneServer(server, {
//  listen: { port: 4000 },
//  context: async ({ req, res }) => {
//    const currentUser = await loggedUser(req);
//    return { currentUser };
//  },
//}).then(({ url }) => {
//  console.log(`Server ready at ${url}`);
//});
