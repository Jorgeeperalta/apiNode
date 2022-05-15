const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const ProductsSchema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: Number },
    amount: { type: Number },
    stock: { type: Number },
    categoriaId: {type:mongoose.Schema.Types.ObjectId,ref : 'categories', required: true},
    mediaId: { type: String },
  },
  {
    //
    timestamps: true, // todo fecha de creacion y actulizacion
    versionKey: false, //
  }
);
// ProductsSchema.statics.findAllData = function () {
//   const joinData = this.aggregate([
//     {
//         $group: resources,
//     },
//     {
//       $lookup: {
//         from: "categories", //TODO Tracks --> storages
//         localField: "categoriesId", //TODO Tracks.mediaId
//         foreignField: "_id", //TODO Straoges._id
//         as: "categirie", //TODO Alias!
//       },
//     },
//     {
//         $lookup: {
//           from: "storages", // from collection name
//           localField: "mediaId",
//           foreignField: "_id",
//           as: "image",
//         },
//       },

//   ]);
//   return joinData;
// };
// const joinData = this.aggregate(
//   [
//     {
//       $group: resources,
//     },
//     {
//       $lookup: {
//         from: "Comments", // collection to join
//         localField: "_id", //field from the input documents
//         foreignField: "user_id", //field from the documents of the "from" collection
//         as: "comments", // output array field
//       },
//     },
//     {
//       $lookup: {
//         from: "Post", // from collection name
//         localField: "_id",
//         foreignField: "user_id",
//         as: "posts",
//       },
//     },
//   ],
//   function (error, data) {
//     return res.json(data);
//     //handle error case also
//   }
// );
ProductsSchema.plugin(mongooseDelete, { override: "all" });
module.exports = mongoose.model("products", ProductsSchema);
