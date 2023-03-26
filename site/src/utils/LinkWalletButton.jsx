import React from 'react';
import { useWallet, WalletProvider } from './WalletContext';

const LinkWalletButton = ({ className }) => {
  const { account, linkWallet, disconnectWallet, existingweb3 } = useWallet();

  const buttonText = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : 'Connect Wallet';

  const set_span = account ? (
    <span className="tracking-normal text-white group-hover:text-gray-800 ease-in ml-1">
      {buttonText}
    </span>
  ) : (
    <span className="tracking-normal text-white group-hover:text-gray-800 group-hover:translate-x-0.5 transition-transform duration-150 ml-1">
      {buttonText}
    </span>
  );

  const handleClick = () => {
    if (account) {
      disconnectWallet();
    } else {
      linkWallet();
    }
  }

  return (
    <div className="group">
      <button onClick={handleClick} className={className}>
        {set_span}
      </button>
    </div>
  );
};

export default LinkWalletButton;
