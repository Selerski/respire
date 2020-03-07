import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import RedditIcon from '@material-ui/icons/Reddit';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import React, { useState } from 'react';

function SocialBar({ size, style }) {
  const [clicked, setClicked] = useState({
    fb: false,
    lin: false,
    ttr: false,
    igm: false,
    red: false,
    all: false
  });

  function handleClick(e) {
    e.preventDefault();
    const { id } = e.target;
    const clickedIcons = clicked;
    const bool = !clicked[id] ? true : false;

    if (id === 'all') {
      Object.keys(clickedIcons).forEach(key => {
        clickedIcons[key] = bool;
      });
    } else if (clicked.all) {
      clickedIcons[id] = clickedIcons.all = false;
    } else {
      clickedIcons[id] = bool;
    }
    setClicked({ ...clicked, ...clickedIcons });
  }

  const { fb, lin, ttr, igm, red, all } = clicked;

  return (
    <>  
        <div onClick={handleClick} id="fb">
          <FacebookIcon
            style={{
              fontSize: size,
              color: fb || all || fb ? 'red' : 'white',
              pointerEvents: 'none'
            }}
          />
        </div>
        <div onClick={handleClick} id="lin">
          <LinkedInIcon
            style={{
              fontSize: size,
              color: lin || all ? 'red' : 'white',
              pointerEvents: 'none'
            }}
          />
        </div>
        <div onClick={handleClick} id="ttr">
          <TwitterIcon
            style={{
              fontSize: size,
              color: ttr || all ? 'red' : 'white',
              pointerEvents: 'none'
            }}
          />
        </div>
        <div onClick={handleClick} id="igm">
          <InstagramIcon
            id="igm"
            style={{
              fontSize: size,
              color: igm || all ? '#f4511e' : 'white',
              pointerEvents: 'none'
            }}
          />
        </div>
        <div onClick={handleClick} id="red">
          <RedditIcon
            id="red"
            style={{
              fontSize: size,
              color: red || all ? '#f4511e' : 'white',
              pointerEvents: 'none'
            }}
          />
        </div>
        <hr style={{border: "1px solid #5e35b1"}}></hr>
        <div onClick={handleClick} id="all">
          <AllInclusiveIcon
            id="all"
            style={{
              fontSize: size,
              color: all ? '#f4511e' : 'white',
              pointerEvents: 'none'
            }}
          />
        </div>
      </>
  );
}

export default SocialBar;
