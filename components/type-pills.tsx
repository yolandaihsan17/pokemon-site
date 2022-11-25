import { PokemonType } from "../util/enums"

interface TypeProps {
    type: string
    index: number,
    size?: string
}

export default function TypePills(props: TypeProps) {
    const { type, index, size = 'small' } = props
    const pokeTypes = PokemonType
    return (
        <div key={index} className={`px-4 ${size === 'small' ? 'py-0.5 text-sm' : size === 'medium' ? 'text-base py-1' : 'text-xl py-1'} text-white rounded-full text-center font-bold capitalize 
      ${type === pokeTypes.WATER ? 'bg-accent-blue' :
                type === pokeTypes.FIRE ? 'bg-accent-red' :
                    type === pokeTypes.GRASS ? 'bg-accent-green' :
                        type === pokeTypes.POISON ? 'bg-violet-500' :
                            type === pokeTypes.FLYING ? 'bg-sky-500' :
                                'bg-accent-cream'}`}>
            {type}
        </div>
    )
}