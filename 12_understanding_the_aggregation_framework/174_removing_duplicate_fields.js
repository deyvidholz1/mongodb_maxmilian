db.friends.aggregate([
  { $unwind: "$hobbies" },
  {
    $group: {
      _id: "$age",
      allHobbies: {
        $addToSet: "$hobbies", // similar to push, but removes the duplicates
      },
    },
  },
]);
