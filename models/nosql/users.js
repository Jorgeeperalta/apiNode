const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {type: String},
    age: { type: Number },
    email: { type: String, unique: true },
    password: { type: String},
    role: { type: ["admin", "user"], unique: true, default: "user"}
  },
  {
      timestamps : true,  // todo fecha de creacion y actulizacion
      versionKey :false, //
  }
);

module.exports = mongoose.model("users", UserSchema);
