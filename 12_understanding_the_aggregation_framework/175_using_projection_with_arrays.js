// Use the `aggregate()` method to perform an aggregation operation on the `friends` collection.
db.friends.aggregate([
  // The first pipeline stage is the `$project` stage, which creates a new projection of the documents in the collection.
  {
    // The projection includes the `examScore` field, which is created using the `$slice` operator to extract the first element of the `examScores` array field.
    $project: {
      _id: 0,
      examScore: { $slice: ["$examScores", 1] },
    },
  },
]);

// $slice: ["$examScores",-2] = last two elements
// $slice: ["$examScores",2, 1] = starts at position 2, get only one
