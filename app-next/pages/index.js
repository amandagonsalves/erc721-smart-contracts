import Web3 from 'web3';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import counterArtifact from '../../smart-contracts/build/contracts/Counter.json';

export default function Home() {
  const [counter, setCounter] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const web3 = new Web3('https://localhost:8545/');
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const networkAddress = await web3.eth.networks[networkId].address;

      setContract(new web3.eth.Contract(counterArtifact.abi, networkAddress, {
        from: accounts[0]
      }))

      console.log('accounts', accounts, networkId, networkAddress)
    }

    setup();
  }, []);

  useEffect(() => {
    const setCounterItem = async () => {
      if (contract) {
        setCounter(await contract.methods.getCounter().call());
      }
    }

    setCounterItem();
  }, [contract]);

  const increment = async () => {
    if (contract) {
      await contract.methods.increment().send();

      setCounter(await contract.methods.getCounter().call());
    }
  }

  return (
    <div className={styles.container}>
      <button onClick={increment}>increment</button>
      <p>{counter}</p>
    </div>
  )
}
