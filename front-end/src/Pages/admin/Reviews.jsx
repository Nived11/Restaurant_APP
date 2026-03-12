import React from 'react'
import {ReviewHeader,ReviewList} from "../../features/admin/reviews"

const Reviews = () => {
  return (
   <div className="max-w-full min-h-screen bg-white rounded-t-[2rem] pb-20 px-2">
       <div className="pt-8 flex flex-col gap-10">
        
        <ReviewHeader />

        <ReviewList />

      </div>
    </div>
  )
}

export default Reviews