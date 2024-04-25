//random position movies in web
const movies = document.querySelectorAll(".movie");

// position movies randomly
// not above 80% or below 20%
// can't overlap each other
if (movies) {
  gsap.to(movies, {
    top: "random(0, 85)%",
    left: "random(0, 85)%",
    stagger: 0.1,
    ease: 'power4.out'
  });

  // GSAP
  gsap.registerPlugin(Draggable);

  movies.forEach(function (movie) {
    Draggable.create(".movie", {
      bounds: ".movie-container",
      ease: 'power4.out'
    });
  });
}
