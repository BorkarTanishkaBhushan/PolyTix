import React from 'react'

const Features = () => {
  return (
    <div className='bg-black'>
        <div className='justify-center mx-10'>
        <div className='text-white text-6xl text-center'>
            <p className="font-4xl font-semibold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-green-300 to-purple-400 animate-text" data-taos-offset="300">Features</p>
        </div>

        <div className='mt-20'>
            <div className='grid grid-cols-3 ml-5'>

                <div className='flex flex-row mb-10 h-48'>
                    <img src='/images/polygon.jpg' className='w-1/2 object-cover rounded-xl'/>
                    <p className='text-white font-main tracking-[1.5px] px-5 mx-auto my-auto overflow-hidden'>A website which requires no blockchain knowledge to use the system.</p>
                </div>
                <div className='flex flex-row mb-10'>
                    <img src='/images/polygon.jpg' className='w-1/2 object-cover rounded-xl'/>
                    <p className='text-white font-main tracking-[1.5px] px-5 mx-auto my-auto overflow-hidden'>Generate NFT based tickets which cannot be duplicated</p>
                </div>
                <div className='flex flex-row mb-10'>
                    <img src='/images/polygon.jpg' className='w-1/2 object-cover rounded-xl'/>
                    <p className='text-white font-main tracking-[1.5px] px-5 mx-auto my-auto overflow-hidden'>Once the warranty of the event is over then the NFT is burned ie the trace of that NFT is no longer found</p>
                </div>
                <div className='flex flex-row mb-10 h-48'>
                    <img src='/images/polygon.jpg' className='w-1/2 object-cover rounded-xl'/>
                    <p className='text-white font-main tracking-[1.5px] px-5 mx-auto my-auto overflow-hidden'>The track of all the events listed by the host is maintained properly</p>
                </div>
                <div className='flex flex-row mb-10'>
                    <img src='/images/polygon.jpg' className='w-1/2 object-cover rounded-xl'/>
                    <p className='text-white font-main tracking-[1.5px] px-5 mx-auto my-auto overflow-hidden'>The track of all the tickets bought by the attendee is also maintained properly</p>
                </div>
                <div className='flex flex-row mb-10'>
                    <img src='/images/polygon.jpg' className='w-1/2 object-cover rounded-xl'/>
                    <p className='text-white font-main tracking-[1.5px] px-5 mx-auto my-auto overflow-hidden'>Also facilitates end to end payments using cryptocurrency</p>
                </div>

            </div>
        </div>
        </div>
    </div>

  )
}

export default Features