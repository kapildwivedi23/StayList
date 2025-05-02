const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://kapildwivedi23:Mongodb@cluster0.99hlf.mongodb.net/dbstaylist?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "67df13ec77c7eb1465b6903e",
  }))
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();