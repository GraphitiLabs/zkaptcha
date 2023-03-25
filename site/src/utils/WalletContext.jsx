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

  const linkWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        console.log(`Connected to account: ${accounts[0]}`);
        setAccount(accounts[0]);
        // Perform any further actions with the user's wallet account
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Web3 provider not found');
    }
  };

  return (
    <WalletContext.Provider value={{ account, linkWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
