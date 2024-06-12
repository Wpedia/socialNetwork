import { IoHeartCircleSharp } from "react-icons/io5";
import { GoComment } from "react-icons/go";
import { FaRegShareSquare } from "react-icons/fa";



export const PostFooter = () => {
    return (
      <div className='flex items-center justify-between p-4'>
        {/* Лайк, комментарий, распространить */}
        <div className='flex gap-12'>
          <button className='flex items-center gap-1'>
            <IoHeartCircleSharp className="text-slate-500 bg-transparent scale-150 rounded-xl"/>
            {/* <IoHeartCircleSharp className="text-white bg-red-500 scale-150 rounded-xl"/> */}
          </button>
          <button className='flex items-center gap-1'>
              <GoComment className="scale-125"/>
          </button>
          <button className='flex items-center gap-1'>
          <FaRegShareSquare className="scale-125"/>
          </button>
        </div>
      </div>
    );
  }