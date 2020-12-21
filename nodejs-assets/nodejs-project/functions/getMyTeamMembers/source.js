exports = async function () {
  const cluster = context.services.get("mongodb-atlas");
  const collection = cluster.db("application").collection("User");
  const caller = context.user;

  return await collection.findOne({ _id: caller._id })
};
