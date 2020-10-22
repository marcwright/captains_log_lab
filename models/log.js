const mongoose = require('mongoose');

const logSchema = mongoose.Schema(
  {
    title: String,
    entry: String,
    shipIsBroken: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Log = moongoose.model('Log', logSchema);
module.exports = Log;
