const mongoose = require("mongoose");

const StorageSchema = new mongoose.Schema(
  {
    url: {type: String},
    filename: { type: Number },
    
  },
  {
      timestamps : true,  // todo fecha de creacion y actulizacion
      versionKey :false, //
  }
);

module.exports = mongoose.model("storages", StorageSchema);