const session = await mongoose.startSession();
session.startTransaction();

try {
  const options = { session };

  // Find the documents to update
  const doc1 = await Model1.findOne({ _id: "doc1Id" }, null, options);
  const doc2 = await Model2.findOne({ _id: "doc2Id" }, null, options);

  // Update the documents
  await Model1.updateOne({ _id: "doc1Id" }, { $inc: { count: 1 } }, options);
  await Model2.updateOne({ _id: "doc2Id" }, { $inc: { count: 1 } }, options);

  // Commit the transaction
  await session.commitTransaction();
  session.endSession();

  console.log("Documents updated successfully");
} catch (error) {
  // If an error occurs, abort the transaction and rollback the changes
  await session.abortTransaction();
  session.endSession();

  console.error("Error updating documents: ", error);
}
