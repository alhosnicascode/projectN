
let b = new Date();
let newDa = b.toDateString();

// The URL to retrieve weather information
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";


const apiKey = ",&appid=19fe31f233fc613837bc4ab7ad4a32c3=metric";

// the URL of the server to post data
const server = "http://127.0.0.1:4000";

// showing the error to the user
const error = document.getElementById("error");


const genData = () => { 
  //get value after click on the button
  const zip = document.getElementById("zip").value;
  const feel = document.getElementById("feel").value;

  // getWeatherData return promise
  getWeatherData(zip).then((data) => {
    //making sure from the received data to execute rest of the steps
    if (data) {
      const {
        main: { temp },
        name: city,
        weather: [{ description }],
      } = data;

      const info = {
        newDa,
        city,
        temp: Math.round(temp), // to get integer number
        description,
        feel,
      };

      postData(server + "/add", info);

      updatingUI();
      document.getElementById('entry').style.opacity = 1;
    }
  });
};


document.getElementById("generate").addEventListener("click", generateData);

// GET Web API Data
const getWeather = async (zip) => {
  try {
    const res = await fetch(baseURL + zip + apiKey);
    const data = await res.json();

    if (data.cod != 200) {
      // display the error message on UI
      error.innerHTML = data.message;
      setTimeout(_=> error.innerHTML = '', 2000)
      throw `${data.message}`;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Function to POST data
const postData = async (url = "", info = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  try {
    const   newDa = await res.json();
    console.log(`You just saved`,  newDa);
    return   newDa;
  } catch (error) {
    console.log(error);
  }
};

//Function to GET  Data

const updatingUI = async () => {
  const res = await fetch(server + "/all");
  try {
    const savedData = await res.json();

    document.getElementById("date").innerHTML = savedData.newDa;
    document.getElementById("city").innerHTML = savedData.city;
    document.getElementById("temp").innerHTML = savedData.temp + '&degC';
    document.getElementById("description").innerHTML = savedData.description;
    document.getElementById("content").innerHTML = savedData.feel;
  } catch (error) {
    console.log(error);
  }
};
