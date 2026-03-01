// import mongoose, { model, Mongoose, Schema } from "mongoose";

// mongoose.connect(
//   // "mongodb+srv://riazrahmanshaik05:bW1GFPossNW6QXGq@cluster0.gpozfx8.mongodb.net/brainly"

//   "mongodb+srv://riazrahmanshaik05:riaz_2905@cluster0.gpozfx8.mongodb.net/"
// );

// const UserSchema = new Schema({
//   username: { type: String, unique: true },
//   password: String,
// });

// export const UserModel = model("users", UserSchema);

// const ContentSchema = new Schema({
//   title: String,
//   link: String,
//   tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
//   userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
// });

// const LinkSchema = new Schema({
//   hash: String,

//   //userId refers the Users Table
//   userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
// });

// export const LinkModel = model("Links", LinkSchema);

// import mongoose, { model, Schema } from "mongoose";
// import dotenv from "dotenv";

// // This line is crucial! It loads your .env variables
// dotenv.config();

// const MONGO_URL = process.env.MONGO_URL;

// if (!MONGO_URL) {
//   console.error("❌ MONGO_URL is not defined in .env file");
// }

// // Connect using the variable from .env
// mongoose
//   .connect(MONGO_URL || "")
//   .then(() => console.log("✅ MongoDB Connected Successfully"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// const UserSchema = new Schema({
//   username: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
// });

// export const UserModel = model("users", UserSchema);

// const ContentSchema = new Schema({
//   title: String,
//   link: String,
//   type: { type: String, enum: ["youtube", "twitter"] },
//   tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
//   userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
// });

// export const ContentModel = model("Content", ContentSchema);

// const LinkSchema = new Schema({
//   hash: String,
//   userId: {
//     type: mongoose.Types.ObjectId,
//     ref: "users",
//     required: true,
//     unique: true,
//   },
// });

// export const LinkModel = model("Links", LinkSchema);

import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL || "")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export const UserModel = model("users", UserSchema);

const ContentSchema = new Schema({
  title: String,
  link: String,
  type: { type: String, enum: ["youtube", "twitter"] },
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
});

export const ContentModel = model("Content", ContentSchema);

const LinkSchema = new Schema({
  hash: { type: String, required: true },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
});

export const LinkModel = model("Links", LinkSchema);
