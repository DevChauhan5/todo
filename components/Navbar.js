'use client'

const Navbar = ({ web3, account, connectWallet, disconnectWallet }) => {

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">Your App Name</div>
      {account ? (
        <button
          onClick={disconnectWallet}
          className="bg-white text-red-500 font-semibold py-2 px-4 border border-blue-500 rounded"
        >
          Disconnect Wallet
        </button>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-white text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded"
        >
          Connect Wallet
        </button>
      )}
    </nav>
  );
};

export default Navbar;
