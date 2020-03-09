import { connect } from 'react-redux';
import { unblockPage } from '../actions';
import AddressList from '../components/AddressList';
import { useEffect } from 'react';
import {fetchProducts} from '../actions'

const getVisibleList = (address, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return address;
    case 'SHOW_BLOCKED':
      return address.filter(t => t.blocked && t.timed);
    case 'SHOW_BLOCKED_INDEFINITE':
      return address.filter(t => t.blocked && !t.timed);
  }
};

function VisibleAddressList (props) {
  console.log(props)
  useEffect(() => {
    this.props.dispatch(fetchProducts());
  })
  return null;
}

const mapStateToProps = state => {
  return {
    addresses: getVisibleList(state.addresses, state.visibilityFilter)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddressClick: id => {
      dispatch(unblockPage(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VisibleAddressList);
