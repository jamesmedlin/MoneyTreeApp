exports = async function () {
  const cluster = context.services.get("mongodb-atlas");
  const collection = cluster.db("application").collection("Advertisement");
  const caller = context.user;

  // return await collection.insertOne({
  //   "_id": "stringid",
  //   "name": "exampleAd",
  //   "_partition": "PUBLIC",
  //   "quiz": ['hi', 'hello', 'bye'],
  //   "uri": "oohyeahhhh",
  //   "viewers": [""],
  // })
  const ad = await collection.findOne({ "viewers": { "$nin": [caller.id]}});
  return ad;
};
