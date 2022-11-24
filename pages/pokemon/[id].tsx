import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import Layout from "../../components/layout";
import { getPokemonDetail, Pokemon } from "../../util/api";
import TypePills from "../../components/type-pills";
import Image from "next/image";
import StatMeter from "../../components/stat-meter"
import Evolution from "../../components/evolution";

export default function Details() {
    const router = useRouter()
    const { id } = router.query
    const [pokemon, setPokemon] = useState<any>(null)
    const [images, setImages] = useState<any[]>([])
    const [evolution, setEvolution] = useState<any[]>([])
    const [selectedImage, setSelectedImage] = useState<string>('')

    useEffect(() => {
        if (id) {
            getPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response: any) => {
                setPokemon(response)
                setSelectedImage(response.sprites.front_default)
                if (response.forms.length > 0) getEvolution(response.forms)
            })
        }
    }, [id])

    // GET IMAGES
    useEffect(() => {
        if (pokemon) {
            let images = []
            if (pokemon.sprites.front_default) images.push(pokemon.sprites.front_default)
            if (pokemon.sprites.back_default) images.push(pokemon.sprites.back_default)
            if (pokemon.sprites.front_shiny) images.push(pokemon.sprites.front_shiny)
            if (pokemon.sprites.back_shiny) images.push(pokemon.sprites.back_shiny)
            setImages(images)
        }
    }, [pokemon])

    // GETTING DETAILS OF EACH EVOLUTION
    const getEvolution = async (forms: any) => {
        let evolution = []
        for await (let form of forms) {
            const response = await getPokemonDetail(form.url)
            evolution.push(response)
        }
        console.log('evolution', evolution)
        setEvolution(evolution)
    }

    return (
        <Layout>
            {!pokemon && <div>Please wait...</div>}
            {pokemon &&
                <div className="flex flex-col items-stretch justify-start gap-4 w-full max-w-5xl mx-auto px-4 pb-24">
                    <div className="w-full flex flex-row items-start justify-center gap-8 flex-wrap mt-12">
                        {selectedImage && <Image loader={() => selectedImage} src={selectedImage} alt='Pokemon Picture' width={400} height={400} className='shrink-0 object-fill scale-125 object-center' />}
                        <div className='flex flex-col items-start justify-start gap-4 flex-auto max-w-xl'>

                            {/* NAME */}
                            <div className=' font-black text-4xl mt-2 capitalize'>{pokemon.name}</div>

                            {/* PHYSICAL */}
                            <div className='flex flex-row items-start justify-between gap-8 text-md mt-8 text-lg'>
                                <div className='font-bold'>Weight: <span className='font-thin ml-4'>{pokemon.weight}</span></div>
                                <div className='font-bold'>Height: <span className='font-thin ml-4'>{pokemon.height}</span></div>
                            </div>

                            {/* ABILITIES */}
                            <div className='flex flex-row items-start justify-between gap-8 text-md text-lg'>
                                <div className='font-bold'>Abilities:</div>
                                <ul className='flex flex-col items-start justify-start gap-2 list-disc'>
                                    {pokemon.abilities.map((item: any, index: number) => (
                                        <li key={index}>{item.ability.name}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* TYPE */}
                            <div className='flex flex-row items-center justify-between gap-8 text-lg'>
                                <div className='font-bold'>Type: </div>
                                <div className="flex flex-row items-center justify-start gap-2 flex-wrap">
                                    {pokemon.types.map((item: any, index: number) => (
                                        <TypePills type={item.type.name} index={index} size='medium' />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* OTHER IMAGES */}
                    <div className="flex flex-col items-start justify-start gap-2 mt-8">
                        <div className="font-black text-xl">Other Images:</div>

                        <div className="flex flex-row items-start justify-start gap-4 flex-nowrap overflow-x-scroll">
                            {images.map((item, index) => (
                                <Image loader={() => item} src={item} alt={`Pokemon Picture ${index + 1}`} width={200} height={200} className={`shrink-0 cursor-pointer ${selectedImage === item ? 'border border-4 border-primary rounded-md shadow-md': ''}`} onClick={() => setSelectedImage(item)}/>
                            ))}
                        </div>
                    </div>

                    {/* STATS */}
                    <div className="flex flex-col items-start justify-start gap-2 mt-8">
                        <div className="font-black text-xl">Stats:</div>

                        <div className="flex flex-row items-start justify-between gap-4 flex-wrap mt-4 w-full">
                            {pokemon.stats.map((item: any, index: number) => (
                                <StatMeter number={item.base_stat} name={item.stat.name} />
                            ))}
                        </div>
                    </div>

                    {/* EVOLUTION */}
                    {evolution &&
                        <div className="flex flex-col items-start justify-start gap-2 mt-8">
                            <div className="font-black text-xl">Evolution:</div>

                            <div className="flex flex-row items-start justify-start gap-4 flex-wrap mt-4 w-full">
                                {evolution.map((item: any, index: number) => (
                                    <Evolution {...item} key={index} />
                                ))}
                            </div>
                        </div>
                    }
                </div>
            }

        </Layout>
    )
}