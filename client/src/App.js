import React, {useEffect, useState} from 'react';
import{ getAddresses, blockAddress, unblockAddress } from './clientAPI';
import ToggleButton from 'react-toggle-button';
import './App.css';

function App() {

  const [addresses, setAddresses] = useState([])
  const [showBlocked, setShowBlocked] = useState(true)

  useEffect(() => {
    getAddresses().then(fetchedAddresses => {
      setAddresses(fetchedAddresses)
      console.log(fetchedAddresses)
    })
  }, [])

  const toggleBlock = async (address) => {
    const index = addresses.indexOf(address);
    const new_address = address.blocked? await unblockAddress(address._id) : await blockAddress(address._id);
    setAddresses(addresses => addresses.map((addr,k) => addr == address ? new_address : addr));
  }

  return (
    <div className = 'App'>
      <header>Hey</header>
      <div className='Addresses'> 
        <div className = 'AddressTab'> Show: <ToggleButton activeLabel='OK' value={showBlocked} onToggle={x=> setShowBlocked(!x)} inactiveLabel ='X'/></div>
        <div className = 'list'>
          {addresses.map(addr => { if(!addr.blocked === showBlocked) return (<Address address={addr} toggleBlock={toggleBlock}/>)})}
        </div>
        
      </div>
    </div>
  );
}


function Address ({address, toggleBlock}) {

  const [show, setShow] = useState(false);
  function toggleDetails() {
    setShow(show => !show);
  }

  return (
    <div className ='Address'>
      <p>{address.domain}</p>
      {<button onClick={() => toggleBlock(address)}> {address.blocked? 'unblock':'block'}</button>}
      { show
        ? <div> 
            {<button onClick={toggleDetails}> {'less details'}</button>}
            {address.subdomains.map( subd=> subd.name ? <p>{subd.name}</p> : <p>www.</p>)}
            {<button onClick={toggleDetails}> {'less details'}</button>}
          </div>
        : <button onClick={toggleDetails}> {'details'}</button>
      }
    </div>
  )
}

export default App;
