export default function Card() {
  return (
    <div className="p-2">
      <div className="card bg-base-100 hover:shadow-md cursor-pointer 
    w-full transition-all duration-500 ease-in-out hover:-translate-y-1 
    lg:max-w-[200px] max-w-none">
        <figure className="px-3 pt-10">
          <img src="https://placeimg.com/400/225/arch" alt="img" className="h-44 object-cover" />
        </figure>
        <div className="text-gray-400 px-3 font-bold mt-2">#002</div>
        <div className="card-body items-start p-4 pt-2">
          <h2 className="card-title text-2xl font-black">Poke Name</h2>
          <div className="flex flex-row items-center justify-start gap-2 flex-wrap">
            <div className=" px-4 py-0.5 bg-orange-500 text-white rounded-full text-center text-xs font-bold">
              Type 1
            </div><div className=" px-4 py-0.5 bg-emerald-500 text-white rounded-full text-center text-xs">
              Type 2
            </div><div className=" px-4 py-0.5 bg-blue-500 text-white rounded-full text-center text-xs">
              Type 3
            </div><div className=" px-4 py-0.5 bg-orange-300 text-white rounded-full text-center text-xs">
              Type 4
            </div>
          </div>
          {/* <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div> */}
        </div>
      </div>
    </div>
  )
}