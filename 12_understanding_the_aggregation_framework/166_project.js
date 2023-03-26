db.persons.aggregate([
  {
    $project: {
      _id: 0, // Excludes the '_id' field from the output.
      gender: 1, // Includes the 'gender' field in the output.
      fullName: {
        // $concat: ["$name.first", " ", "$name.last"], // works ok
        // $concat: [{ $toUpper: "$name.first" }, " ", { $toUpper: "$name.last" }], // change all names to uppercase
        $concat: [
          // Concatenates several fields to create the 'fullName' field.
          { $toUpper: { $substrCP: ["$name.first", 0, 1] } }, // Converts the first character of the 'name.first' field to uppercase.
          {
            $substrCP: [
              // Extracts a substring of the 'name.first' field starting from the second character.
              "$name.first",
              1,
              { $subtract: [{ $strLenCP: "$name.first" }, 1] },
            ],
          },
          " ", // Adds a space between the first and last names.
          { $toUpper: { $substrCP: ["$name.last", 0, 1] } }, // Converts the first character of the 'name.last' field to uppercase.
          {
            $substrCP: [
              // Extracts a substring of the 'name.last' field starting from the second character.
              "$name.last",
              1,
              { $subtract: [{ $strLenCP: "$name.last" }, 1] },
            ],
          },
        ],
      },
    },
  },
]);
