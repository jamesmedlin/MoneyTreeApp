exports = async function (lat, lon) {
  const cluster = context.services.get("mongodb-atlas");
  const collection = cluster.db("application").collection("Advertisement");
  const caller = context.user;

  const ads = await collection
    .find({ viewers: { $nin: [caller.id] } }, {})
    .sort({ cpcv: -1 })
    .toArray();
  // const ads = adsUnsorted.sort({ cpcv: -1 })

  // console.log("RETURNS: ", JSON.stringify(adsUnsorted))
  console.log("RETURNS Sorted: ", JSON.stringify(ads));
  console.log("SUPPLIED COORDS", lat);
  console.log("SUPPLIED COORDS", lon);
  // return ads;

  // let value = ads.forEach(function (ad) {
  //   if (ad.specifiesLocation && lat != -1 && lon != -1) {
  //     console.log("CHECKING DISTANCE")
  //     var lat2 = 42.340080;
  //     var lon2 = -71.088890;
  //     var lat1 = lat;
  //     var lon1 = lon;

  //     var R = 3958.8; // miles
  //     var x1 = lat2 - lat1;
  //     var dLat = x1 * Math.PI / 180;
  //     var x2 = lon2 - lon1;
  //     var dLon = x2 * Math.PI / 180;
  //     var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
  //       Math.sin(dLon / 2) * Math.sin(dLon / 2);
  //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //     var distance = R * c;
  //     if (distance <= ad.radius) {
  //       return ad;
  //     }
  //   } else if (!ad.specifiesLocation) {
  //     console.log("NO LOCATION IS SPECIFIED")
  //     return ad
  //   }
  // })

  // console.log("VALUE", value)
  let i;
  for (i = 0; i < ads.length; i++) {
    console.log("ITEM", ads[i]);
    console.log("ITEM", ads[i].name);
    console.log("ITEM", ads[i].specifiesLocation);
    if (ads[i].specifiesLocation && lat != -1 && lon != -1) {
      console.log("CHECKING DISTANCE");
      var lat2 = ads[i].latitude;
      var lon2 = ads[i].longitude;
      var lat1 = lat;
      var lon1 = lon;

      var R = 3958.8; // miles
      var x1 = lat2 - lat1;
      var dLat = (x1 * Math.PI) / 180;
      var x2 = lon2 - lon1;
      var dLon = (x2 * Math.PI) / 180;
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var distance = R * c;
      console.log("distance", distance);
      console.log("distance", ads[i].radius);
      if (distance <= ads[i].radius) {
        console.log("what will return", ads[i]);
        return ads[i];
      }
    } else if (!ads[i].specifiesLocation) {
      console.log("NO LOCATION IS SPECIFIED");
      console.log("what will return", JSON.stringify(ads[i]));
      return ads[i];
    }
  }

  return null;
};
