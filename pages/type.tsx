import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Layout from "../components/layout"
import Paginator from "../components/paginator"
import TypePills from "../components/type-pills"
import { getDetail, Pokemon } from "../util/api"
import { useRouter } from "next/router";
import { getTypeColor } from "../util/other"
interface Type {
    name: string
    url: string
}


export default function PokemonType() {
    let router = useRouter()
    let { name = '' } = router.query
    const [listTypes, setListTypes] = useState<any[]>([])
    const [selectedType, setSelectedType] = useState<Type>({ name: '', url: '' })

    const pokemons = useRef<any[]>([])

    const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([])

    const [limit, setLimit] = useState<number>(9)
    const [currentPage, setCurrentPage] = useState<number>(1)

    const [circleColor, setCircleColor] = useState<string>('border-accent-red')

    useEffect(() => {
        initialFetch()
    }, [router.isReady])

    const initialFetch = () => {
        getDetail('https://pokeapi.co/api/v2/type').then((result: any) => {
            let type = null
            
            if (name) type = result.results.filter((item: any) => item.name === name)[0]
            else type = result.results[0]

            setSelectedType(type)
            setListTypes(result.results)

            fetchTypeDetails(type.url).then((result: any) => {
                pokemons.current = result
                slicePokemon()
            })
        })
    }

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

    // Get which pokemons are going to be displayed
    const slicePokemon = () => {
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
        window.history.replaceState(null, '', '/type')

        fetchTypeDetails(type.url).then((result: any) => {
            pokemons.current = result
            setCurrentPage(1)
            setSelectedType(type)
        })
    }

    // get pokemon everytime page and type changed
    useEffect(() => {
        slicePokemon()
        getColor(selectedType.name)
    }, [currentPage, selectedType])

    // if change limit, then set current page back to 1
    useEffect(() => {
        setCurrentPage(1)
    }, [limit])

    // action when a pokemon card is clicked
    const pokemonClicked = (pokemon: Pokemon) => {
        router.push(`/pokemon/${pokemon.id}`)
    }

    const getColor = (type: string) => {
        const color = getTypeColor(type)
        if (color === 'blue') setCircleColor('border-blue-500')
        else if (color === 'red') setCircleColor('border-red-500')
        else if (color === 'yellow') setCircleColor('border-yellow-500')
        else setCircleColor('border-violet-500')
    }

    return (
        <Layout>
            <div className="flex flex-row items-stretch justify-start w-full mx-auto gap-2 mt-4 relative">
                {/* LIST OF TYPES */}
                <div className="flex flex-col items-start justify-start w-full max-w-xs mr-8 border-r z-20 h-fit backdrop-blur">
                    <div className="font-black text-lg ml-8">Pokemon Type</div>
                    <ul className=" list-disc ml-12">
                        {listTypes.map((item: Type, index: number) => (
                            <li key={index} className={`capitalize transition-all duration-300 ease-in-out ${selectedType === item ? ' text-lg font-black text-accent-blue' : ''} cursor-pointer pr-8 mt-2`} onClick={() => selectType(item)}>{item.name}</li>
                        ))}
                    </ul>
                </div>

                {/* POKEMON ROWS  */}
                <div className=" flex-auto lg:min-w-[400px] z-20 mb-12">
                    <div className=" text-4xl font-black">Pokemon with Type <span className=" capitalize">{selectedType.name}</span></div>

                    <div className="flex flex-col items-stretch justify-start gap-4 divide-y w-full max-w-5xl rounded-[40px] shadow-lg bg-white/50 py-4 px-8 mt-8">

                        {/* POKEMON CARDS */}
                        {displayedPokemons.length > 0 && displayedPokemons.map((item: Pokemon, index) => (
                            <div key={index} className="flex flex-row items-stretch justify-start gap-8 cursor-pointer" onClick={() => pokemonClicked(item)}>
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
                        {/* END OF POKEMON CARDS */}

                        {/* PAGINATOR */}
                        {pokemons.current.length > 0 && (
                            <Paginator
                                totalItems={pokemons.current.length}
                                limit={limit}
                                color='blue'
                                currentPage={currentPage}
                                pageChanged={(page: number) => { setCurrentPage(page) }}
                                limitChanged={(limit: number) => { setLimit(limit) }}
                            />
                        )}
                    </div>
                </div>

                {/* DECORATION CIRCLE */}
                <div className={`z-0 w-[440px] h-[440px] absolute top-0 -right-40 rounded-full border border-[100px] ${circleColor} flex flex-col items-center justify-center`}></div>
                <div className={`z-0 w-[440px] h-[440px] absolute bottom-40 -left-52 rounded-full border border-[100px] ${circleColor} flex flex-col items-center justify-center`}></div>

            </div>

        </Layout>
    )
}