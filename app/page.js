"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Web3 from 'web3';
import Dashboard from './dashboard/page';

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

  // Function to disconnect the wallet
  const disconnectWallet = () => {
    setWeb3(null);
    setAccount(null);
  };
  const router = useRouter();
  return (
    <div>
      {account ? (
        router.push('/connewallet')
      ) : (
        router.push('/dashboard')
      )}
    </div>
  );
}

export default Home;
