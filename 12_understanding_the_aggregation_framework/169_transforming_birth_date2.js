db.persons.aggregate([
  {
    $project: {
      birthdate: { $toDate: "$dob.date" },
      age: "$dob.age",
    },
  },
]);
