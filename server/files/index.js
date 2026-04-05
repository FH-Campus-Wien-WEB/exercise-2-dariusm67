window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
      for (const movie of movies) {
        /* Task 1.3. Add your code from exercise 1 here 
           and include a non-functional 'Edit' button
           to pass this test */
           const article = document.createElement('article');
            
            // This sets the HTML ID to the real IMDB ID
            article.id = movie.imdbID; 

            const title = document.createElement('h2');
            title.textContent = movie.Title;
            article.appendChild(title);

            const poster = document.createElement('img');
            poster.src = movie.Poster;
            poster.alt = `Poster for ${movie.Title}`;
            article.appendChild(poster);

            const info = document.createElement('div');
            info.innerHTML = `
                <p><strong>Released:</strong> ${movie.Released}</p>
                <p><strong>Runtime:</strong> ${movie.Runtime} min</p>
                <p><strong>IMDb Rating:</strong> ${movie.imdbRating} | <strong>Metascore:</strong> ${movie.Metascore}</p>
            `;
            article.appendChild(info);

            const genreContainer = document.createElement('div');
            movie.Genres.forEach(genre => {
                const genreSpan = document.createElement('span');
                genreSpan.textContent = genre;
                genreSpan.classList.add('genre');
                genreContainer.appendChild(genreSpan);
            });
            article.appendChild(genreContainer);

            const createListSection = (label, dataArray) => {
                const header = document.createElement('h4');
                header.textContent = label + ":";
                article.appendChild(header);

                const ul = document.createElement('ul');
                dataArray.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    ul.appendChild(li);
                });
                article.appendChild(ul);
            };

            createListSection("Directors", movie.Directors);
            createListSection("Writers", movie.Writers);
            createListSection("Actors", movie.Actors);

            const plotHeader = document.createElement('h4');
            plotHeader.textContent = "Plot:";
            article.appendChild(plotHeader);

            const plot = document.createElement('p');
            plot.textContent = movie.Plot;
            article.appendChild(plot);
            
            // This is the brand new Edit Button!
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.onclick = function() {
                location.href = 'edit.html?imdbID=' + movie.imdbID;
            };
            article.appendChild(editBtn);

            // This glues the whole card to the webpage
            bodyElement.appendChild(article);
      }

    } else {
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
          xhr.status +
          " - " +
          xhr.statusText
      );
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};
