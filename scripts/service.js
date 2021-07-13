//------------------------- Fetch of dataBase ---------------------------

// ASKING FOR THE DATA
const getData = async function () {
  const data = await fetch('db.json'); // returns response and not just promise

  if (data.ok) {
    return data.json(); // returns promise with the data from json file
  } else {
    throw new Error(
      `Data was not recieved, error ${data.status} ${data.statusText}`
    );
  }
};

// HANDLING THIS DATA
const getGoods = function (callback, property, value) {
  getData() // this function will return only the data connected with the category (men or women); category will be taken from hash
    .then(data => {
      if (value) {
        callback(data.filter(item => item[property] === value));
        console.log(data);
      } else {
        callback(data);
      }
    })
    .catch(err => callback(err));
};

export default getGoods;
