exports = async function (advertisement, user) {
  const cluster = context.services.get("mongodb-atlas");
  const collection = cluster.db("application").collection("Advertisement");
  const users = cluster.db("application").collection("User");
  const caller = user;

  const change = {
    $push: { viewers: caller._id },
    $set: { totalOwed: advertisement.totalOwed + advertisement.cpcv },
  };

  const ad = await collection.updateOne(
    { _id: advertisement._id, viewers: { $nin: [caller._id] } },
    change
  );
  const userQuery = await users.updateOne(
    { _id: caller._id, _partition: caller._partition },
    {
      $set: {
        balance: caller.balance + advertisement.cpcv * 0.9,
        totalEarnings: caller.totalEarnings + advertisement.cpcv * 0.9,
      },
    }
  );

  return ad;
};
