// Use the `aggregate()` method to perform an aggregation operation on the `friends` collection.
db.friends.aggregate([
  // The first pipeline stage is the `$unwind` stage, which deconstructs an array field from the input documents to output a document for each element of the array.
  { $unwind: "$examScores" },
  // The second pipeline stage is the `$project` stage, which creates a new projection of the documents in the collection.
  {
    // The projection includes only the `_id`, `name`, `age`, and `score` fields, where the `score` field is extracted from the `examScores` subdocument.
    $project: { _id: 1, name: 1, age: 1, score: "$examScores.score" },
  },
  // The third pipeline stage is the `$sort` stage, which sorts the documents by a specified field.
  { $sort: { score: -1 } },
  // The fourth pipeline stage is the `$group` stage, which groups the documents by a specified field.
  {
    // The `_id` field specifies the field to group by, which is the `_id` field in this case.
    $group: {
      _id: "$_id",
      // The `name` field specifies the aggregation operation to perform on the grouped documents, which is to return the value of the `name` field in the first document in the group.
      name: { $first: "$name" },
      // The `maxScore` field specifies the aggregation operation to perform on the grouped documents, which is to return the maximum value of the `score` field in the group.
      maxScore: { $max: "$score" },
    },
  },
  // The fifth pipeline stage is the `$sort` stage, which sorts the documents by a specified field.
  { $sort: { maxScore: -1 } },
]);
