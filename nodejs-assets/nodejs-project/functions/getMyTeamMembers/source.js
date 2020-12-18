exports = async function () {
  const cluster = context.services.get("mongodb-atlas");
  const collection = cluster.db("application").collection("User");
  const caller = context.user;
  const userPartition = `user=${caller.id}`;
  const filter = {
    $or: [
      { "canReadPartitions": userPartition }, 
      { "canWritePartitions": userPartition },
    ]
  };


  return await collection.findOne({ _id: caller._id })
};
