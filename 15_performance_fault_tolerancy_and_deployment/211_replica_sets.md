MongoDB replica sets are a distributed database architecture that provide high availability and automatic failover in case of a primary node failure. A replica set consists of a group of MongoDB instances, where one instance acts as the primary node that handles all write operations and the others act as secondary nodes that replicate the primary's data and can optionally serve read operations.

Replica sets are useful for ensuring the availability and reliability of a MongoDB database in production environments. They allow for automatic failover and data redundancy, which can help minimize downtime and data loss in case of a node failure.

Here's an example of how to create a replica set in MongoDB:

1. Start multiple MongoDB instances on different servers or machines, specifying a common replica set name:

```
mongod --replSet myReplicaSet --port 27017 --dbpath /data/db1
mongod --replSet myReplicaSet --port 27018 --dbpath /data/db2
mongod --replSet myReplicaSet --port 27019 --dbpath /data/db3

```

In this example, we're starting three MongoDB instances on different ports (27017, 27018, and 27019) with the same replica set name (myReplicaSet) and different data directories (/data/db1, /data/db2, and /data/db3).

2. Connect to one of the MongoDB instances and initiate the replica set:

```
mongo --port 27017
> rs.initiate()

```

In this example, we're connecting to the first MongoDB instance on port 27017 and running the rs.initiate() command to initiate the replica set. This will make the current instance the primary node and create a replica set configuration that includes all three instances.

3. Add the remaining instances to the replica set:

```
> rs.add("localhost:27018")
> rs.add("localhost:27019")

```

In this example, we're adding the second and third MongoDB instances to the replica set using the rs.add() command. This will make them secondary nodes that replicate the data from the primary node.

After creating the replica set, you can use the mongo shell to connect to the primary node and run queries or perform write operations. The primary node will automatically route read operations to the secondary nodes as appropriate, based on their replication status.

Here are some additional features of MongoDB replica sets:

- Automatic failover: If the primary node fails, a secondary node will be automatically promoted to be the new primary node, ensuring continuous availability of the database.
- Data redundancy: Data is replicated across multiple nodes in the replica set, providing redundancy and reducing the risk of data loss in case of a node failure.
- Load balancing: Read operations can be distributed across the secondary nodes to balance the load and improve performance.
- Built-in security: MongoDB replica sets support built-in security features such as authentication and SSL/TLS encryption.
