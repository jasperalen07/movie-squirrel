import { useState } from "react";
import MovieCard from "./MovieCard";

const FavoriteList = ({ movie }) => {
  const [favorites, setFavorites] = useState([]);


  const addFavorite = () => {

    const hasFavorted = favorites.some((item) => item.id === movie.id);
    if(!hasFavorted){
    const newFavorite = {
      id: movie.id,
      title: movie.original_title,
      
    };


    setFavorites([...favorites, newFavorite]);
    console.log(newFavorite);
} else{
    const updatedFavorites = favorites.filter((item) => item.id !== movie.id);
    
    setFavorites(updatedFavorites);
    console.log(`movie id deleted${movie.id}`);
}
  };

  return (
    <div>
      <button onClick={addFavorite}>Add Favorite</button>
     
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>{favorite.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteList;