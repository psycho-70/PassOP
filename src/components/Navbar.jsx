import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-around items-center gap-4 md:gap-32 h-10 p-1 overflow-hidden bg-zinc-900 text-white '>
      <div>
        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-500'> &lt;</span>

          <span>Pass</span><span className='text-green-500'>OP/&gt;</span>


        </div>

      </div>
     <div>
      <button className='flex justify-center items-center gap-2 bg-green-800 px-2 py-1 rounded-xl'>
        <img src="icon/github.svg" width={30} height={30} className='invert z-20' alt="" />
        <a className='' href="https://github.com/phyco7"  target='_blank'>Github</a>
      </button>
     </div>
    </div>
  )
}

export default Navbar

