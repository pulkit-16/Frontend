import React from "react";
import Logo from "../assets/MovieLogo.png";

import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="flex border space-x-8 items-center pl-3 py-4 ">
      <img src={Logo} className="w-[50px]"></img>

      <Link to="/" className="text-blue-600">
        Movies
      </Link>
      <Link to="/watchlist" className="text-blue-600">
        WatchList
      </Link>
    </div>
  );
}

export default NavBar;

// anchor tag solve the problem by linking it we can change the path but it is slow , so we use Link from reactt-router

{
  /* <a href='/' className='text-blue-600'>Movies</a>
<a href='/watchlist' className='text-blue-600'>WatchList</a> */
}
