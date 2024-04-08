require("dotenv").config();
const express = require("express");
const router = express.Router();
const app = express();

const PORT = process.env.PORT;
const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

const url = `${API_URL}/discover/movie?include_adult=true&include_video=true&language=en-US&sort_by=popularity.desc&with_companies=420`;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(router);
app.listen(PORT, function (err) {
  if (err) console.log(err);
    console.log("Server listening on PORT", PORT); 
  });

// home
app.get("/", async (req, res) => {
  try{
    const movies = await getMovies();
    console.log(movies);

    res.render('pages/index', {
      movies: movies
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
};

const getMovies = async () => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    // console.log(json.results);
    return json.results;
  } catch (error) {
    console.error(error);
  }
};