// Use the `aggregate()` method to perform an aggregation operation on the `persons` collection.
db.persons.aggregate([
  // The first pipeline stage is the `$project` stage, which creates a new projection of the documents in the collection.
  {
    // Inside the `$project` stage, two new fields are created: `birthdate` and `age`.
    $project: {
      // The `birthdate` field is created using the `$toDate` operator to convert the value of the `dob.date` field to a date type.
      birthdate: { $toDate: "$dob.date" },
      // The `age` field is simply copied from the `dob.age` field in the original document.
      age: "$dob.age",
    },
  },
  // The second pipeline stage is the `$group` stage, which groups the documents by a specified field.
  {
    // The `_id` field specifies the field to group by, which is the `birthYear` field created using the `$isoWeekYear` operator on the `birthdate` field.
    $group: {
      _id: { birthYear: { $isoWeekYear: "$birthdate" } },
      // The `numPersons` field specifies the aggregation operation to perform on the grouped documents, which is to count the number of documents in each group.
      numPersons: { $sum: 1 },
    },
  },
  { $sort: { numPersons: -1 } },
]);
