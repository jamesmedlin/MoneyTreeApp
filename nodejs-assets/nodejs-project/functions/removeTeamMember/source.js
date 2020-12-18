exports = async function(email) {
  const collection = context.services.get("mongodb-atlas").db("application").collection("User");
  const filter = {name: email};
  const memberToRemove = await collection.findOne(filter);
  if (memberToRemove == null) {
    return {error: `User ${email} not found`};
  }
  
  try {
    return await collection.deleteOne(
      {_id: memberToRemove._id},
      );
  } catch (error) {
    return {error: error.toString()};
  }
};
