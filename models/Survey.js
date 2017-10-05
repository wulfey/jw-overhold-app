const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;
// destructuring
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});

// mongo can't handle more than 4mb in record
// so a survey can only ever have 200,000   20kb  recipients

// 2 arguments means create a model using the Schema arg
mongoose.model('surveys', surveySchema);
