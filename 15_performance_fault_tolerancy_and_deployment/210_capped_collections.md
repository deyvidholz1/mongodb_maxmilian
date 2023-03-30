MongoDB capped collections are fixed-size collections that have a maximum size limit and preserve the insertion order of documents. Once a capped collection reaches its maximum size, it starts overwriting the oldest documents with new ones, similar to a circular buffer.

Capped collections are useful for capturing a high volume of data that has a limited lifespan, such as logs or telemetry data. They can also be used for real-time analytics or as a message queue for messaging applications.

Here's an example of how to create a capped collection in MongoDB:

`db.createCollection("myCappedCollection", { capped: true, size: 1000000, max: 100 })`

In this example, we're creating a new capped collection called myCappedCollection with a maximum size of 1 MB (size: 1000000) and a maximum document count of 100 (max: 100). Once the collection reaches its maximum size or document count, MongoDB starts overwriting the oldest documents with new ones.

You can insert documents into a capped collection using the insertOne() or insertMany() methods as you would with a regular collection. However, you can't delete or update documents in a capped collection. Instead, you can only insert new documents, and old documents are automatically overwritten once the collection reaches its maximum size.

Here are some additional features of capped collections:

- Capped collections are ordered by insertion time, so you can use them to retrieve documents in the order they were inserted.
- Capped collections have a high write throughput because they don't require MongoDB to move documents on disk to make space for new ones.
- Capped collections can't be sharded or indexed, and their size and structure can't be changed after creation.

---

##### Capped Collection always retrieve data in the same order they were added

$natural sort order is used to return documents in the order they are stored on disk, without any explicit sorting by an index or a field value. However, in a capped collection, the documents are ordered by insertion time, so using $natural to sort a capped collection is equivalent to sorting by insertion time.

Here's an example of how to use $natural to sort a capped collection:
`db.myCappedCollection.find().sort({ $natural: 1 })`

In this example, we're querying the myCappedCollection capped collection and sorting the documents in ascending order using $natural. This will return the documents in the order they were inserted into the collection.

Note that when using $natural to sort a capped collection, you should always use the ascending sort order ($natural: 1). Using the descending sort order ($natural: -1) can cause unexpected behavior because capped collections are ordered by insertion time.
