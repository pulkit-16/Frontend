import React, { useEffect, useState } from "react";

import axios from "axios";
import Pagination from "./Pagination";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [watchList, setWatchList] = useState([]);
  const [hovered, setHovered] = useState("");

  //Pagination handler
  const onNext = () => {
    setPageNum(pageNum + 1);
  };

  const onPrev = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  //Watchlist handler

  let addToWatchList = (movie) => {
    let newWatchList = [...watchList, movie];
    setWatchList(newWatchList);
    localStorage.setItem("imdb", JSON.stringify(newWatchList));
  };

  let removeFromWatchList = (movie) => {
    let filteredWatchList = watchList.filter((m) => {
      return m.id != movie.id;
    });
    setWatchList(filteredWatchList);
    localStorage.setItem("imdb", JSON.stringify(filteredWatchList));
  };

  //showing and hiding the icon

  let showButton = (id) => {
    setHovered(id);
  };
  let hideButton = () => {
    setHovered("");
  };

  function isIDPresent(movie) {
    for (let i = 0; i < watchList.length; i++) {
      if (movie.id == watchList[i].id) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    (function () {
      axios
        .get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=037de86a1a300a981777601d21415594&page=${pageNum}`
        )
        .then((response) => {
          setMovies(response.data.results);
        });
    })();
  }, [pageNum]);

  useEffect(() => {
    let moviesfromLS = localStorage.getItem("imdb");
    moviesfromLS = JSON.parse(moviesfromLS) || [];

    setWatchList(moviesfromLS);
  }, []);

  console.log(movies);

  return (
    <div>
      <div className="text-2xl text-center mb-8 font-bold">Trending Movies</div>

      <div className="flex flex-wrap justify-evenly">
        {movies.map((movie) => {
          return (
            <div
              onMouseEnter={() => showButton(movie.id)}
              onMouseLeave={() => hideButton()}
              key={movie.id}
              className="w-[180px] h-[40vh] bg-center bg-cover m-4 rounded-xl hover:scale-110 duration-500 relative  flex items-end"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`,
              }}
            >
              <div
                className="bg-gray-900 text-2xl absolute right-0 top-0 rounded-xl cursor-pointer"
                style={{ display: hovered == movie.id ? "block" : "none" }}
              >
                {!isIDPresent(movie) ? (
                  <div onClick={() => addToWatchList(movie)}>😍</div>
                ) : (
                  <div onClick={() => removeFromWatchList(movie)}>❌</div>
                )}
              </div>

              <div
                className=" text-white text-center w-full bg-gray-900 opacity-80 "
                style={{ display: hovered == movie.id ? "block" : "none" }}
              >
                {movie.title}
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        pageNumProp={pageNum}
        onNextProp={onNext}
        onPrevProp={onPrev}
      />
    </div>
  );
}

export default Movies;
