require("dotenv").config();
const express = require("express");
const router = express.Router();
const app = express();

const PORT = process.env.PORT;
const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

// const oldurl = `${API_URL}/discover/movie?include_adult=true&include_video=true&language=en-US&sort_by=popularity.desc&with_companies=420`;
// const url = `${API_URL}/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc&with_cast=1136406%7C2219%7C37625&with_companies=420%7C7505%7C19551&with_original_language=en`;

const tomUrl = `${API_URL}/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc&with_cast=1136406&with_companies=420%7C7505%7C19551&with_original_language=en`;
const tobeyUrl = `${API_URL}/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc&with_cast=2219&with_companies=420%7C7505%7C19551&with_original_language=en`;
const andrewUrl = `${API_URL}/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc&with_cast=37625&with_companies=420%7C7505%7C19551&with_original_language=en`;

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

app.get("/tom-holland", async (req, res) => {
  try {
    movies = await getTomMovies();
    res.render("pages/tom-holland", {
      movies: movies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// tom holland movies details page
app.get("/tom-holland/:id", async (req, res) => {
  try {
    // get id from the movie
    const movieId = req.params.id;
    const response = await fetch(
      `${API_URL}/movie/${movieId}?language=en-US`,
      options
    );

    const movie = await response.json();
    // res.send(movie);
    res.render("pages/details", {
      movie: movie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/andrew-garfield", async (req, res) => {
  try {
    movies = await getAndrewMovies();
    res.render("pages/andrew-garfield", {
      movies: movies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/tobey-maguire", async (req, res) => {
  try {
    movies = await getTobeyMovies();
    res.render("pages/tobey-maguire", {
      movies: movies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// get tom holland movies
const getTomMovies = async () => {
  try {
    const response = await fetch(tomUrl, options);
    const json = await response.json();
    console.log(json.results);
    return json.results;
  } catch (error) {
    console.error(error);
  }
};

// get andrew garfield movies
const getAndrewMovies = async () => {
  try {
    const response = await fetch(andrewUrl, options);
    const json = await response.json();
    console.log(json.results);
    return json.results;
  } catch (error) {
    console.error(error);
  }
};

// get tobey maguire movies
const getTobeyMovies = async () => {
  try {
    const response = await fetch(tobeyUrl, options);
    const json = await response.json();
    console.log(json.results);
    return json.results;
  } catch (error) {
    console.error(error);
  }
};

// // get spiderman movies
// const getSpiderManMovies = async () => {
//   try {
//     const response = await fetch(url, options);
//     const json = await response.json();
//     console.log(json.results);
//     return json.results;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const getCast = async () => {
//   try {
//     const movies = await getSpiderManMovies();
//     movies.forEach(async (movie) => {
//       const response = await fetch(`${API_URL}/movie/${movie.id}/credits?language=en-US` , options);
//       const json = await response.json();
//       // only log "known_for_department": "Acting"
//       const cast = json.cast.filter((actor) => actor.known_for_department === "Acting");
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// getCast();

// id tom: 1136406
// id tobey: 2219
// id andrew: 37625

//marvel entertainment: 7505
//marvel studios: 420
//marvel enterprises: 19551

// const getMarvelMovies = async () => {
//   try {
//     const response = await fetch(url, options);
//     const json = await response.json();

//     console.log(json.results);
//     return json.results;
//   } catch (error) {
//     console.error(error);
//   }
// };

// old index
// app.get("/old", async (req, res) => {
//   try{
//     const movies = await getSpiderManMovies();
//     console.log(movies);

//     res.render('pages/index', {
//       movies: movies
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });
