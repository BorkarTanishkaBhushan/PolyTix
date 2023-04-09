import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Wallet from "./components/wallet";
import React from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { getAuth } from "firebase/auth";
import { auth, db } from "./firebase/firebase";
import {
addDoc,
arrayUnion,
collection,
doc,
getDocs,
query,
updateDoc,
where,
} from "firebase/firestore";
import { truncate } from "fs/promises";

export const OwnedProducts = () => {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// const [address, setAddress] = useState<string>("");
const [prodData, setprodData] = useState<any>([]);
const [showProdNft, setShowProdNft] = useState<boolean>(false);
const [currentAccount, setCurrentAccount] = useState("");
const [uriArray, setUriArray] = useState<any>([]);
const [time, setTime] = useState<any>([]);
const [docRefId, setDocRefId] = useState<any>([]);
const [status, setStatus] = useState<boolean>(false);
const config = {
    apiKey: "3OGlmNKSI58c0xfNbKDSTGZYRUwv86Jm",
    network: Network.MATIC_MUMBAI,
};
const alchemy = new Alchemy(config);

useEffect(() => {
    checkIfWalletIsConnected();
}, [currentAccount]);

const checkIfWalletIsConnected = async () => {
    try {
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
        console.log("Make sure you have a metamask wallet!");
        return;
    } else {
        console.log("We have the ethereum object", ethereum);
    }

    //checking whether we are authorized to access the user's wallet
    const accounts = await ethereum.request({ method: "eth_accounts" });
    //searching for authorized wallets
    if (accounts.length !== 0) {
        //if the user's wallet contains multiple accounts then choose the second one
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setCurrentAccount(account);
    } else {
        console.log("No authorized account found");
    }
    //  }
    } catch (error) {
    console.log(error);
    }
};

const handleClick = async () => {
    console.log(currentAccount);
    // Get all NFTs
    const nfts = await alchemy.nft.getNftsForOwner(currentAccount);
    console.log(nfts);
    setShowProdNft(true);
    // let re = /Buildspace/gi;

    // Print NFTs
    for (let i = 0; i < nfts.totalCount; i++) {
        const metadata = nfts.ownedNfts[i].rawMetadata;
        if (
          metadata?.description === "Event ticket" &&
          metadata?.image?.startsWith("data:image/svg+xml;base64,")
        ) {
          prodData.push({
            name: metadata?.name,
            description: metadata?.description,
            image: metadata?.image,
            price: metadata?.price,
            // tokenUri: nfts.ownedNfts[i].tokenUri?.raw,
          });
        } else {
          console.log("No available Nft");
        }
      }
    console.log(prodData);
    console.log(nfts.ownedNfts);
};


return (
    <>
    <Head>
        <title>NFT project | User's Owned Products</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="px-6 pt-6 pb-20 lg:px-8">

    <div>
        <nav
        className="flex h-9 items-center justify-between text-xl font-bold"
        aria-label="Global"
        >
        <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
            <h1 className="text-2xl">User</h1>
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
            <div className="pl-0 pr-0 grid grid-cols-3 gap-4">
            <div className="flex items-center">
                <a href="/attendee" className="">Browse</a>
            </div>
            <div className="flex items-center">
                {" "}
                <Wallet />{" "}
            </div>
            <div>
                <button
                onClick={() => auth.signOut()}
                className="text-white text-xl font-bold bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5"
                >
                Sign Out
                </button>
            </div>
            </div>
        </div>
        </nav>
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
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
                <a
                    href="/ownedProducts"
                    className="6-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                >
                    Owned Products
                </a>
                <div>
                <button
                onClick={() => auth.signOut()}
                className="text-white text-xl font-bold bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5"
                >
                Sign Out
                </button>
                </div>
                <Wallet />
                </div>
            </div>
            </div>
        </Dialog.Panel>
        </Dialog>
    </div>
    </div>

    <div className="flex flex-col text-2xl m-4">
    {!showProdNft && (
        <button
        onClick={handleClick}
        className="text-white w-1/6 text-xl font-bold bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5"
        >
        Show
        </button>
    )}
    <div className="grid grid-cols-4 gap-8 p-12">
        {showProdNft &&
        prodData.map(
            (
            item: {
                Id: number;
                name: string;
                image: string;
                description: string;
                price: string;
                timeCreated: string;
                tokenUri: string;
            },
            i: React.Key
            ) => (
            <div key={item.Id}>
                <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 h-full">
                <img className="p-8 rounded-t-lg" src={item.image} />
                <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {item.name}
                    </h5>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {item.description}
                    </p>
                    
                </div>
                </div>
            </div>
            )
        )}
    </div>
    </div>
    </>
);
};

export default OwnedProducts;
