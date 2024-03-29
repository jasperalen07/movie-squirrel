import Categories from "../components/Categories.js";
import MoviesContainer from "../components/MoviesContainer.js";
import Search from "../components/Search.js";
import { getPopularMovies, getNowPlayingMovie, getTopRatedMovie, getUpcomingMovie } from "../utilities/api.js";
import FeaturedCarousel from "../components/FeaturedCarousel.js";
import { useEffect, useState } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";


function HomePage() {
   const [popularMovies, setPopularMovies] = useState([]);
   console.log(popularMovies);
   useEffect(() => {
      getPopularMovies()
         .then(getMovies => {
            setPopularMovies(getMovies.results)
            console.log(getMovies);//shows objects of movies
         })
   }, [])


   const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
   console.log(nowPlayingMovies);
   useEffect(() => {
      getNowPlayingMovie()
         .then(getPlayingMovies => {
            setNowPlayingMovies(getPlayingMovies.results)
            console.log("popular movies", getPlayingMovies);

         })

   }, [])

   const [topRatedMovies, setTopRatedMovies] = useState([]);
   console.log(topRatedMovies);
   useEffect(() => {
      getTopRatedMovie()
         .then(getTopRatedMovies => {
            setTopRatedMovies(getTopRatedMovies.results)
            console.log(getTopRatedMovies);

         })

   }, [])



   const [upcomingMovies, setUpcomingMovies] = useState([]);
   console.log(upcomingMovies);
   useEffect(() => {
      getUpcomingMovie()
         .then(getUpcomingMovies => {
            setUpcomingMovies(getUpcomingMovies.results)
            console.log(getUpcomingMovies);

         })

   }, [])




   const [catergoryName, setCategoryName] = useState('Popular');

   return (
      <main>
         <Header>
            <Search />
         </Header>
         <FeaturedCarousel />

         <Categories catergoryName={catergoryName} setCategoryName={setCategoryName} />
         {catergoryName === 'Popular' && (
            <MoviesContainer title="Popular Movies" moviesData={popularMovies} />

         )}

         {catergoryName === 'Top Rated' && (
            <MoviesContainer title="Top Rated Movies" moviesData={topRatedMovies} />

         )}

         {catergoryName === 'Now Playing' && (
            <MoviesContainer title="Now Playing Movies" moviesData={nowPlayingMovies} />

         )}

         {catergoryName === 'Upcoming' && (
            <MoviesContainer title="Upcoming" moviesData={upcomingMovies} />

         )}





         <Footer />
      </main>

   )


}



export default HomePage;