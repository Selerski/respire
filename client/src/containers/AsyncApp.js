import React, { useEffect } from 'react';
import AddressList from './AddressList';
import SocialBar from '../components/Social-Bar';
import { fetchAddresses } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import '../components/Social-Bar.css';
import LandingJumbotron from '../components/Landing-Jumbotron'
import './AsyncApp.css'

function AsyncApp() {

  const dispatch = useDispatch();
  const addresses = useSelector(state => state.addresses);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);
  

  return (
    <>
    
      <div 
        id="mySidepanel"
      >
        <SocialBar
          size={40}
        />
      </div>
      <LandingJumbotron/>
      <AddressList
        addresses={addresses.addresses}
      />
    </>
  );
}
export default AsyncApp;
