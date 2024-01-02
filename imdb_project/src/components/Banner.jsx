import React from 'react'

function Banner() {
  return (
    <div className=' mx-1 h:[20vh] md:h-[62vh]  bg-cover bg-center bg-no-repeat flex items-end'
      style={
      {
          backgroundImage: `url(https://assets-in.bmscdn.com/discovery-catalog/events/et00311714-ewdhvajezf-landscape.jpg)`
       
         
      }
    }>
      <div className='text-xl  md:text-3xl text-white bg-gray-900 opacity-70 p-2 text-center w-full'>John Wick</div>
    </div>
  )
}

export default Banner 