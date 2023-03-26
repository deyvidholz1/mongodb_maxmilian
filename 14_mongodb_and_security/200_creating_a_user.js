// Start mongo server with required auth: sudo mongod --auth
// Auth: mongo -u <username> -p <password>
/**
 * If no users are set yet, mongodb allows localhost to connect to the database
 * and create ONE user.
 */
db.createUser({
  user: "davidholz",
  pwd: "123456",
  roles: ["userAdminAnyDatabase"], // userAdminAnyDatabase is a built-in role that mongodb provides.
  // "root" is the most powerful rule. Once assigned, user can do anything.
});

// Auth:
db.auth("davidholz", "123456");
