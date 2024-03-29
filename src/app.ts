import express, { Application } from "express";
import mongoose from "mongoose";
const schema = require('../schema/schema');
const { graphqlHTTP } = require("express-graphql");
import cors from "cors";
require("dotenv/config");
const application: Application = express();
application.use(cors());
application.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.DB_connection || "",
  () => console.log(`App is listening on port ${PORT} !`)
);

application.listen(PORT);
