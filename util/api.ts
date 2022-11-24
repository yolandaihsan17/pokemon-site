import axios from "axios"

export async function getAPI(endpoint: string) {
  const baseUrl = 'https://pokeapi.co/api/v2/'
  const finalUrl = baseUrl + endpoint

  return new Promise((resolve, reject) => {
    axios.get(finalUrl).then((response) => {
      console.log(response.data)
    }).catch(error => {
      reject({})
    })
  })
}

export async function getPokemonDetail() {


  // response.data.results.forEach(async (pokemon: { name: string, url: string }) => {
  //   const result = await getPokemonDetail(pokemon.url)
  //   pokemons.push(result)
  //   console.log('setelah push 2', pokemons)
  // });

  // return new Promise((resolve, reject) => {
  //   axios.get(url).then((response) => {
  //     resolve(response.data)
  //   }).catch(error => {
  //     reject({})
  //   })
  // })
}

interface Pokemon {
  abilities: Array<Object>
  base_experience: number
  forms: Array<Object>
  game_indices: Array<Object>
  height: number
  held_items: Array<Object>
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Array<Object>
  name: string
  order: number
  past_types: Array<Object>
  species: Object
  sprites: Object
  stats: Array<Object>
  types: Array<Object>
  weight: number
}