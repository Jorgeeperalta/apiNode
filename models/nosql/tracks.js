const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete")
const TracksSchema = new mongoose.Schema({
  name: { type: String },
  album: { type: String },
  cover: {
    type: String,
    validate: {
      validator: (req) => {
        return true;
      },
      message: "ERROR_URL",
    },
  },
  artist: {
    name: { type: String },
    nickname: { type: String },
    nationality: { type: String },
  },

  duration: {
    start: { type: Number },
    end: { type: Number },
  },

  mediaId: { type: String },

  
});
TracksSchema.statics.findAllData = function () {
  const joinData = this.aggregate([
    //TODO Tracks
    {
      $lookup: {
        from: "storages", //TODO Tracks --> storages
        localField: "mediaId", //TODO Tracks.mediaId
        foreignField: "_id", //TODO Straoges._id
        as: "audio", //TODO Alias!
      },
    },
    {
      $unwind: "$audio",
    }
  ]);
  return joinData;
};
TracksSchema.plugin(mongooseDelete,{override: 'all'});
module.exports = mongoose.model("tracks", TracksSchema);
