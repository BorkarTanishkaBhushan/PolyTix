import  Head  from "next/head";
import { useState } from "react";
import { Dialog } from '@headlessui/react'
import Wallet from './components/wallet'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'  
import { getAuth } from "firebase/auth"; 

export default function addProduct() {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
const [nftId, setNftId] = useState<string>("")
const [ownerAddress, setOwnerAddress] = useState<string>("")

// const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

// const auth = getAuth();  

function generateProof(nftId, ownerAddress, privateKey) {
    // TODO: Get the public key for the owner address
  
    // Generate a random nonce
    const nonce = generateRandomNonce();
  
    // Compute the hash of the nonce and the NFT ID
    const hash = hash(nonce, nftId);
  
    // Sign the hash using the private key
    const signature = sign(hash, privateKey);
  
    // TODO: Use the owner public key, the nonce, and the signature to generate a proof of ownership
  
    // Return the proof
    return proof;
  }

  // Define a function to verify a proof of ownership of an NFT
function verifyProof(nftId, proof) {
    // TODO: Get the public key for the owner address
  
    // Compute the hash of the nonce and the NFT ID
    const hash = hash(proof.nonce, nftId);
  
    // Verify the signature using the public key
    const isValidSignature = verifySignature(hash, proof.signature, ownerPublicKey);
  
    // Verify the proof using the public key and the nonce
    const isValidProof = verifyProofOfOwnership(nftId, ownerPublicKey, proof.nonce, proof.proof);
  
    // Return true if the proof is valid, false otherwise
    return isValidSignature && isValidProof;
  }

    return(
        <>
    <Head>
        <title>PolyTix | Prove</title>
        <link rel="icon" href="/favicon.ico"/>
    </Head>

        <div className="px-6 pt-6 pb-20 lg:px-8">
        
        <div>
            <nav className="flex h-9 items-center justify-between text-xl font-bold" aria-label="Global">
            <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                <a href="" className="text-2xl">Host</a>
            </div>
            <div className="flex lg:hidden">
                <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
                >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end bottom-0">              
            <div className='pl-0 pr-0 grid grid-cols-4 gap-4'>
            <div className="flex items-center">
                <a href="/listedEvents" className="">Listed Events</a>
            </div>

            <div className="flex items-center">
                <a href="/listedEvents" className="">Add Events</a>
            </div>
                <div className="flex items-center"> <Wallet/> </div>
                
                <div>
                <button
                    onClick={() => auth.signOut()}
                    className="text-white text-2xl font-bold bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5"
                    >
                    Sign Out
                    </button>
                </div>
                </div>
                
            </div>
            </nav>
            <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <Dialog.Panel  className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                <div className="flex h-9 items-center justify-between">
                <div className="flex">
                    <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    </a>
                </div>
                <div className="flex">
                    <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                    >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                </div>
                <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                    
                    <div className="py-6">
                    <div>
                    <button
                    // onClick={() => auth.signOut()}
                    className="text-white text-xl font-bold bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5"
                    >
                    Sign Out
                    </button>
                    </div>
                    <Wallet/>
                    </div>
                </div>
                </div>
            </Dialog.Panel>
            </Dialog>
        </div>
        </div>       
        
        <form className="max-w-md mx-auto p-4 bg-white rounded-md shadow-lg">
            <div className="mb-4">
                <label className="block text-gray-700 text-xl font-bold mb-2" for="name">
                NFT Id:
                </label>
                <input className="border border-gray-400 p-2 w-full rounded-md" id="name" type="text" placeholder="45" onChange={(event) => setNftId(event.target.value)}  
                required/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-xl font-bold mb-2" for="email">
                Owner Address:
                </label>
                <input className="border border-gray-400 p-2 w-full rounded-md" id="name" type="text" placeholder="0xF7e2E1A7803cfce61877d254B94DB71F748a6c45" onChange={(event) => setOwnerAddress(event.target.value)}  
                required/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-xl font-bold mb-2" for="email">
                Privatekey:
                </label>
                <input className="border border-gray-400 p-2 w-full rounded-md" id="name" type="text" placeholder="0xF7e2E1A7803cfce61877d254B94DB71F748a6c45" onChange={(event) => setOwnerAddress(event.target.value)}  
                required/>
            </div>
            <button onClick={() => generateProof(nftId, ownerAddress, privateKey)} class="font-semibold bg-black rounded-full py-4 px-8 text-white mr-2 mb-2 my-5 border-black border-solid border-2 hover:bg-white hover:text-black hover:cursor-pointer" type="submit">
                Submit
            </button>
        </form>

        
        </>
    )
}
