import React, {useEffect, useState} from 'react';
import useInterval from 'use-interval';
import{ getAddresses, blockAddress, unblockAddress, timeBlockAddress } from './clientAPI';
import './App.css';

const secondsToHms = (seconds) => {
  seconds = Number(seconds/1000);
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function App() {

  const [addresses, setAddresses] = useState([]);
  const [showBlocked, setShowBlocked] = useState(false);

  useEffect(() => {
    getAddresses().then(fetchedAddresses => {
      setAddresses(fetchedAddresses)
      console.log(fetchedAddresses)
    })
  }, [])


  const toggleShowBlock = (e) => {
    setShowBlocked(e.target.value === 'true' ? true : false);
  }

  const unblock = async (id) => {
    const newAddress = await unblockAddress(id);
    return updateAddress(newAddress);
  }

  const block = async (id) => {
    const newAddress = await blockAddress(id);
    return updateAddress(newAddress);
  }

  const timeblock = async (id, time) => {
    const newAddress = await timeBlockAddress(id, time);
    return updateAddress(newAddress);
  }

  const updateAddress = (newAddress) => {
    setAddresses(addresses => addresses.map((addr,k) => newAddress._id == addr._id ? newAddress : addr));
  }

  const functions = {block, unblock, timeblock};


  return (
    <div className = 'App'>
      <div className='Header'>
        <h1>RESPIRE APP MINIMUM FRONT</h1>
        <select className='Header' value={showBlocked} onChange={toggleShowBlock}>
          <option value="false"> Show me the WhiteList </option>
          <option value="true">Show me the BlackList</option>
        </select>
      </div>
      
      <div className='Lists Containers'> 
      {!showBlocked 
         ? (<NotBlockedList 
         addressList = {addresses.filter(addr => addr.blockedStatus === 'notBlocked')}
         status = 'notBlocked' functions={functions}
         />)
         : <BlockedList 
         addressList = {addresses.filter(addr => addr.blockedStatus !== 'notBlocked')}
         status = 'notBlocked' functions={functions}
         />}
      </div>
    </div>
  );
}

function BlockedList ({addressList, status, functions}) {
  const [locked, setLocked] = useState(false);
  const [endDate, setEndDate] = useState(0);
  const [durationInSec, setdurationInSec] = useState(3600*1000);
  const [timeRemaining, setTimeRemaining] = useState(0);
  useInterval(() => {
    setTimeRemaining(endDate - Date.now())
  },1000)

  useEffect ( () => {
    let endDate = localStorage.getItem('endDate')
    if (endDate > Date.now()) {
      setEndDate(endDate);
      setTimeRemaining(endDate - Date.now());
      setLocked(true);
    }
  }, [])

  const onChangeForm = (e) => {
    setdurationInSec(Number(e.target.value)*1000);
  }
  const lock = () => {
    const endDate = Date.now() + durationInSec
    localStorage.setItem('endDate', endDate);
    setLocked(true);
    setEndDate(endDate);
  }
  return (
    <div className = {`NotBlockedList`} >
      {locked
        ? 
        <div>
          <p className = 'ListHeader'> YOU CANT UNBLOCK FOR {secondsToHms(timeRemaining)} </p>
          <p className = 'ListHeader2'> TELL YOURSELF ITS GOOD :) 👨‍⚕ </p>
        </div>
        
        : 
        <div>
          <p className = 'ListHeader'> Those are the domains you blocked: BE STRONG</p>
          <button className = 'LockForm' onClick ={lock}> Lock Yourself Out :)</button> 
          <select className = 'LockForm' value={durationInSec/1000} onChange={onChangeForm}>
            <option value="60"> 1 min </option>
            <option value="3600">1 hour</option>
            <option value="86400">1 day</option>
            <option value="604800">1 week</option>
            <option value="2419000">4 weeks</option>
          </select>
        </div>
      } 
      
      {addressList.map(addr => (
        <div>
          <BlockedAddress address={addr} locked={locked} functions = {functions}/>
        </div>
      )
      )}
    </div>
  
  )
}
function NotBlockedList ({addressList, status, functions}) {
  return (
    <div className = {`BlockedList`} >
      <p className = 'ListHeader2'> Domains you visited :) Are you sure they help you be happy? :) :) :)</p>
      {addressList.map(addr => (
        <div>
          <Address address={addr} functions = {functions}/>
          
        </div>
      )
      )}
    </div>
  
  )
}

function Address ({address, functions}) {
  const [durationInSec, setdurationInSec] = useState(3600000);
  const [hover, setHover] = useState(false);
  const onChangeForm = (e) => {
    setdurationInSec(e.target.value*1000);
  }
  const toggleHover = (e) => {
    setHover(hover => !hover);
  }
  const [show, setShow] = useState(false);
  function toggleDetails() {
    setShow(show => !show);
  }
  return (
    <div className ='Address' onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      <p>{address.domain}</p>
      
      {hover 
        ? 
        <div><select className='BlockSelect' value={durationInSec/1000} onChange={onChangeForm}>
          <option value="60"> 1 min </option>
          <option value="3600">1 hour</option>
          <option value="86400">1 day</option>
          <option value="604800">1 week</option>
          <option value="2419000">4 weeks</option>
        </select>
        <button className='BlockButton' onClick =  {() => functions.timeblock(address._id, durationInSec)}>{`BLOCK`}</button>
        <div>
          { show
            ? <div> 
                {<button className='Details' onClick={toggleDetails}> {'less details'}</button>}
                <p className='SubdomainTitle'> Subdomains:</p>
                {address.subdomains.map( subd=> subd.name ? <p className='Subdomain'>{subd.name}</p> : <p>www.</p>)}
                {<button className='Details' onClick={toggleDetails}> {'less details'}</button>}
              </div>
            : <button className='Details' onClick={toggleDetails}> {'details'}</button>
          }   
        </div>
        </div>
        : <div></div> 
      }          
    </div>
  )
}

function BlockedAddress ({address, functions, locked}) {
  const [show, setShow] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(Date.parse(address.blockedDate)-Date.now()+address.blockedTimePeriod);
  function toggleDetails() {
    setShow(show => !show);
  }

  useInterval(() => {
    setTimeRemaining(Date.parse(address.blockedDate)- Date.now() + address.blockedTimePeriod)
  },1000)

  return (
    <div className ='Address'>
      <p>{address.domain}</p>
  <p>{`time remaining: ${secondsToHms(timeRemaining)}`}</p>
      { show
        ? <div> 
            {<button className='Details' onClick={toggleDetails}> {'less details'}</button>}
            {address.subdomains.map( subd=> subd.name ? <p>{subd.name}</p> : <p>www.</p>)}
            {<button className='Details' onClick={toggleDetails}> {'less details'}</button>}
          </div>
       
       : <button onClick={toggleDetails}> {'details'}</button>
      }
      {locked
        ? <button className='UnblockImpossible' onClick =  {() => alert('CHEAAAATERR 🦊')}>UNBLOCK (YOU WISH) 🙉🙈🙊</button>
        : <button className='Details' onClick =  {() => functions.unblock(address._id)}>UNBLOCK 😞</button>
      }
    </div>
  )
}

export default App;
