// Use the `aggregate()` method to perform an aggregation operation on the `friends` collection.
db.friends.aggregate([
  // The first pipeline stage is the `$project` stage, which creates a new projection of the documents in the collection.
  {
    // The projection includes the `numScores` field, which is created using the `$size` operator to return the size of the `examScores` array field.
    $project: {
      _id: 0,
      numScores: { $size: "$examScores" },
    },
  },
]);
