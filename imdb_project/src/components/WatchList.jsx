import React, { useEffect, useState } from "react";

function WatchList() {
  const [favourites, setFavourites] = useState([]);
  const [genres, setGeneres] = useState([]);
  const [currGenre, setCurrGenre] = useState("All Genres");
  const [rating, setRating] = useState(0);
  const [popular, setPopular] = useState(0);
  const [searchStr, setSearchStr] = useState("");

  let genreIds = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("imdb"); // stored in string n convert to json
    moviesFromLocalStorage = JSON.parse(moviesFromLocalStorage); //||[];
    setFavourites(moviesFromLocalStorage);
  }, []);

  useEffect(() => {
    let temp = favourites.map((movie) => genreIds[movie.genre_ids[0]]); // thats how we fetch value of key in obj
    temp = new Set(temp); // delete repeated element
    setGeneres(["All Genres", ...temp]);
  },[favourites]);

  let filteredFavouritesMovies = [];

  filteredFavouritesMovies =
    currGenre == "All Genres"
      ? favourites
      : favourites.filter((movie) => {
          return genreIds[movie.genre_ids[0]] == currGenre;
      });
  
      filteredFavouritesMovies = filteredFavouritesMovies.filter((movie)=>{
        return movie.title.toLowerCase().includes(searchStr.toLowerCase())
      })
  
  //sorting in rating

  if (rating ==-1) {
    filteredFavouritesMovies = filteredFavouritesMovies.sort(function(a,b){
      return b.vote_average - a.vote_average
    });
  }

  if (rating ==1) {
    filteredFavouritesMovies = filteredFavouritesMovies.sort((a,b)=>{
      return a.vote_average - b.vote_average
    });
  }

  //sort popularity
  if (popular ==-1) {
    filteredFavouritesMovies = filteredFavouritesMovies.sort(function(a,b){
      return b.popularity - a.popularity
    });
  }

  if (popular ==1) {
    filteredFavouritesMovies = filteredFavouritesMovies.sort((a,b)=>{
      return a.popularity - b.popularity
    });
  }

  //delete

  function handleDeletebutton(movie) {
    let newFavArr = favourites.filter((m) => { return m.id != movie.id })
    setFavourites([...newFavArr ])
    localStorage.setItem('imdb',JSON.stringify(newFavArr))
  }


  return (
    <>
      <div  className="mt-6 flex flex-wrap space-x-3 justify-center ">
        {genres.map((genre) => {
          return (
            <button 
              className={
                currGenre == genre
                  ? "text-lg m-2 bg-blue-400 p-1 px-2 rounded-xl font-bold text-white"
                  : "m-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold"
              }
              onClick={() => setCurrGenre(genre)}
            >
              {genre}
            </button>
          );
        })}
      </div>

      <div className="text-center">
        <input
          type="text"
          className=" bg-gray-200 border-4 text-center p-1 m-2"
          placeholder="Search for Movies"
           value={searchStr}
          onChange={(e)=> setSearchStr(e.target.value)}
        />
      </div>

      <div className="border-gray-200 rounded-lg border overflow-hidden shadow-md m-5">
        <table className="w-full border-collapse bg-blue-100 text-left text-sl text-gray-500 ">
          <thead>
            <tr>
              <th className="px-2 py-3 font-medium text-gray-900">Name</th>

              <th>
                <div className="flex">
                  <button title="Decreasing" className="mr-1" onClick={()=>setRating(-1)}>🔽</button>
                  Rating
                  <button  title="Increasing" className="ml-1" onClick={()=>setRating(1)}>🔼</button>
                </div>
              </th>
              
              <th>
                <div className="flex">
                <button title="Decreasing" className="mr-1" onClick={()=>setPopular(-1)}>🔽</button>
                  Popularity
                  <button title="Increasing" className="ml-1" onClick={()=>setPopular(1)}>🔼</button>
               
                </div>
              </th>

              <th>
                <div className="flex">Genre</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-900 border-t border-gray-900">
            {filteredFavouritesMovies?.map((movie) => {
              return (
                <tr key={movie.id} className="hover:bg-gray-50">
                  <td className="flex items-center px-6 py-4 font-normal  space-x-2 text-gray-900">
                    <img
                      className="h-[10rem] w-[8rem] object-fit"
                      src={`https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path}`}
                    ></img>
                    <div className="font-medium text-gray-500 text-sm ">
                      {movie.title}
                    </div>
                  </td>

                  <td className="pl-8 py-4">{movie.vote_average}</td>
                  <td className="pl-8 py-4">{movie.popularity}</td>
                  <td className=" py-4 mx-2">
                    {genreIds[movie.genre_ids[0]]}
                    {/* {movie.genre_ids.map(key => (genreIds[key] + "  "))} */}
                  </td>
                  <td>
                    <button className="bg-gray-900 text-xl rounded-md "
                    onClick={()=>handleDeletebutton(movie)}>❌</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
