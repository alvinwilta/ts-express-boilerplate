import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  retryWrites: false,
};

//* MONGODB
//* Configuration for mongodb
//* Setting environment for staging server, local server, and test server
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_CLUSTER = process.env.MONGO_CLUSTER;
const MONGO_DB = process.env.MONGO_DB;

const MONGO_LOCAL_HOSTNAME = process.env.MONGO_LOCAL_HOSTNAME;
const MONGO_LOCAL_PORT = process.env.MONGO_LOCAL_PORT;
const MONGO_LOCAL_DB = process.env.MONGO_LOCAL_DB;

const MONGO_TEST_HOSTNAME = process.env.MONGO_TEST_HOSTNAME;
const MONGO_TEST_PORT = process.env.MONGO_TEST_PORT;
const MONGO_TEST_DB = process.env.MONGO_TEST_DB;

const MONGO = {
  username: MONGO_USERNAME,
  options: MONGO_OPTIONS,
  url_server: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority`,
  url_local: `mongodb://${MONGO_LOCAL_HOSTNAME}:${MONGO_LOCAL_PORT}/${MONGO_LOCAL_DB}`,
  url_test: `mongodb://${MONGO_TEST_HOSTNAME}:${MONGO_TEST_PORT}/${MONGO_TEST_DB}`,
};

//* SERVER
//* Configuration for the main server
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
const SERVER_PORT = process.env.PORT || process.env.SERVER_PORT;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

//* EMAIL
//* Configuration for nodemailer
const SERVICE = process.env.SERVICE;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const MAILER = {
  service: SERVICE,
  email: EMAIL,
  password: PASSWORD,
};

const config = {
  mongo: MONGO,
  server: SERVER,
  mailer: MAILER,
};

export default config;
