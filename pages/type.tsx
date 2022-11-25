import Image from "next/image"
import { useEffect, useRef, useState } from "react"
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

    const pokemons = useRef<any[]>([])

    const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([])

    const [limit, setLimit] = useState<number>(9)
    const [currentPage, setCurrentPage] = useState<number>(1)

    // GET ALL TYPES
    useEffect(() => {
        initialFetch()
    }, [])

    const initialFetch = () => {
        getDetail('https://pokeapi.co/api/v2/type').then((result: any) => {
            setSelectedType(result.results[0])
            setListTypes(result.results)

            fetchTypeDetails(result.results[0].url).then((result: any) => {
                pokemons.current = result
                slicePokemon()
            })
        })
    }

    // GET POKEMON LIST BASED ON THE TYPE
    // useEffect(() => {
    //     if (selectedType.url) {
    //         getDetail(selectedType.url).then((result: any) => {
    //             setPokemons(result.pokemon)
    //         })
    //     }
    // }, [selectedType])

    const fetchTypeDetails = (url: string) => {
        return new Promise((resolve, reject) => {
            getDetail(url).then((result: any) => {
                // setPokemons(result.pokemon)
                resolve(result.pokemon)
            }).catch(() => {
                // setPokemons([])
                reject([])
            })
        })
    }

    // GET DISPLAYED POKEMON
    // useEffect(() => {
    //     if (pokemons.length > 0) {
    //         slicePokemon()
    //     }
    // }, [pokemons])

    // GET POKEMON TO DISPLAY EVERYTIME PAGE or LIMIT CHANGED
    // useEffect(() => {
    //     if (pokemons.length > 0) {
    //         slicePokemon()
    //     }
    // }, [currentPage, limit])


    const slicePokemon = () => {
        console.log('current page', currentPage)
        const bottomValue = (currentPage * limit) - limit
        const topValue = (limit * currentPage) >= pokemons.current.length ? pokemons.current.length : (limit * currentPage)

        const displayed = pokemons.current.slice(bottomValue, topValue)
        getDisplayedPokemons(displayed)
    }

    // fetch each detail of pokemon
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
        
        fetchTypeDetails(type.url).then((result: any) => {
            pokemons.current = result
            // slicePokemon()
            setCurrentPage(1)
        })

        // setCurrentPage(1)
        setSelectedType(type)
    }

    useEffect(() => {
        slicePokemon()
    }, [currentPage])

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
                                {item.sprites.front_default && <Image unoptimized src={item.sprites.front_default} loader={() => item.sprites.front_default} alt={item.name + ' front'} width={150} height={150} />}
                                <div className="font-black text-2xl text-center my-auto">#{item.id}</div>
                                <div className="font-black text-2xl text-center my-auto">{item.name}</div>

                                <div className="flex flex-row item-center justify-center my-auto gap-2">
                                    {item.types.map((item, index) => (
                                        <TypePills type={item.type.name} index={index}></TypePills>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {pokemons.current.length > 0 && (
                            <Paginator
                                totalItems={pokemons.current.length}
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