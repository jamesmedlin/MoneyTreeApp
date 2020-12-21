exports = async function () {
  const cluster = context.services.get("mongodb-atlas");
  const collection = cluster.db("application").collection("Advertisement");


  return await collection.insertOne({
    name: "BigBuckBunny",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    quiz: ["Is this it?", "Or this??", "Or even this..?"],
    viewers: []
  }, { unique: true });
};
