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

ProductsSchema.statics.findOneData = function (id) {
  const joinData = this.aggregate([

   
    {
      $match: {_id: mongoose.Types.ObjectId(id)},
    },
    
    
    {
      $lookup: {
        from: "categories", //TODO Tracks --> storages
        localField: "categoriesId", //TODO Tracks.mediaId
        foreignField: "_id", //TODO Straoges._id
        as: "categoria", //TODO Alias!
      },
    },
    {
        $lookup: {
          from: "storages", // from collection name
          localField: "mediaId",
          foreignField: "_id",
          as: "image",
        },
      },

  ]);
  return joinData;
};
ProductsSchema.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
        $group: resources,
    },
    {
      $lookup: {
        from: "categories", //TODO Tracks --> storages
        localField: "categoriesId", //TODO Tracks.mediaId
        foreignField: "_id", //TODO Straoges._id
       
      },
    },
    {
        $lookup: {
          from: "storages", // from collection name
          localField: "mediaId",
          foreignField: "_id",
        
        },
      },

  ]);
  return joinData;
};

ProductsSchema.plugin(mongooseDelete, { override: "all" });
module.exports = mongoose.model("products", ProductsSchema);
