import React from 'react'

const Footer = () => {
  return (
    <div className='relative'>
         <div className='fixed bottom-0 bg-slate-800  text-white flex flex-col justify-center items-center  w-full'>
            <div className="logo font-bold text-white text-2xl">
                <span className='text-green-500'> &lt;</span>

                <span>Pass</span><span className='text-green-500'>OP/&gt;</span>


            </div>
            <div className='flex justify-center items-center'> Created with <img className='w-7 mx-2 font-bold' 
            src="icon/heart.png" alt="" /> 
            <span className='font-bold'>Psycho </span> <span className='text-green-500 font-bold'> 07</span></div>
        </div>
    </div>
  )
}

export default Footer
