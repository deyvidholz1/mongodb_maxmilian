const mongoose = require("mongoose");

const MySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    // other fields...
  },
  { timestamps: true }
);

const MyModel = mongoose.model("MyModel", MySchema);

const doc = new MyModel({
  name: "Document 1",
  description: "This is a test document",
});
console.log(doc); // { _id: 60f09d85d4387d16943db07c, name: 'Document 1', description: 'This is a test document', createdAt: 2021-07-15T17:42:13.487Z, updatedAt: 2021-07-15T17:42:13.487Z }
