MongoDB sharding is a distributed database architecture that allows for horizontal scaling of large data sets across multiple servers or machines. Sharding partitions data across multiple shards (server instances), with each shard storing a subset of the data. By distributing data across multiple shards, MongoDB sharding enables applications to scale horizontally while maintaining high performance and availability.

Here's an example of how to create a sharded MongoDB cluster:

1. Start multiple MongoDB instances, specifying a common configuration server and sharding router:

```
mongod --configsvr --replSet configReplSet --dbpath /data/configdb1 --port 27017
mongod --configsvr --replSet configReplSet --dbpath /data/configdb2 --port 27018
mongod --configsvr --replSet configReplSet --dbpath /data/configdb3 --port 27019
mongos --configdb configReplSet/localhost:27017,localhost:27018,localhost:27019 --port 27020

```

In this example, we're starting three MongoDB instances as configuration servers, with the same replica set name (configReplSet) and different data directories (/data/configdb1, /data/configdb2, and /data/configdb3). We're also starting a mongos process as the sharding router, pointing it to the configuration servers and specifying the port (27020) on which it should listen for connections.

2. Connect to the mongos process and add shards to the cluster:

```
mongo --port 27020
> sh.addShard("localhost:27021")
> sh.addShard("localhost:27022")

```

In this example, we're connecting to the mongos process on port 27020 and running the sh.addShard() command to add two shards to the cluster, one on port 27021 and one on port 27022.

3. Enable sharding for a database and create a sharded collection:

```
> use myDatabase
> sh.enableSharding("myDatabase")
> db.createCollection("myCollection")
> sh.shardCollection("myDatabase.myCollection", { _id: "hashed" })
```

In this example, we're using the use command to switch to the myDatabase database and running the sh.enableSharding() command to enable sharding for the database. We're then creating a new collection called myCollection and running the sh.shardCollection() command to shard the collection based on the \_id field using a hash-based sharding key.

After creating the sharded MongoDB cluster, you can run queries and perform write operations against the mongos process, which will route the operations to the appropriate shards based on the sharding key. Sharding allows you to horizontally scale your database across multiple shards, while maintaining high performance and availability.

Here are some additional features of MongoDB sharding:

- Automatic data rebalancing: MongoDB sharding automatically rebalances data across shards as the cluster grows or shrinks, ensuring that each shard contains a roughly equal share of the data.
- Support for range-based and hash-based sharding keys: MongoDB supports both range-based and hash-based sharding keys, allowing you to choose the most appropriate sharding strategy for your data.
- Built-in security: MongoDB sharding supports built-in security features such as authentication and SSL/TLS encryption, allowing you to secure your cluster against unauthorized access.
