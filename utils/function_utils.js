function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function convertdatatoformat(jsondata) {
  var message = "";
  //console.log(jsondata);
  jsondata.forEach((element) => {
    message = message + "\n <br>";
    message =
      message +
      "<b>Center no: </b>" +
      element.center_id +
      "<b> Name: </b>" +
      element.name +
      "<b> Address: </b>" +
      element.address +
      "<b> Pincode: </b>" +
      element.pincode +
      "<b> Fee Type: </b>" +
      element.fee_type +
      "\n <br>";
  });
  console.log(message);
  console.log("\007");
  console.log("\007");
  return message;
}

function searchinjsondata(jdata, age) {
  iffound = [];
  jdata.forEach((ele) => {
    ele.sessions.forEach((element) => {
      //console.log("-------------------------------");
      //console.log(element);
      if (element.min_age_limit <= age && element.available_capacity > 0) {
        // console.log(
        //   element.min_age_limit +
        //     "age:  " +
        //     ele.name +
        //     " " +
        //     "code :" +
        //     ele.center_id +
        //     " available_capacity:" +
        //     element.available_capacity
        // );
        iffound.push(ele);
      }
      //console.log("-------------------------------");
    });
  });
  //console.log(iffound);
  return iffound;
}

module.exports = { isEmpty, searchinjsondata, convertdatatoformat };
