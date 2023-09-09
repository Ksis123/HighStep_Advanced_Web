var expressFunction = require("express");
const shoe = expressFunction.Router();
const auth = require("../config/authorize");
const mongoose = require("mongoose");
var Schema = require("mongoose").Schema;

const shoeSchema = Schema(
    {
        id: String,
        name: String,
        price: Number,
        type: String,
        size: String,
        category: String,
        quantity: Number,
        detail: String,
        img: String,
    },
    {
      collection: "shoes",
    }
  );
  
  let Shoe;
  try {
    Shoe = mongoose.model("shoes");
  } catch (error) {
    Shoe = mongoose.model("shoes", shoeSchema);
  }

const updateQuantityShoe = async (id, d) => {
  const doc = await Shoe.updateMany({ _id: id }, { $inc: { quantity: d } });
  console.log(doc);
  return doc;
};

shoe.route("/updateshoe/:id").put(auth, async (req, res) => {
  const id = req.params.id;
  const d = req.body.quantity;
  console.log(d, id);
  const data = await updateQuantityShoe(id, d);
  console.log(data);
  res.status(200).json(data);
});

const findShoe = () => {
  return new Promise((resolve, reject) => {
    Shoe.find({}, (err, data) => {
      if (err) {
        reject(new Error("Cannot findAll Shoe!!!"));
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Cannot findAll Shoe!!!"));
        }
      }
    });
  });
};

const removeShoe = (id) => {
  return new Promise((resolve, reject) => {
    Shoe.findOneAndRemove({ _id: id }, function (err) {
      if (err) {
        reject(new Error("Cannot remove Shoe"));
      } else {
        resolve("Remove Shoe Successfully..");
      }
    });
  });
};
shoe.route("/shoe").get(auth, async (req, res) => {
  const data = await findShoe();
  res.status(200).json(data);
});

shoe.route("/deleteshoe/:id").delete(auth, async (req, res) => {
  const mid = await req.params.id;
  removeShoe(mid)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = shoe;