window.onload = (event) => {
    let api_key = '081b8309710552d0bddb414837475a60';
   
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
      

    
    let link = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`;
    
    
    fetch(link)
        .then(response => response.json())  
        .then(data => {
            let imgDiv = document.querySelector('.poster-img');
            let img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
            imgDiv.appendChild(img);
            imgDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${data.backdrop_path})`;

            let titleDiv = document.querySelector('.movie-title');
            let title = document.createElement('b');
            title.innerHTML=data.title;
            titleDiv.appendChild(title)

            let ageDiv = document.querySelector('.movie-age');
            if (data.adult)
                ageDiv.innerHTML='pg+15';
            else
            ageDiv.innerHTML='pg-13';

            let yearDiv = document.querySelector('.movie-year');
            const year = data.release_date.split('-')[0];
            yearDiv.innerHTML=year ;

            let durationDiv = document.querySelector('.movie-duration');
            const duration = data.runtime;
            durationDiv.innerHTML=(duration/60).toFixed(0)+'HRs '+duration%60+'MINS' ;

            let descriptionDiv = document.querySelector('.description');
            descriptionDiv.innerHTML=data.overview;
            
            let genres = document.querySelector('.genres');
            for (i of data.genres) {
                let genre = document.createElement('div');
                genre.classList.add('movie-genres')
                genre.innerHTML=(i['name']);
                genres.appendChild(genre)
            }

        })
        .catch(error => {
            console.error('Error fetching data:', error);  
        });

        let link2 = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`;
        fetch(link2)
        .then(response => response.json())  
        .then(data => {
            const directors = data.crew.filter(member => member.job === 'Director');
            const directorsDiv = document.querySelector('.director-names');  // Get the container for director names
            for (let director of directors) {
                let dir = document.createElement('div');
                dir.classList.add('dir-name'); 
                dir.innerHTML = director.name;  
                directorsDiv.appendChild(dir);  
            }

            const starsDiv = document.querySelector('.star-names');  
            const stars = data.cast.slice(0, 2); 
            
            for (let star of stars) {
                let starDiv = document.createElement('div');
                starDiv.classList.add('star-name');  
                starDiv.innerHTML = star.name; 
                starsDiv.appendChild(starDiv);  
            }
            
        
        })
        .catch(error => {
            console.error('Error fetching cast data:', error);  
        });

        let link3 = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api_key}`;
        fetch(link3)
        .then(response => response.json())  
        .then(data => {
            const movies = data.results; 
            const cards = document.querySelector('.similar');
            
            console.log(movies);
            for (let i = 0; i < movies.length; i++) {
            let movie = document.createElement('div');
            movie.classList.add('movie-card');
            let image = document.createElement('img');
            image.classList.add('movie-image');
            let fullImageUrl = "https://image.tmdb.org/t/p/w185" + movies[i].poster_path;
            image.src = fullImageUrl;
            movie.addEventListener('click', () => {
                window.open(`movie_page.html?id=${movies[i].id}`, '_blank');
            });
            movie.appendChild(image);
            cards.appendChild(movie)
            }
        })




};
