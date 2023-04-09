import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

interface Props {
    networks: { [key: string]: string };
}

const Wallet: React.FC = ({}) => {
    const [currentAccount, setCurrentAccount] = useState('');
    // const [network, setNetwork] = React.useState<string | null>(null);

    const checkIfWalletIsConnected = async () => {
		try{
			const ethereum = (window as any).ethereum;
			if (!ethereum) {
				console.log("Make sure you have a metamask wallet!");
				return;
			}
			else {
				console.log("We have the ethereum object", ethereum);
			}

			//checking whether we are authorized to access the user's wallet
			const accounts = await ethereum.request({ method: "eth_accounts" });
			//searching for authorized wallets
			if(accounts.lenght !== 0)
			//if the user's wallet contains multiple accounts then choose the second one
			{
				const account = accounts[0];
				console.log("Found an authorized account: ", account);
				setCurrentAccount(account);
			}
			else {
				console.log("No authorized account found")
			}

  		}
			
		catch (error) {
			console.log(error);
		}
 	}

	
	const connectWallet = async () => {
		try{
            const ethereum = (window as any).ethereum;
			if(!ethereum){
				// alert("Get Metamask!")
				toast.error("Get Metamask!-> https://metamask.io/", 
                {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				return;
			}
			const accounts = await ethereum.request({ method: "eth_requestAccounts"});
			console.log("Connected", accounts[0]);
			toast.success("Connected")
			setCurrentAccount(accounts[0]);
		}
		catch(error){
			console.log(error)
		}
	}
    const renderNotConnectedContainer = () => (  
		<button onClick={connectWallet} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
        	Connect Wallet <ToastContainer/>
      	</button>
    	
	);

    React.useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
		<>
        
		{ currentAccount ? (
			<div className="flex items-center justify-center text-center mr-4 text-xl font-bold">
				<img alt="Network logo" className="mr-2 w-9 h-8" src="https://gateway.pinata.cloud/ipfs/QmRRe8q52CPtWCJ2yUXuMants2zGFrLAwLRLpa8cGnKcqK"/>
				<p>{currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</p>
			</div>
			) : (
			<p className="text-center "> </p>
		)}
		
        {!currentAccount && renderNotConnectedContainer()}    
        <ToastContainer />
    
		</>   
    );
}

export default Wallet;