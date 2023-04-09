    import React from 'react'
    import Image from 'next/image'
    import { useRouter } from 'next/router'

    const Navbar = () => {

        const router = useRouter();
        const redirect = () =>{
            router.push('login')
        }
    return (
        <div className='pt-2 bg-black'>
        <div className=' bg-black mx-10 rounded-[1rem] mt-3'>
        <div className='flex flex-row items-center justify-between px-5'>
            <div className=" flex flex-row justify-center">
                <img src="https://gateway.pinata.cloud/ipfs/QmZpzEBsTiRoBijdB3mSAywtLosRSjhym3CyiVn6miktNa" className='w-10 h-10'/>
                <h1 className="text-3xl ml-2 mt-1 text-white font-semibold">PolyTix</h1>
            </div>
            <div className='grid grid-cols-3 justify-around font-semibold items-center'>
                <a href="#" className='cursor-pointer text-white text-2xl mx-5 hover:text-[#C754A7] transform transition duration-300 ease out pl-11'>Home</a>
                <a href="../verify" className='cursor-pointer text-white text-2xl mx-5 hover:text-[#C754A7] transform transition duration-300 ease out pr-11'>Verify Ticket</a>
                <button onClick={redirect} className='text-white bg-gradient-to-r text-2xl from-rose-400 via-fuchsia-500 to-indigo-500 px-10 py-4 shadow-xl rounded-full font-bold my-3 border-2 border-[#fff] hover:bg-white hover:text-black active:scale-90 transition duration-150'>Login</button>
            </div>

        </div>
        </div>
        </div>
    )
    }

    export default Navbar