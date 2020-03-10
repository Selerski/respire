import React, { useEffect } from 'react';
import AddressList from './AddressList';
import SocialBar from '../components/Social-Bar';
import { fetchAddresses } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import '../components/Social-Bar.css';
import InputForm from '../components/InputForm';
import LandingJumbotron from '../components/Landing-Jumbotron'

function AsyncApp(props) {
  const dispatch = useDispatch();
  const addresses = useSelector(state => state.addresses);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, []);

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
      <InputForm onSubmit={(formState)=> console.log(formState.value)}/>
      <AddressList
        addresses={addresses.addresses}
      />
    </>
  );
}
export default AsyncApp;
