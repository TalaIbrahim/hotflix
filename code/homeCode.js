window.onload = (event) => {
  let api_key = '?api_key=081b8309710552d0bddb414837475a60';

  // Fetch movie genres
  fetch(`https://api.themoviedb.org/3/genre/movie/list${api_key}`)
    .then(response => response.json())
    .then(data => {
      let genreDictionary = {}; 
      // Saving the IDs and the Genres
      data.genres.forEach(genre => {
        genreDictionary[genre.id] = genre.name;
      });


      const fetchmovies = (listt) => {
        url= `https://api.themoviedb.org/3/movie/${listt}${api_key}`
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const cards = document.getElementsByClassName('items-movies')[0];
            cards.innerHTML = ''; 

            const row = document.createElement('div');
            row.classList.add('row-movies');
            const movies = data.results;

            for (let i = 0; i < movies.length; i++) {
                let movie = document.createElement('div');
                movie.classList.add('movie-card');

                let image = document.createElement('img');
                image.classList.add('movie-image');
                let fullImageUrl = "https://image.tmdb.org/t/p/w185" + movies[i].poster_path;
                image.src = fullImageUrl;

                let title =  document.createElement('div');
                title.classList.add('movie-title');
                title.innerHTML= movies[i].original_title;

                let genres =  document.createElement('div');
                genres.classList.add('movie-genre');
                for (let j = 0; j < movies[i].genre_ids.length; j++) {
                    if (j != 0 && j < movies[i].genre_ids.length)
                        genres.innerHTML+= ',';
                    genres.innerHTML+= genreDictionary[movies[i].genre_ids[j]]+' ';
                }

                let rating = document.createElement('div');
                rating.classList.add('movie-rating');
                let roundedRate = movies[i].vote_average.toFixed(1);
                rating.innerHTML = roundedRate;

                if (roundedRate < 5) {
                  rating.classList.add('bad-rating');
                }

                movie.addEventListener('click', () => {
                  window.open(`movie_page.html?id=${movies[i].id}`, '_blank');
                });

                // Append elements to the movie card
                movie.append(rating);
                movie.appendChild(image);
                movie.appendChild(title);
                movie.appendChild(genres);
                row.appendChild(movie);
            }
            cards.appendChild(row);
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
      };

      fetchmovies('popular');
      const switchTabs =(tabs) => {
        tabs.forEach(tab => {
          tab.addEventListener('click', function() {
              tabs.forEach(t => t.classList.remove('selected'));
              tab.classList.add('selected');

              const mobileSelected = document.querySelector('.selected-tab');
              let selectedTab = tab.innerHTML;
              mobileSelected.innerHTML=selectedTab;
              switch (selectedTab) {
                  case 'New Releases':
                      list = 'popular'
                      break;
                  case 'Movies':
                      list = 'now_playing';
                      break;
                  case 'TV Series':
                      list = 'top_rated';
                      break;
                  case 'Cartoons':
                      list = 'upcoming';
                      break;
              }
               const mobileTabs = document.querySelector('.mobile-tabs');
               mobileTabs.classList.remove('display');
              fetchmovies(list);
          });
      });
      }
      const tabs = document.querySelectorAll('.tabs div');
      const mobileTabs = document.querySelectorAll('.mobile-tabs div');
      switchTabs(tabs);
      switchTabs(mobileTabs);
   
    })
    .catch(error => {
      console.error('Error fetching genre data:', error);
    });

  const up = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };
const scrollup = document.getElementsByClassName('up')[0];
scrollup.addEventListener('click', up);
const scrollup_mobile = document.getElementsByClassName('mobile-up')[0];
scrollup_mobile.addEventListener('click', up);


const mobileMenu = document.querySelector('.tabs-menu');
mobileMenu.addEventListener('click', function() {
   mobileTabs = document.querySelector('.mobile-tabs');
   if (mobileTabs.classList.contains('display'))
    mobileTabs.classList.remove('display');
  else
   mobileTabs.classList.add('display');
});

};
