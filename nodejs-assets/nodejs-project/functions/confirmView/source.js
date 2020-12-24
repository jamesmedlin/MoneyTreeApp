exports = async function (advertisement) {
  const cluster = context.services.get("mongodb-atlas");
  const collection = cluster.db("application").collection("Advertisement");
  const caller = context.user;

  const change = {
    "$push": { "viewers": caller.id }
  }
  console.log("ad_id", advertisement)

  const ad = await collection.updateOne({ _id: advertisement }, change);
  return ad;
};
