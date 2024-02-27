"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link'

// import components 

export default function Home() {
  const [phase, setPhase] = useState(1);


  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container flex flex-col justify-center items-center gap-3">
        <section className="flex justify-center items-center flex-row w-full relative mb-6">
          <div className='flex justify-between items-center flex-row gap-8 '>
            <div 
              className={`${phase === 1 ? ' bg-blue-600' : 'bg-gray-400 border hover:border-bg-blue-600'} text-white font-bold py-2 px-4 w-12 h-12 rounded-full text-center flex justify-center items-center transition ease-in-out duration-150 cursor-pointer`} 
              onClick={() => setPhase(1)}>
                1
            </div>
            <div 
              className={`${phase === 2 ? 'bg-blue-600' : 'bg-gray-400 border hover:border-blue-600'} text-white font-bold py-2 px-4 w-12 h-12 rounded-full text-center flex justify-center items-center transition ease-in-out duration-150 cursor-pointer`} 
              onClick={() => setPhase(2)}
              >
                2
            </div>
            <div 
              className={`${phase === 3 ? 'bg-blue-600' : 'bg-gray-400 border hover:border-blue-600'} text-white font-bold py-2 px-4 w-12 h-12 rounded-full text-center flex justify-center items-center transition ease-in-out duration-150 cursor-pointer`} 
              onClick={() => setPhase(3)}
              >
                3
            </div>
            <div 
              className={`${phase === 4 ? 'bg-blue-600' : 'bg-gray-400 border hover:border-blue-600'} text-white font-bold py-2 px-4 w-12 h-12 rounded-full text-center flex justify-center items-center transition ease-in-out duration-150 cursor-pointer`} 
              onClick={() => setPhase(4)}
              >
                4
            </div>
          </div>
          <div className="lg:w-[16rem] block w-full h-1 bg-gray-500 absolute -z-10" />
        </section>

        
      </div>
    </div>
  );
}
