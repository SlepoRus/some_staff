import React from 'react';
import './Search.less';
import PropTypes from 'prop-types'
import { User, Info, Loader } from '../'
import { connect } from 'react-redux';
import { userDelete } from '../../../redux/actions/user'

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  static childContextTypes = {
    handleRepo: PropTypes.func,
    handleUser: PropTypes.func,
    history: PropTypes.object,
    user: PropTypes.object,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired
  };

   getChildContext = () => {
    const { handleRepo, handleUser, props} = this,
          { user } = props;

    return {
      handleRepo, handleUser, user
    };
  }



  handleUser = (user) => {
    const { history } = this.context;
    history.push(`/${user.login}`)
  }

  handleRepo = (repo) => {
    const { history } = this.context;
    const url = repo.full_name || ''
    history.push(`/${url}`)
  }

  handleDelete = () => {
    const { history } = this.context;
    this.props.dispatch(userDelete());
    history.push(`/`)

  }


  render() {
    const { errors, loading, children, user } = this.props;
    let user_profile = user.login ? (
        <div className='user-field'>
          <User {...user} width="25px"/>
          <img onClick={this.handleDelete} src={"http://4geo.ru/images/personal-pages-share/458762857/webflow/images/%D0%98%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0_%D0%BA%D1%80%D0%B5%D1%81%D1%82%D0%B8%D0%BA%D0%B0_ei.svg.png"} width="25px" />
        </div> ) : null;
        
    return (
      <div className="search">
        {user_profile}
        <Info error={errors} />
        <div className="search-main">
            {children}
        </div>
        <Loader loading={loading} />
      </div>
    )
  }
}

Search.propTypes = {
  errors: PropTypes.any,
  loading: PropTypes.bool,
  user: PropTypes.any,
}
Search.defaultProps = {
  errors: null,
  loading: false,
}

function mapToStateProps(state, props) {
  const { user, repo, issues, board } = state,
        errors = user.errors || repo.errors || issues.errors || board.errors || null,
        loading = user.loading || repo.loading || issues.loading || board.loading || false,
        _user = user.user || {}
  return { errors, loading, user:_user };
}

export default connect(mapToStateProps)(Search);
