import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import RedditIcon from '@material-ui/icons/Reddit';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { blockWidget, unblockWidget } from '../redux/actions';

function SocialBar({ size }, props) {
  const dispatch = useDispatch();
  const widgets = useSelector(state => state.addresses.widgets);

  function handleClick(e) {
    e.preventDefault();
    const { id } = e.target;
    const toBeBlocked = widgets.find(item => Object.keys(item).includes(id));

    if (toBeBlocked[id]) {
      dispatch(unblockWidget(toBeBlocked, id));
    } else {
      dispatch(blockWidget(toBeBlocked, id));
    }
  }

  const [fb, lin, ttr, igm, red, all] = widgets;

  return (
    <>
      <div onClick={handleClick} id="fb">
        <FacebookIcon
          style={{
            fontSize: size,
            color: fb.fb || all ? 'red' : 'white',
            pointerEvents: 'none'
          }}
        />
      </div>
      <div onClick={handleClick} id="lin">
        <LinkedInIcon
          style={{
            fontSize: size,
            color: lin.lin || all ? 'red' : 'white',
            pointerEvents: 'none'
          }}
        />
      </div>
      <div onClick={handleClick} id="ttr" name="linkedin.com">
        <TwitterIcon
          style={{
            fontSize: size,
            color: ttr.ttr || all ? 'red' : 'white',
            pointerEvents: 'none'
          }}
        />
      </div>
      <div onClick={handleClick} id="igm" name="instagram.com">
        <InstagramIcon
          style={{
            fontSize: size,
            color: igm.igm || all ? '#f4511e' : 'white',
            pointerEvents: 'none'
          }}
        />
      </div>
      <div onClick={handleClick} id="red" name="reddit.com">
        <RedditIcon
          style={{
            fontSize: size,
            color: red.red || all ? '#f4511e' : 'white',
            pointerEvents: 'none'
          }}
        />
      </div>
    </>
  );
}

export default SocialBar;
