import React, { useEffect } from 'react';
import AddressList from './AddressList';
import SocialBar from '../components/Social-Bar';
import { fetchAddresses } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import '../components/Social-Bar.css';


function AsyncApp(props) {
  console.log(props)
  const dispatch = useDispatch();
  const addresses = useSelector(state => state.addresses);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, []);

  return (
    <>
      <div
        id="mySidepanel"
        style={{
          backgroundColor: '#d1c4e9',
          width: 'fit-content',
          padding: '4px 30px 4px 5px',

          opacity: '0.9'
        }}
      >
        <SocialBar
          size={40}
          style={{
            display: 'flex',
            width: 'fit-content',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      </div>
      <AddressList
        addresses={addresses.addresses}
      />
    </>
  );
}
export default AsyncApp;
