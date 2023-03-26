// Use the `aggregate()` method to perform an aggregation operation on the `friends` collection.
db.friends.aggregate([
  // The first pipeline stage is the `$unwind` stage, which deconstructs an array field from the input documents to output a document for each element of the array.
  { $unwind: "$hobbies" },
  // The second pipeline stage is the `$group` stage, which groups the documents by a specified field.
  {
    // The `_id` field specifies the field to group by, which is the `age` field in this case.
    $group: {
      _id: "$age",
      // The `allHobbies` field specifies the aggregation operation to perform on the grouped documents, which is to push the values of the `hobbies` field into an array.
      allHobbies: {
        $push: "$hobbies",
      },
    },
  },
]);
