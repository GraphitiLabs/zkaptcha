import React, { useState } from 'react';
import Web3 from 'web3';

function SmartContractQuery() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState(null);
  const [outputColor, setOutputColor] = useState('black');

  // Function to handle the input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  // Function to handle the form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Connect to the blockchain using Web3
    const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_PROJECT_ID');

    // Load the smart contract
    const contractAddress = '0x123456789abcdef';
    const contractABI = [{ "constant": true, "inputs": [{ "name": "input", "type": "uint256" }], "name": "query", "outputs": [{ "name": "output", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Query the smart contract
    const inputValueBN = web3.utils.toBN(inputValue);
    const outputValueBN = await contract.methods.query(inputValueBN).call();
    const outputValueInt = parseInt(outputValueBN.toString(), 10);
    setOutputValue(outputValueInt);

    // Set the color of the output value based on its value
    if (outputValueInt < 50) {
      setOutputColor('red');
    } else {
      setOutputColor('green');
    }
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Input Value:
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {outputValue !== null &&
        <div style={{ color: outputColor }}>
          Output Value: {outputValue}
        </div>
      }
    </div>
  );
}

export default SmartContractQuery;