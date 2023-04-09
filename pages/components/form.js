import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected } from "./interact.js";
import { pinJSONToIPFS } from "./pinata.js";
import { db, storage } from "../firebase/firebase.ts";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { v4 } from "uuid";

const form = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [host, setHost] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [typeOfTicket, setTypeOfTicket] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    const { address, status } = getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const toFirebase = async (eventName, description, host, price, date, typeOfTicket, location, startTime, endTime, daysRemaining) => {
    //error handling

    if (eventName.trim() == "" || description.trim() == "") {
      return {
        success: false,
        status: "❗Please make sure all fields are completed before minting.",
      };
    }

    // const 
    //make metadata
    const metadata = new Object();
    metadata.eventName = eventName;
    metadata.description = description;
    metadata.host = host
    metadata.price = price;
    metadata.date = date;
    metadata.location = location;
    metadata.typeOfTicket = typeOfTicket
    metadata.startTime = startTime
    metadata.endTime = endTime
    metadata.daysRemaining = daysRemaining
    

    const ticketInfo = collection(db, "ticketInfo");
    addDoc(ticketInfo, {
      eventName: eventName,
      description: description,
      host: host,
      price: price,
      date: date,
      typeOfTicket: typeOfTicket,
      startTime: startTime,
      location: location,
      endTime: endTime,
      daysRemaining: daysRemaining,
      address: (await getCurrentWalletConnected()).address,
    });

    return {
      success: true,
      status:
        "✅Event Added!",
    };
  };


  const onSubmit = async () => {

    const { success, status } = await toFirebase(
      eventName, description, host, price, date, typeOfTicket, location, startTime, endTime, daysRemaining
    );
    setStatus(status);
    if (success) {
      setEventName("");
      setDescription("");
      setHost("")
      setPrice(0);
    }

    // console.log(url);
  };


  const renderInputForm = () => {
		return(
          <div className="flex flex-col items-center justify-center text-2xl">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:white dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-gray">
          <h1 id="title" className="text-2xl font-bold mt-1">
            List your Event!
          </h1>

          <form className="space-y-4 md:space-y-6 ">
            <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-800 pt-1">
              {" "}
              Name of the Event:{" "}
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              type="text"
              placeholder="e.g. My first NFT!"
              onChange={(event) => setEventName(event.target.value)}  
              required
            />
            <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-800 pt-1">
              {" "}
              Description:{" "}
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              type="text"
              placeholder="e.g. Even cooler than cryptokitties ;)"
              onChange={(event) => setDescription(event.target.value)}
              required
            />
            <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-800 pt-1">
              {" "}
              Host:{" "}
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              type="text"
              placeholder="Enter Host"
              onChange={(event) => setHost(event.target.value)}
              required
            />
            <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-800 pt-1">
              {" "}
              Type of Ticket:{" "}
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              onChange={(event) => setTypeOfTicket(event.target.value)}
              required
            >
              <option value="" hidden>--Select an option--</option>
              <option value="VIP">VIP</option>
              <option value="General">General</option>
            </select>
            <label
              className="block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-800 pt-1"
              required
            >
              {" "}
              Price :{" "}
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              type="number"
              placeholder="Enter Price"
              onChange={(event) => setPrice(event.target.value)}
              required
            />
            <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-800 pt-1">
              {" "}
              Date Of Event:{" "}
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              type="date"
              placeholder="e.g. Even cooler than cryptokitties ;)"
              onChange={(event) => setDate(event.target.value)}
              required
            />
            <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-800 pt-1">
              {" "}
              Days Remaining:{" "}
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              type="number"
              placeholder="e.g. Even cooler than cryptokitties ;)"
              onChange={(event) => setDaysRemaining(event.target.value)}
              required
            />
            <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-800 pt-1">
              {" "}
              Event Location:{" "}
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              type="text"
              placeholder="e.g. 123 Main St, Anytown USA"
              onChange={(event) => setLocation(event.target.value)}
              required
            />
            <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-800 pt-1">
              {" "}
              Start Time:{" "}
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              type="time"
              placeholder=""
              onChange={(event) => setStartTime(event.target.value)}
              required
            />
             <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-800 pt-1">
              {" "}
              End Time:{" "}
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              type="time"
              placeholder=""
              onChange={(event) => setEndTime(event.target.value)}
              required
            />
            
          

          </form>
          <button
            id="mintButton"
            onClick={onSubmit}
            className="text-white text-2xl bg-black cursor-pointer border-black hover:bg-white border-solid border hover:drop-shadow-2xl hover:bg-[#CAC7FF] hover:text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add
          </button>
          <p id="status" className="text-red-500 mt-4">
            {status}
          </p>
        </div>
      </div>
    </div>
      )
  }  
    
    
    
  return (
    <>
      <div class="flex flex-col items-center justify-center">
     <button id="walletButton" onClick={connectWalletPressed} class="text-white text-2xl bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
       {String(walletAddress).length > 0 ? (
         "Connected: " +
         String(walletAddress).substring(0, 6) +
         "..." +
         String(walletAddress).substring(38)
       ) : (
         <span>Connect Wallet</span>
       )}
     </button>
  
     <br></br>
     {walletAddress && renderInputForm()}
  </div>
    </>
    
  
  );
};

export default form;












































