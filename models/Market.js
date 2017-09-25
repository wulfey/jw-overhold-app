const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const { Schema } = mongoose;
// destructuring

const MarketSchema = new Schema({
  name: String,
  lastArray: [Number],
  pumps: Number
  
});

// mongo can't handle more than 4mb in record
// so a survey can only ever have 200,000   20kb  recipients

// 2 arguments means create a model using the Schema arg
mongoose.model("markets", MarketSchema);
