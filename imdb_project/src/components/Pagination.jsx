import React from "react";

function Pagination(props) {
  let { pageNumProp, onNextProp, onPrevProp } = props;

  return (
    <div className="flex justify-center my-4 cursor-pointer">
      <div onClick={onPrevProp} className=" text-xl m2 p-2 border-2 rounded-l-2xl  hover:bg-gray-400 border-r-0 border-blue-400">
        Prev
      </div>

      <div className="text-xl p-2 border-2 border-blue-400 broder-r-0  hover:bg-gray-400">
        {pageNumProp}
      </div>

      <div onClick={onNextProp} className=" text-xl m2  hover:bg-gray-400 p-2 border-2 rounded-r-2xl border-l-0 border-blue-400">
        Next
      </div>
    </div>
  );
}

export default Pagination;
