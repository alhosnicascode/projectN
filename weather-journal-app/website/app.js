
let b = new Date();
let newDa = b.toDateString();

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";


const apiKey = ",&appid=19fe31f233fc613837bc4ab7ad4a32c3=metric";

// the URL of the server to post data
const server = "http://127.0.0.1:4000";



const genData = () => { 
  const mis = document.getElementById("mis");
  const feel = document.getElementById("feel").value;
  const p = document.getElementById("p").value;
 
//  error 


  getWeatherData(p).then((data) => {
 
    if (data) {
      const {
        main: { temp },
        name: city,
        weather: [{ descrip }],
      } = data;

      const info = {
        newDa,
        city,
        temp: Math.round(temp), 
        descrip,
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
const getWeather = async (p) => {
  try {
    const res = await fetch(baseURL + p + apiKey);
    const data = await res.json();

    if (data.cod != 200) {
    
      mis.innerHTML = data.message;
      setTimeout(_=> mis.innerHTML = '', 2000)
      throw `${data.message}`;
    }

    return data;
  } catch (mis) {
    console.log(mis);
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
  } catch (mis) {
    console.log(mis);
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
    document.getElementById("descrip").innerHTML = savedData.descrip;
    document.getElementById("content").innerHTML = savedData.feel;
  } catch (mis) {
    console.log(mis);
  }
};
