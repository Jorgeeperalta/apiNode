const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete")
const StorageSchema = new mongoose.Schema(
  {
    url: {type: String},
    filename: { type: String },
    
  },
  {
      timestamps : true,  // todo fecha de creacion y actulizacion
      versionKey :false, //
  }
);
StorageSchema.plugin(mongooseDelete,{override: 'all'});
module.exports = mongoose.model("storages", StorageSchema);