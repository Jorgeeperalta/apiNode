const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete")



const UserSchema = new mongoose.Schema(
  {
    name: {type: String},
    age: { type: Number },
    email: { type: String, unique: false },
    password: { type: String},
    role: { type: ["user","admin"], default: "user"}
  },
  { //
      timestamps : true,  // todo fecha de creacion y actulizacion
      versionKey :false, //
  }
);
UserSchema.plugin(mongooseDelete,{override: 'all'});
module.exports = mongoose.model("users", UserSchema);
