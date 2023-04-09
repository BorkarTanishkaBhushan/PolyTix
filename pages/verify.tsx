import React, { useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import Head from "next/head";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase/firebase";

export default function Verify() {
  const [address, setAddress] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const [showNft, setShowNft] = useState<boolean>(false);
  const [item, setItem] = useState<any>({});
  const [toggle, setToggle] = useState<boolean>(false);
  const [time, setTime] = useState<any>([]);

  const config = {
    apiKey: "3OGlmNKSI58c0xfNbKDSTGZYRUwv86Jm",
    network: Network.MATIC_MUMBAI,
  };
  const alchemy = new Alchemy(config);

  const handleClick = async () => {
    if (toggle) {
      location.reload();
    }
    console.log(address);
    // Get all NFTs
    const nfts = await alchemy.nft.getNftsForOwner(address);
    console.log(nfts);
    setShowNft(true);

    //Print NFTs
    for (let i = 0; i < nfts.totalCount; i++) {
        const metadata = nfts.ownedNfts[i].rawMetadata;
        if (
          metadata?.description === "Event ticket" &&
          metadata?.image?.startsWith("data:image/svg+xml;base64,")
        ) {
          data.push({
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
    console.log(data);

  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setAddress(e.currentTarget.value);
    //console.log(address)
  };

  async function getData(item: any) {
    const uri = item.tokenUri;
    console.log(uri);
    const issuedTicketsCollectionRef = collection(db, "issuedTickets");
    const q = query(issuedTicketsCollectionRef, where("tokenUri", "==", uri));
    const querySnapshot = await getDocs(q);
    await querySnapshot.forEach((doc) => {
      time.push(doc.data()["redeemTime"]);
      time.join("")
    });
    // const newtime = time + " ";
    // setTime(newtime);
    setTime(time);
    setToggle(true);
  }

  async function changeStatus(item: any) {
    const issuedTicketsCollectionRef = collection(db, "issuedTickets");
    // const q = query(
    //   issuedTicketsCollectionRef,
    //   where("tokenUri", "==", item.tokenUri)
    // );

    // const querySnapshot = await getDocs(q);
    // const docRef = doc(db, "issuedTickets", querySnapshot.docs[0].id);
    // await updateDoc(docRef, {
    //   pending: false,
    // });
  }

  return (
    <>
      <Head>
        <title>PolyTix | Verify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="my-12 border-2 pt-8 w-2/6 rounded-3xl mx-auto bg-white border-[#16194F] border-solid border-2">
        <div className="flex flex-row justify-center mx-auto font-bold text-xl">
          Verify Your NFT
        </div>
        <input
          className="flex flex-row justify-center w-4/6 px-2 p-2.5 mt-10 mx-auto border-2 rounded-lg bg-[#CAC7FF] text-[#16194F]"
          placeholder="Wallet Address"
          type="text"
          onChange={handleChange}
        />
        <div className="flex w-full justify-center py-10">
          <input
            className="font-semibold bg-black rounded-full py-4 px-8 text-white text-xl mr-2 mb-2 my-5 border-black border-solid border-2 hover:bg-white hover:text-black hover:cursor-pointer"
            type="submit"
            onClick={handleClick}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-8 p-12">
        {!toggle &&
          data.map(
            (
              item: {
                Id: number;
                name: string;
                image: string;
                description: string;
                price: string;
              },
              i: React.Key
            ) => (
              <div key={item.Id}>
                <div
                  className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 h-full"
                  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    setItem(item);
                    getData(item);
                  }}
                >
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
        {toggle && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#16194F] bg-opacity-50 z-50">
          <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-3/5 h-4/5 overflow-y-auto">
            <div className="w-6/12 my-4 ml-8">
              <img src={item.image} className="w-full rounded-2xl" />
              <p className="text-[#16194F] text-opacity-80 mt-4 text-xl font-bold">Name:</p>
              <h2 className="text-2xl text-[#16194F] font-bold">{item.name}</h2>
              <p className="text-[#16194F] text-opacity-80 mt-4 text-xl font-bold">Description:</p>
              <p className="text-2xl text-[#16194F] font-bold">{item.description}</p>
              <p className="text-[#16194F] text-opacity-80 mt-4 text-xl font-bold">Price:</p>
              <p><span className="text-2xl text-[#16194F] font-bold">{item.price}</span></p>
            </div>
            <div className="w-6/12 mr-8 ml-8 my-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded absolute top-10 right-10"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  setToggle(false);
                  setTime([]);
                }}
              >
                X
              </button>
              
            </div>
          </div>
        </div>
        
        
        
        )}
      </div>
    </>
  );
}
