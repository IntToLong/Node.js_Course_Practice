import 'dotenv/config';

const constants = {
  PORT: process.env.PORT || 3000,
  URIDB: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.m08n2ne.mongodb.net/?retryWrites=true&w=majority`,
};

export default constants;
