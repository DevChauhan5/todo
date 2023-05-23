"use client"

import { useState } from 'react';
import Web3 from 'web3';

function ConnectWallet() {
    const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  // Function to connect the wallet
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        const provider = new Web3(window.ethereum);
        setWeb3(provider);
        setAccount(accounts[0]);
      } else {
        console.error('No wallet detected');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to disconnect the wallet
  const disconnectWallet = () => {
    setWeb3(null);
    setAccount(null);
  };
  return (
    <div>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
          <button onClick={disconnectWallet} className='bg-blue-500 rounded-md p-2 m-2 text-white'>Disconnect Wallet</button>
        </div>
      ) : (
        <button className='bg-blue-500 rounded-md p-2 m-2 text-white' onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  )
}

export default ConnectWallet