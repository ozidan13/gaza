"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'

// import components 

// import images
import paypal from '@public/assets/images/paypal.png';

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

        <section class="bg-white dark:bg-gray-900">
            {phase === 1 ? ( 
              <div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                <Image 
                  src={paypal} 
                  alt="paypal image" 
                  width={300}
                  height={300}
                />
                <div class="mt-4 md:mt-0">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Let's create more tools and ideas that brings us together.</h2>
                    <p class="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Flowbite helps you connect with friends and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups.</p>
                    <a href="#" class="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                        Get started
                        <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                </div>
              </div>
            ) : ""}
        </section>
        
      </div>
    </div>
  );
}
