import { createContext, useContext, useState } from 'react';
import Web3 from 'web3';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [existingweb3, setWeb3] = useState(null);

  const linkWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        console.log(web3);
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        console.log(`Connected to account: ${accounts[0]}`);
        setAccount(accounts[0]);
        // // Perform any further actions with the user's wallet account
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Web3 provider not found');
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    // Perform any further actions needed to disconnect the user's wallet account
  };

  return (
    <WalletContext.Provider value={{ account, linkWallet, disconnectWallet, existingweb3 }}>
      {children}
    </WalletContext.Provider>
  );
};
