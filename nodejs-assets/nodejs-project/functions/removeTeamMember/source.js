exports = async function () {
  const collection = context.services.get("mongodb-atlas").db("application").collection("User");
  const callingUser = context.user;
  console.log("calling user .id", callingUser.id);
  const filter = { _id: callingUser.id };
  const memberToRemove = await collection.findOne(filter);
  if (memberToRemove == null) {
    return { error: `User not found` };
  }

  try {
    return await collection.deleteOne(
      { _id: memberToRemove._id },
    );
  } catch (error) {
    return { error: error.toString() };
  }
};
