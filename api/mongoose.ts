import mongoose from "mongoose";
import env from "./config/environment";

const { MONGODB_URI } = env;

mongoose.Promise = global.Promise;

mongoose.connect(MONGODB_URI!, {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: false,
  keepAlive: true,
  connectTimeoutMS: 30000,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

export default mongoose;
