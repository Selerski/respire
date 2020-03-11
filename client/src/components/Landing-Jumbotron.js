import React from 'react';
import './Landing-Jumbotron.css';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

function LandingJumbotron(props) {
  return (
    <>
      <div className="jumbotron-container">
        <h1>Respire</h1>
        <p className="slogan-1">
          Filter your distractions at a press of a button...
          <PlayArrowIcon />
        </p>
        <hr className="line"></hr>
        <p className="slogan-2">
          ... or do it manually!
          <ArrowDownwardIcon />
        </p>
      </div>
    </>
  );
}

export default LandingJumbotron;
