exports = async function addUserToRegion({ user, regionName }) {
    const cluster = context.services.get("mongodb-atlas");
    const region = cluster.db("application").collection("Region");
    
    const query = {
      "name": regionName
    };
    
    const update = {
      $push: {
        "participants": user._id
      }
    };
    
    const options = { "upsert": false };
    
    return region.updateOne(query, update, options);
};
