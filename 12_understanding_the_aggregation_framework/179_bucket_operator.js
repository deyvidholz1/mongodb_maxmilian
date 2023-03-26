// Use the `aggregate()` method to perform an aggregation operation on the `persons` collection.
db.persons.aggregate([
  // The `$bucket` stage creates buckets of documents based on the specified field and bucket boundaries.
  {
    $bucket: {
      // The `groupBy` option specifies the field to group by, which is `dob.age` in this case.
      groupBy: "$dob.age",
      // The `boundaries` option specifies the bucket boundaries, which are the ages 18, 30, 40, 50, and 60 in this case.
      boundaries: [18, 30, 40, 50, 60],
      // The `output` option specifies the output for each bucket.
      output: {
        // The `numPersons` field specifies the number of documents in each bucket, which is calculated using the `$sum` operator.
        numPersons: { $sum: 1 },
        // The `avgAge` field specifies the average age of documents in each bucket, which is calculated using the `$avg` operator.
        avgAge: { $avg: "$dob.age" },
        // The `names` field is commented out, but it would use the `$push` operator to create an array of first names for each bucket.
        // names: { $push: "$name.first" },
      },
    },
  },
]);

// Use the `aggregate()` method to perform an aggregation operation on the `persons` collection.
db.persons.aggregate([
  // The `$bucketAuto` stage creates buckets of documents based on the specified field and the desired number of buckets.
  {
    $bucketAuto: {
      // The `groupBy` option specifies the field to group by, which is `dob.age` in this case.
      groupBy: "$dob.age",
      // The `buckets` option specifies the desired number of buckets, which is 5 in this case.
      buckets: 5,
      // The `output` option specifies the output for each bucket.
      output: {
        // The `numPersons` field specifies the number of documents in each bucket, which is calculated using the `$sum` operator.
        numPersons: { $sum: 1 },
        // The `avgAge` field specifies the average age of documents in each bucket, which is calculated using the `$avg` operator.
        avgAge: { $avg: "$dob.age" },
      },
    },
  },
]);
