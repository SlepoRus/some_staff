import React from 'react';
import SearchButton from './SearchButton';
import { DropDown } from '../';
import { github } from '../../api';
import { connect } from 'react-redux';
import { repoRequest } from '../../../redux/actions/repo';
import { userRequest } from '../../../redux/actions/user'

import PropTypes from 'prop-types'
import Router from 'react-router-dom/Route';

class SearchRepo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      items: [],
    }
  }
  handleChange = (e) => this.setState({ text: e.target.value });

  componentDidMount() {
    const { params } = this.props.match,
          { user, handleUser, _loadFromUrl } = this.context;

    if (!user.login) this.props.dispatch(userRequest(params.login, () => {}));
    
    github.repos(params).then((val) => {
      const { items } = val.data;
      this.setState({ items });
    }).catch((err) => {
      console.log(err);
    })

  }

  static contextTypes = {
    handleRepo: PropTypes.func.isRequired,
    handleUser: PropTypes.func.isRequired,
    _loadFromUrl: PropTypes.func,
    user: PropTypes.object.isRequired,
  };

  _apiRepo = (text) => {
    const { handleRepo, user } = this.context;
    this.props.dispatch(repoRequest(user, text, handleRepo));
    this.setState({ items: [] })
  }
  render() {

    const { text, items } = this.state,
          { placeholder, loading } = this.props;
    return (
      <div>
        <input type="text" value={text} onChange={this.handleChange} placeholder={'Search repos...'} disabled={loading} />
        <SearchButton onClick={this._apiRepo} text={text} disabled={loading}/>
        <Router exact path="/:login" component={() => (
          <DropDown data={items} onClick={this._apiRepo} />
        )}/>
      </div>
    )
  }
}
function mapToStateProps(state) {
  const { loading } = state.repo;

  return { loading }
}

SearchRepo.propTypes = {
  loading: PropTypes.any,
}

export default connect(mapToStateProps)(SearchRepo);
