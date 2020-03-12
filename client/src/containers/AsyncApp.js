import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddressList from "./AddressList";
import SocialBar from "../components/Social-Bar";
import LandingJumbotron from "../components/Landing-Jumbotron";
import { fetchIfNeeded } from "../redux/actions";
import { useInterval } from "../hooks/useInterval";

import "../components/Social-Bar.css";
import "./AsyncApp.css";

function AsyncApp() {
  const dispatch = useDispatch();
  const addresses = useSelector(state => state.addresses);

  useEffect(() => {
    dispatch(fetchIfNeeded());
  }, [dispatch]);

  useInterval(() => {
    dispatch(fetchIfNeeded());
  }, 60000);

  return (
    <>
      <div id="mySidepanel">
        <SocialBar size={40} />
      </div>
      <LandingJumbotron />
      <AddressList addresses={addresses.addresses} />
    </>
  );
}
export default AsyncApp;
