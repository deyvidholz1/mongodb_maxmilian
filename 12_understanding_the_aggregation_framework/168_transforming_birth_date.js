// Use the `aggregate()` method to perform an aggregation operation on the `persons` collection.
db.persons.aggregate([
  // The first pipeline stage is the `$project` stage, which creates a new projection of the documents in the collection.
  {
    // Inside the `$project` stage, two new fields are created: `birthdate` and `age`.
    $project: {
      // The `birthdate` field is created using the `$convert` operator to convert the value of the `dob.date` field to a date type.
      birthdate: { $convert: { input: "$dob.date", to: "date" } },
      // The `age` field is simply copied from the `dob.age` field in the original document.
      age: "$dob.age",
    },
  },
]);
