// Use the `aggregate()` method to perform an aggregation operation on the `persons` collection.
db.persons.aggregate([
  // The `$match` stage filters the documents in the collection to include only those where the `gender` field is "male".
  { $match: { gender: "male" } },
  // The `$project` stage creates a new projection of the documents in the collection.
  {
    // The projection includes only the `name` and `birthdate` fields, where the `name` field is created by concatenating the `first` and `last` fields using the `$concat` operator, and the `birthdate` field is converted to a date object using the `$toDate` operator.
    $project: {
      _id: 0,
      name: { $concat: ["$name.first", " ", "$name.last"] },
      birthdate: { $toDate: "$dob.date" },
    },
  },
  // The `$sort` stage sorts the resulting documents by the `birthdate` field in ascending order.
  { $sort: { birthdate: 1 } },
  // The `$skip` stage skips the first 10 documents in the resulting set.
  { $skip: 10 },
  // The `$limit` stage limits the resulting set to 10 documents.
  { $limit: 10 },
]);
