const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete")
const CategoriesSchema = new mongoose.Schema({
  name: { type: String },
 
  
});
// TracksSchema.statics.findAllData = function () {
//   const joinData = this.aggregate([
//     //TODO Tracks
//     {
//       $lookup: {
//         from: "storages", //TODO Tracks --> storages
//         localField: "mediaId", //TODO Tracks.mediaId
//         foreignField: "_id", //TODO Straoges._id
//         as: "audio", //TODO Alias!
//       },
//     },
//     {
//       $unwind: "$audio",
//     }
//   ]);
//   return joinData;
// };
CategoriesSchema.plugin(mongooseDelete,{override: 'all'});
module.exports = mongoose.model("categories", CategoriesSchema );
