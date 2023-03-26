// Use the `aggregate()` method to perform an aggregation operation on the `persons` collection.
db.persons.aggregate([
  // The `$geoNear` stage performs a geospatial search for documents that are near a given point.
  {
    $geoNear: {
      // The `near` option specifies the point to search near, which is given as a longitude and latitude in an array.
      near: { type: "Point", coordinates: [-18.4, -42.8] },
      // The `maxDistance` option specifies the maximum distance in meters from the `near` point to search for documents.
      maxDistance: 10000, // 10000 meters (10km)
      // The `num` option limits the number of documents returned.
      num: 10, // limit to 10
      // The `query` option filters the documents that are considered for the geospatial search.
      query: {
        // In this case, the filter specifies that only documents where `gender` is "male" and `age` is greater than 30 should be considered.
        gender: { age: { $gt: 30 } },
      },
      // The `distanceField` option specifies the name of the field that will be added to the resulting documents to indicate the distance between the document and the `near` point.
      distanceField: "distance", // distance calculated field name
    },
  },
]);
