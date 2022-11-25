import Image from "next/image"
import { useEffect, useState } from "react"
import Layout from "../components/layout"
import Paginator from "../components/paginator"
import TypePills from "../components/type-pills"
import { getDetail, Pokemon } from "../util/api"

interface Type {
    name: string
    url: string
}

export default function PokemonType() {
    const [listTypes, setListTypes] = useState<any[]>([])
    const [selectedType, setSelectedType] = useState<Type>({ name: '', url: '' })
    const [pokemons, setPokemons] = useState<any[]>([])

    const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([])

    const [limit, setLimit] = useState<number>(9)
    const [currentPage, setCurrentPage] = useState<number>(1)

    // GET ALL TYPES
    useEffect(() => {
        getDetail('https://pokeapi.co/api/v2/type').then((result: any) => {
            setSelectedType(result.results[0])
            setListTypes(result.results)
        })
    }, [])

    // GET POKEMON LIST BASED ON THE TYPE
    useEffect(() => {
        if (selectedType.url) {
            getDetail(selectedType.url).then((result: any) => {
                setPokemons(result.pokemon)
            })
        }
    }, [selectedType])

    // GET DISPLAYED POKEMON
    useEffect(() => {
        if (pokemons.length > 0) {
            const displayed = pokemons.slice(0, limit)
            getDisplayedPokemons(displayed)
        }
    }, [pokemons])

    // GET POKEMON TO DISPLAY EVERYTIME PAGE or LIMIT CHANGED
    useEffect(() => {
        if (pokemons.length > 0) {
            const bottomValue = (currentPage * limit) - limit
            const topValue = (limit * currentPage) >= pokemons.length ? pokemons.length : (limit * currentPage)

            const displayed = pokemons.slice(bottomValue, topValue)
            console.log('displayed', displayed)
            console.log('bottom value: top value', bottomValue, topValue)
            getDisplayedPokemons(displayed)

        }
    }, [currentPage, limit])

    const getDisplayedPokemons = async (pokemons: any[]) => {
        let temp: any[] = []
        for await (let poke of pokemons) {
            const result = await getDetail(poke.pokemon.url)
            temp.push(result)
        }
        setDisplayedPokemons(temp)
    }

    // SELECT POKEMON TYPE
    const selectType = (type: Type) => {
        setCurrentPage(1)
        setSelectedType(type)
    }

    return (
        <Layout>

            <div className="flex flex-row items-stretch justify-start w-full mx-auto gap-2 mt-4 font-black">
                <div className="flex flex-col items-center justify-start w-full max-w-xs mr-8 border-r">
                    <div className="font-black text-lg">Pokemon Type</div>
                    <ul className=" list-disc">
                        {listTypes.map((item: Type, index: number) => (
                            <li key={index} className={`capitalize ${selectedType === item ? 'font-black text-accent-blue' : ''} cursor-pointer pr-8 mt-2`} onClick={() => selectType(item)}>{item.name}</li>
                        ))}
                    </ul>
                </div>

                <div className=" flex-auto lg:min-w-[400px]">
                    <div className=" text-4xl font-black">Pokemon with Type <span className=" capitalize">{selectedType.name}</span></div>

                    <div className="flex flex-col items-stretch justify-start gap-4 divide-y w-full rounded-3xl shadow-lg bg-white/50 py-4 px-8 mt-8">
                        {displayedPokemons.length > 0 && displayedPokemons.map((item, index) => (
                            <div key={index} className="flex flex-row items-stretch justify-start gap-8">
                                {item.sprites.front_default && <Image src={item.sprites.front_default} loader={() => item.sprites.front_default} alt={item.name + ' front'} width={150} height={150} />}
                                <div className="font-black text-2xl text-center my-auto">#{item.id}</div>
                                <div className="font-black text-2xl text-center my-auto">{item.name}</div>

                                <div className="flex flex-row item-center justify-center my-auto gap-2">
                                    {item.types.map((item, index) => (
                                        <TypePills type={item.type.name} index={index}></TypePills>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {pokemons.length > 0 && (
                            <Paginator
                                totalItems={pokemons.length}
                                limit={limit}
                                color='green'
                                currentPage={currentPage}
                                pageChanged={(page: number) => { setCurrentPage(page) }}
                                limitChanged={(limit: number) => { setLimit(limit) }}
                            />
                        )}

                    </div>

                </div>
            </div>

        </Layout>
    )
}