require("dotenv").config();
const express = require("express");
const router = express.Router();
const app = express();

const PORT = process.env.PORT;
const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

const url = `${API_URL}/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc&with_companies=420%7C7505%7C19551&with_original_language=en&with_cast=`;


const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(router);
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});

// index
app.get("/", async (req, res) => {
  try {
    res.render("pages/index");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const spiderArray = [
  {
    id: 1136406,
    slug: "tom-holland",
    name: 'Tom Holland',
    firstName: 'tom',
    img: "/images/tomSuit.png",
  },
  {
    id: 2219,
    slug: "tobey-maguire",
    name: 'Tobey Maguire',
    firstName: 'tobey',
    img: "/images/tobeySuit.png",
  },
  {
    id: 37625,
    slug: "andrew-garfield",
    name: 'Andrew Garfield',
    firstName: 'andrew',
    img: "/images/andrewSuit.png",
  }
]


app.get("/spiderman/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const activeSpiderman = spiderArray.filter((spider) => spider.slug === name)[0];
    console.log(activeSpiderman)
    movies = await getMovies(activeSpiderman.id);
    res.render("pages/spider-details", {
      activeSpiderman,
      movies: movies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// movie details page
app.get("/spiderman/:name/:id", async (req, res) => {
  try {
    // get id from the movie
    const movieId = req.params.id;
    const response = await fetch(
      `${API_URL}/movie/${movieId}?language=en-US`,
      options
    );
    const movie = await response.json();
    console.log(movie);
    
    const castResponse = await fetch(`${API_URL}/movie/${movieId}/credits?language=en-US` , options);
    const json = await castResponse.json();
    const cast = json.cast.filter((actor) => actor.known_for_department === "Acting");
    console.log(cast);

    res.render("pages/movie-details", {
      movie: movie,
      cast: cast,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// get movies
const getMovies = async (id) => {
  try {
    const response = await fetch(url+id, options);
    const json = await response.json();
    console.log(json.results);
    return json.results;
  } catch (error) {
    console.error(error);
  }
};


// const getCast = async (id) => {
//   try {
//       const response = await fetch('https://api.themoviedb.org/3/movie/102382/credits?language=en-US' , options);
//       const json = await response.json();
//       const cast = json.cast.filter((actor) => actor.known_for_department === "Acting");
//       console.log(cast);
//       // return cast;
//     } catch (error) {
//     console.error(error);
//   }
// };

// getCast();

// id tom: 1136406
// id tobey: 2219
// id andrew: 37625

//marvel entertainment: 7505
//marvel studios: 420
//marvel enterprises: 19551