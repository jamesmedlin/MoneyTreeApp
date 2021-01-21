exports = async function createNewUserDocument({ user }) {
  const cluster = context.services.get("mongodb-atlas");
  const users = cluster.db("application").collection("User");

  return users.insertOne(
    {
      _id: user.id,
      _partition: `user=${user.id}`,
      email: user.data.email,
      canReadPartitions: [`user=${user.id}`, `PUBLIC`],
      balance: 0.0,
      totalEarnings: 0.0,
    },
    { unique: true }
  );
};
