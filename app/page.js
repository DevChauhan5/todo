'use client'

import Dashboard from '@/components/Dashboard';
import { useState } from 'react';
import Web3 from 'web3';
import Navbar from '@/components/Navbar';

function Home() {
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

  return (
    <div>
      <Navbar
        web3={web3}
        account={account}
        connectWallet={connectWallet}
        disconnectWallet={() => {
          setWeb3(null);
          setAccount(null);
        }}
      />
      {account ? <h1>Connected</h1> : <h1>Not Connected</h1>}
    </div>
  );
}

export default Home;
