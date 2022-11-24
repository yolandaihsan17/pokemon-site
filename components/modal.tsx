
import React from 'react'
import Pokemon1 from '/public/image/pokemon-1.png'
import Image from 'next/image'

interface ModalProps {
  id?: string,
  actionClicked?: Function,
}

export default function Modal(props: ModalProps) {
  const { id = 'pokemon-modal' } = props
  return (
    <React.Fragment>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-full max-w-5xl">
          <label htmlFor="pokemon-modal" className="btn btn-sm btn-circle absolute right-2 top-2 bg-transparent border-none font-black">✕</label>
          <div className="w-full flex flex-row items-start justify-center gap-8 flex-wrap mt-12">
            <Image src={Pokemon1} alt='Pokemon 1' width={400} height={400} className='shrink-0' />
            <div className='flex flex-col items-start justify-start gap-4 flex-auto max-w-xl'>
              {/* NAME */}
              <div className=' font-black text-4xl mt-2'>Pokemon Name</div>

              {/* PHYSICAL */}
              <div className='flex flex-row items-start justify-between gap-8 text-md mt-8 text-lg'>
                <div className='font-bold'>Weight: <span className='font-thin ml-4'>9999</span></div>
                <div className='font-bold'>height: <span className='font-thin ml-4'>9999</span></div>
              </div>

              {/* ABILITIES */}
              <div className='flex flex-row items-start justify-between gap-8 text-md text-lg'>
                <div className='font-bold'>Abilities:</div>
                <ul className='flex flex-col items-start justify-start gap-2 list-disc'>
                  <li>Abilities1</li>
                  <li>Abilities2</li>
                  <li>Abilities3</li>
                </ul>
              </div>

              {/* TYPE */}
              <div className='flex flex-row items-center justify-between gap-8 text-lg'>
                <div className='font-bold'>Type: </div>
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
              </div>

              {/* BUTTON */}
              <button className="btn btn-secondary btn-sm text-sm text-white capitalize mt-4 w-full lg:w-fit">More Detail</button>

            </div>
          </div>
          {/* <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
          <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p> */}
        </div>
      </div>
    </React.Fragment>
  )
}