import { useState } from 'react';
import Web3 from 'web3';

function NotConnected({connectWallet}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-16 h-16 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <h1 className="text-2xl font-semibold mt-4">Connect your wallet</h1>
      <p className="text-gray-500 text-center mt-2">
        Connect your wallet to start using the Todo app
      </p>
      <button
        onClick={connectWallet}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 rounded focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-400"
      >
        Connect Wallet
      </button>
    </div>
  )
}

export default NotConnected