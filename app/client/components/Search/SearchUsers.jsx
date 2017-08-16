import React from 'react';
import PropTypes from 'prop-types'
import SearchButton from './SearchButton';
import { github } from '../../api';
import { connect } from 'react-redux';
import { userRequest } from '../../../redux/actions/user'

class SearchUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }

  _apiUser = (text) => {
     const { handleUser } = this.context;
     this.props.dispatch(userRequest(text, handleUser));
  }

  handleChange = (e) => {
    const text = e.target.value;
    this.setState({ text })
  }
  static contextTypes = {
    handleUser: PropTypes.func.isRequired
  };


  render() {

    const { text } = this.state;
    const { placeholder, loading } = this.props;
    return (
      <div>
        <input type="text" value={text} onChange={this.handleChange} placeholder={'Search users...'} disabled={loading}/>
        <SearchButton onClick={this._apiUser} text={text} disabled={loading}/>
      </div>
    )
  }
}
function mapToStateProps(state) {
  const { loading } = state.user;

  return { loading };
}
SearchUser.propTypes = {
  loading: PropTypes.any,
}
export default connect(mapToStateProps)(SearchUser);
