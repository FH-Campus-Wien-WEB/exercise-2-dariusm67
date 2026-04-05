function setMovie(movie) {
  for (const element of document.forms[0].elements) {
    const name = element.id;
    const value = movie[name];

    if (name === "Genres") {
      const options = element.options;
      for (let index = 0; index < options.length; index++) {
        const option = options[index];
        option.selected = value.indexOf(option.value) >= 0;
      }
    } else {
      element.value = value;
    }
  }
}

function getMovie() {
  const movie = {};

  const elements = Array.from(document.forms[0].elements).filter(
    (element) => element.id,
  );

  for (const element of elements) {
    const name = element.id;

    let value;

    if (name === "Genres") {
      value = [];
      const options = element.options;
      for (let index = 0; index < options.length; index++) {
        const option = options[index];
        if (option.selected) {
          value.push(option.value);
        }
      }
    } else if (
      name === "Metascore" ||
      name === "Runtime" ||
      name === "imdbRating"
    ) {
      value = Number(element.value);
    } else if (
      name === "Actors" ||
      name === "Directors" ||
      name === "Writers"
    ) {
      value = element.value.split(",").map((item) => item.trim());
    } else {
      value = element.value;
    }

    movie[name] = value;
  }

  return movie;
}

function putMovie() {
  // 1. Get the newly edited movie data using your teacher's getMovie() function
  const movieData = getMovie();
  const imdbID = movieData.imdbID;

  // 2. Configure the XMLHttpRequest to make a PUT request to our new server endpoint
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", "/movies/" + imdbID);

  // 3. Set the 'Content-Type' so the server knows we are sending JSON data
  xhr.setRequestHeader("Content-Type", "application/json");

  // 4. Configure what happens when the server responds (Teacher's code)
 xhr.onload = function () {
    // Adding 201 here makes sure "New Movies" are treated as a success!
    if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204) {
      location.href = "index.html";
    } else {
      alert("Saving of movie data failed. Status code was " + xhr.status);
    }
  };

  // 5. Send the movie data as a JSON string
  xhr.send(JSON.stringify(movieData));
}

/** Loading and setting the movie data for the movie with the passed imdbID */
const imdbID = new URLSearchParams(window.location.search).get("imdbID");

const xhr = new XMLHttpRequest();
xhr.open("GET", "/movies/" + imdbID);
xhr.onload = function () {
  if (xhr.status === 200) {
    // This takes the data from the server and puts it into the form boxes
    setMovie(JSON.parse(xhr.responseText));
  } else {
    alert("Loading of movie data failed. Status was " + xhr.status);
  }
};

xhr.send();

