import React from 'react';
import './Landing-Jumbotron.css';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

function LandingJumbotron(props) {
  return (
    <>
      <div className="jumbotron-container">
        <h1>Respire</h1>
        <p className="slogan-1">
          Filter out your distractions at a press of a button!
        </p>
        <hr className="line"></hr>
        <p className="slogan-2">
          Respire utilises a proxy filter to ensure you have a productive day.
        </p>
        <Button
        style={{ height: '56px', width: "fit-content", backgroundColor:"white", color:"#311b92" }}
        variant="contained"
        startIcon={<PlayArrowIcon />}
      >
        Begin
      </Button>
      </div>
    </>
  );
}

export default LandingJumbotron;
