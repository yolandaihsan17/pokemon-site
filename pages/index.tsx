import Image from 'next/image'
import Link from 'next/link'
import Card from '../components/card'
// import styles from '../styles/Home.module.css'
import Layout from '../components/layout'

import Pokemon1 from '/public/image/pokemon-1.png'
import Pokemon2 from '/public/image/pokemon-2.png'
import Pokemon3 from '/public/image/pokemon-3.png'

export default function Home() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <Layout>
      {/* HERO */}
      <div className="hero min-h-screen bg-white">
        <div className="hero-content flex-col lg:flex-row-reverse lg:justify-around w-full">
          <div className=' w-60 h-60 relative'>
            <Image src={Pokemon1} alt='Pokemon 1' width={200} height={300} className=' absolute -bottom-8 -right-10 z-30' />
            <Image src={Pokemon2} alt='Pokemon 2' width={200} height={300} className=' absolute z-10 right-4' />
            <Image src={Pokemon3} alt='Pokemon 3' width={200} height={300} className=' absolute -top-20 -left-10' />
          </div>
          <div className=' max-w-xl'>
            <h1 className="text-5xl font-black text-center lg:text-left mt-9 lg:mt-0">All the Pokémon data you'll ever need in one place!</h1>
            <p className="py-6 text-center lg:text-left">Thousands of data compiled into one place</p>
            <button className="btn btn-primary mx-auto lg:mx-0 w-full lg:w-fit text-white py-1">Check PokèDex</button>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className='w-full flex flex-col items-stretch justify-start gap-4 bg-primary p-12'>
        <div className='text-center font-black text-2xl'>PokèDex</div>
        <div className='max-w-sm mx-auto text-center'>All Generation</div>
        <div className='max-w-sm mx-auto text-center -mt-4'>totaling 999999 Pokemon</div>

        <div className='flex flex-row items-stretch justify-between flex-wrap max-w-3xl mx-auto mt-12'>
          {array.map((items, index) =>
              <Card key={index} />
          )}
        </div>

        <div className='mt-8 text-sm'>
          <div className='flex flex-row items-center justify-between gap-8 max-w-5xl mx-auto'>
            <div className='flex flex-row items-center justify-start font-semibold gap-4'>
              <div className='text-white whitespace-nowrap'>Per Page:</div>
              <select className="select select-bordered bg-transparent border-white border-2 text-white">
                <option value={9} selected>9</option>
                <option value={8}>8</option>
                <option value={7}>7</option>
                <option value={6}>6</option>
                <option value={5}>5</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
              </select>
            </div>

            <div className="btn-group text-white">
              <button className="btn bg-transparent border-white text-white">1</button>
              <button className="btn bg-transparent border-white text-white">2</button>
              <button className="btn btn-disabled bg-transparent text-white">...</button>
              <button className="btn bg-transparent border-white text-white">99</button>
              <button className="btn bg-transparent border-white text-white">100</button>
            </div>

            <div className='text-white font-semibold'>Per Page: 912398</div>
          </div>
        </div>
      </div>

    </Layout>
  )
}
