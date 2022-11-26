import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Card from '../components/card'
// import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import Modal from '../components/modal'
import Paginator from '../components/paginator'
import { getDetail, getPokemons, Pokemon } from '../util/api'

import Pokemon1 from '/public/image/pokemon-1.png'
import Pokemon2 from '/public/image/pokemon-2.png'
import Pokemon3 from '/public/image/pokemon-3.png'

export default function Home() {
  const [pokemons, setPokemons] = useState<any>([])
  const [selectedPokemon, setSelectedPokemons] = useState<any>(null)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(9)

  const [totalPokemon, setTotalPokemon] = useState<number>(0)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    getPokemons()
  }, [limit, currentPage])

  const getPokemons = () => {
    setIsLoading(true)
    getDetail(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${((currentPage * limit) - limit)}`).then((resp: any) => {
      setTotalPokemon(resp.count)
      getDisplayedPokemons(resp.results)
    })
  }

  // fetch each detail of pokemon
  const getDisplayedPokemons = async (pokemons: any[]) => {
    let temp: any[] = []
    for await (let poke of pokemons) {
      const result = await getDetail(poke.url)
      temp.push(result)
    }
    setPokemons(temp)
    setIsLoading(false)
  }


  return (
    <Layout>
      {/* HERO */}
      <div className="hero min-h-screen bg-white">
        <div className="hero-content flex-col lg:flex-row-reverse lg:justify-around w-full">
          <div className=' w-60 h-60 relative'>
            <Image unoptimized src={Pokemon1} alt='Pokemon 1' width={200} height={300} className=' absolute -bottom-8 -right-10 z-30' />
            <Image unoptimized src={Pokemon2} alt='Pokemon 2' width={200} height={300} className=' absolute z-10 right-4' />
            <Image unoptimized src={Pokemon3} alt='Pokemon 3' width={200} height={300} className=' absolute -top-20 -left-10' />
          </div>
          <div className=' max-w-xl'>
            <h1 className="text-5xl font-black text-center lg:text-left mt-9 lg:mt-0">All the Pokémon data you'll ever need in one place!</h1>
            <p className="py-6 text-center lg:text-left">Thousands of data compiled into one place</p>
            <a className="btn btn-primary mx-auto lg:mx-0 w-full lg:w-fit text-white py-1" href='#pokedex'>Check PokèDex</a>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className='w-full flex flex-col items-stretch justify-start gap-4 bg-primary p-12 relative overflow-hidden' id="pokedex">
        {/* DECORATION CIRCLE */}
        <div className={`z-0 w-96 h-96 absolute -top-40 -left-40 rounded-full border border-[80px] border-white/40 flex flex-col items-center justify-center`}></div>
        <div className={`z-0 w-96 h-96 absolute -bottom-40 -right-52 rounded-full border border-[80px] border-white/40 flex flex-col items-center justify-center`}></div>
        
        <div className='text-center font-black text-2xl z-10'>PokèDex</div>
        <div className='max-w-sm mx-auto text-center z-10'>All Generation</div>
        <div className='max-w-sm mx-auto text-center -mt-4 z-10'>totaling {totalPokemon} Pokemon</div>

        <div className='flex flex-row items-stretch justify-center flex-wrap max-w-3xl mx-auto mt-12'>
          {pokemons.length > 0 && pokemons.map((items: Pokemon, index: number) =>
            <Card key={index} modalId='pokemon-modal' id={index} data={items} onClick={(poke: any) => setSelectedPokemons(poke)} />
          )}
        </div>

        {totalPokemon > 0 &&
          <Paginator
            disabled={isLoading}
            currentPage={currentPage}
            limit={limit}
            pageChanged={(page: number) => setCurrentPage(page)}
            limitChanged={(limit: number) => { setCurrentPage(1); setLimit(limit) }}
            totalItems={totalPokemon}
            color='white'
          />
        }

        {selectedPokemon &&
          <Modal data={selectedPokemon}></Modal>
        }

      </div>

    </Layout>
  )
}
