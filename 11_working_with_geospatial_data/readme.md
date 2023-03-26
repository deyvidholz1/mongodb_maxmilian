`L1` Example of Geospatial data:

### Steps:

- 1. Add data to collection
- 2. Create index of geospatial type (e.g. `2dsphere`)
- 3. Query data

`1.` Add data to collection

```
db.places.insertOne({
    "name": "Parque Taene",
    "location": { "type": "Point", "coordinates": [-47.4079938, -22.7434305] },
});
```

- "location" could be any name, it's up to the developer.
- It should be an embbeded document with "type" and "coordinates" properties.
- Coordinates should be an array with two values, first is longitude, second is latitude

More details: https://www.mongodb.com/docs/drivers/go/current/fundamentals/geo/

`2.` Create index of type `2dsphere`
`db.places.createIndex({location: "2dsphere"});`

`3.` Query data near provided longitude and latitude

```
db.places.find({
    location: {
        $near: {
            $geometry: {
                type: "Point",
                coordinates: [-47.407083, -22.743556]
            }
        }
    }
});
```

`3.1` Adding $minDistance and $maxDistance

```
db.places.find({
    location: {
        $near: {
            $geometry: {
                type: "Point",
                coordinates: [-47.407083, -22.743556],
            },
            $maxDistance: 100, // maximum of 30 meters distant
            $minDistance: 10, // should be 10 meters away
        }
    }
});
```

##### Getting places inside an area

```
db.places.find({
    location: {
        $geoWithin: {
            $geometry: {
                type: "Polygon",
                coordinates: [[p1, p2, p3, p4, p1]], // need p1 at the end to "complete" the polygon. These Ps are variables
            },
        }
    }
});
```

##### Find out if point is inside an area

```
// 1. Seed collection
db.areas.insertOne({
    "name": "Golden Gate Park",
    "area": { // the field name is up to the develper, but the embbeded document should follow the structure below
        "type": "Polygon",
        "coordinates": [[p1, p2, p3, p4]]
    }
});
```

```
// Create index for "area" field
db.areas.createIndex({ "area": "2dsphere" });
```

```
// Find out if a point is inside a specific area
db.areas.find({
    $geoIntersects: {
        $geometry: { "type": "Point", "coordinates": [long, lat] }
    }
});
```

##### Find places within certain radius

```
db.places.find({
    location: {
        $geoWithin: {
            $centerSphere: [[long, lat], 1 / 6378.1] // [coordinates, radius]
            // Radius must be calculated by hand. 1 / 6378.1 = 1km in radius
        }
    }
});
```
