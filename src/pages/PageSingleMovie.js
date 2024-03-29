import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { formatReleaseDate, filterVideos, formatRunTime } from "../utilities/toolbelt";
import { getMovieById } from "../utilities/api"; 
import Header from "../components/Header";
import Footer from "../components/Footer";
import FavoriteList from "../components/FavoriteFunction";
import MovieCastNone from "../images/movie-cast.png"
import MoviePosterNone from "../images/No-Image.jpg"






function PageSingleMovie() {
  const params = useParams();
  const id = params.id;
  const [movieData, setmovieData] = useState('');
  const [movieVideos, setMovieVideos] = useState([]);
  const navigate = useNavigate();


  

  useEffect(() => {
    getMovieById(id)
      .then((result) => {
        console.log("test", result.videos.results)
        const youtubeTrailerVideos = filterVideos(result.videos.results);
        setmovieData(result);
        setMovieVideos(youtubeTrailerVideos);
        console.log('cast', result.credits.cast);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
    console.log("movieData", movieData);
    console.log("movieVideos", movieVideos);

  

    return (
      <main>
        <Header></Header>
      <div className="movie-page">

      <div className="backdrop-container">
  {movieData.backdrop_path && (
    <img
      className="backdrop-image"
      src={`https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}`}
      alt={`Backdrop for ${movieData.original_title}`}
    />
  )}
</div>


        <div className="poster-container">

          <div className="movie-wrapper">

          
          <img
  className="poster-image"
  src={movieData.poster_path ? `https://image.tmdb.org/t/p/w200${movieData.poster_path}` : MoviePosterNone}
  alt={`Backdrop for ${movieData.original_title}`}
/>

              <FavoriteList movie = {movieData}></FavoriteList>
</div>
        </div>

       
      
     
           
           

            {movieData && (
              <>
              
            <h1 className="movie-title">{movieData.title}</h1>

               

            <div className="movie-release-container">
              <div className="movie-row-details">
                <p className="movie-date">{formatReleaseDate(movieData.release_date)}</p>
                
                  <p className="movie-duration">{formatRunTime(movieData.runtime)}</p>
                <p className="movie-ratings">{movieData.vote_average.toFixed(1)}/10</p>
                </div>
              <div className="genre-container">
                <ul className="movie-genre">
                  {movieData.genres.map((genre, index) =>(
                    <li key={index}>
                      {index > 0 ? ' ' : ''}
                      <span>{genre.name}</span>
                    </li>
                  ))}
                </ul>

              </div>

                
                <p className="movie-overview">{movieData.overview}</p>


                <div className="movie-videos">
                 {movieVideos.length > 0 ? (



                <iframe
                className="movie-trailer"
                  src={`https://www.youtube.com/embed/${movieVideos[0].key}`}
                  width="450"
                  height="450"
                  title={movieData.title}
                >
                </iframe>
              ) : (
                <p className="movie-warning">There is no trailer available.</p>
              )}
            </div>
          </div>
            <h2>Main Casts</h2>
            <div className="cast-container">
  {movieData.credits.cast.slice(0, 5).map((actor) => (
    <div className="actor-container" key={actor.id}>
      {actor.profile_path === null ? (
        <img src={MovieCastNone} className="placeholder-cast" alt='Placeholder-cast' />

      ) : (
        <img className="actor-image" src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={`${actor.name} profile`} />
      )}

      <div className="cast-name-container">
        <p className="cast-name">{actor.name}</p>
        <p className="char-name">{actor.character}</p>
      </div>
    </div>
  ))}
</div>

        </>
      )}
    </div>
    <Footer/>
  </main>
  
  

    );
}

export default PageSingleMovie;