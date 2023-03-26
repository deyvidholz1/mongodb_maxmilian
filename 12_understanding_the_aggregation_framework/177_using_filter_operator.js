// Use the `aggregate()` method to perform an aggregation operation on the `friends` collection.
db.friends.aggregate([
  // The first pipeline stage is the `$project` stage, which creates a new projection of the documents in the collection.
  {
    // The projection includes the `scores` field, which is created using the `$filter` operator to return only the elements in the `examScore` array field that have a score greater than 60.
    $project: {
      _id: 0,
      scores: {
        $filter: {
          input: "$examScore",
          as: "sc",
          cond: {
            $gt: ["$$sc.score", 60],
          },
        },
      },
    },
  },
]);

// In the case of the query provided, the as option is set to "sc", which means that each element in the input array (i.e., the examScore field in each document) will be represented by the variable "sc" within the $filter stage.

// Regarding the use of double dollar signs ("$$sc.score"), this is because the sc variable defined in the as option is a variable that is local to the $filter stage. In order to reference this variable within the $gt operator, we need to use the double dollar sign syntax ("$$sc") to indicate that we are referencing a variable defined within the $filter stage.
