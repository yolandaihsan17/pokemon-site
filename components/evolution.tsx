import Image from 'next/image'

interface EvolutionProps {
    form_name: string;
    form_names: string[];
    form_order: number;
    id: number;
    is_battle_only: boolean;
    is_default: boolean
    is_mega: boolean
    name: string
    names: any[]
    order: number
    pokemon: any
    sprites: any
    types: any[]
    version_group: any[]
}

export default function Evolution(props: EvolutionProps) {
    const getColor = () => {
        if (props.form_order % 4 === 0) {
            return "border-accent-red"
        } else if (props.form_order % 3 === 0) {
            return "border-accent-orange"
        } else if (props.form_order % 2 === 0) {
            return "border-primary"
        } else {
            return "border-accent-green"
        } 
    }
    return (
        <div className="flex flex-col items-center justify-start gap-2">
            <Image src={props.sprites.front_default} loader={() => props.sprites.front_default} alt="Evolution picture" width={192} height={192} className={`rounded-full border border-[8px] ${getColor()} flex flex-col items-center justify-center p-4`} />
            <div className="text-center font-bold capitalize">{props.name}</div>
        </div>
    )
}