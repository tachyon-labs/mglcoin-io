import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function ExternalWallet() {
  const [walletAddress, setWalletAddress] = useState('');
  const [MetaMaskAvailable, setMetaMaskAvailable] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      setMetaMaskAvailable(true);
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setWalletAddress('');
        } else {
          setWalletAddress(accounts[0]);
        }
      });
    }
  }
  , []);

  const connectWalletHandler = async () => {
    if (!walletAddress && window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else if (walletAddress) {
      setWalletAddress('');
    } 
  };

  if (!MetaMaskAvailable) {
    return (
      <div>
        <p className='mx-6 my-6 font-bold'>Please install MetaMask!</p>
      </div>
    );
  }

  return (
    <div>
      <button className="mx-6 my-3 myButton  myBule text-white px-5 text-sm" onClick={connectWalletHandler}>
        {walletAddress ? 'Disconnect' : 'Connect Wallet'}
      </button>
      {walletAddress && <p className='mx-6'>Connected Address: {walletAddress}</p>}
    </div>
  );
}

export default ExternalWallet;
