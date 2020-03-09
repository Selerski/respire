import React from 'react';
import NavbarLink from '../containers/NavbarLink';
import { VisibilityFilters } from '../actions';

const Footer = () => (
  <p>
    Show: <NavbarLink filter={VisibilityFilters.SHOW_ALL}>All</NavbarLink>
    {', '}
    <NavbarLink filter={VisibilityFilters.SHOW_BLOCKED}>Time Blocked</NavbarLink>
    {', '}
    <NavbarLink filter={VisibilityFilters.SHOW_BLOCKED_INDEFINITE}>Permanently Blocked</NavbarLink>
  </p>
);

export default Footer;
