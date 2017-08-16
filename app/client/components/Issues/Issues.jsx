import React from 'react';
import './Issues.less';
import PropTypes from 'prop-types';
import Issue from './Issue';
import { github } from '../../api';
import { connect } from 'react-redux';
import { issueRequest } from '../../../redux/actions/issues';
import { Pagination, Views } from '../';

class Issues extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      full_name:'',
      result: false,
      visible: false,
    }
  }
  full_name = () => {
    const { params } = this.props.match,
          { login, repo } = params;
    return `${login}/${repo}`;
  }
  _apiIssues = (object={}) => {
    let full_name = this.full_name(),
        page = object.page || this.props.page,
        limit = object.limit || this.props.limit;
    this.setState({ visible: false })
    this.props.dispatch(issueRequest(full_name, page, limit, this.props.issues.total_count))
    this.setState({ full_name });
  }

  handleChange = (data) => {
    this.setState(data)
    this._apiIssues(data);
  }
  componentDidMount() {
    this._apiIssues({ page: 1, limit: 20 })
  }
  componentDidUpdate() {
    let full_name = this.full_name(),
        current_full_name = this.state.full_name;
    if (full_name !== current_full_name) {
      this._apiIssues({ page: 1, limit: 20 });
    }
  }
  render() {
    const { data, total_count } = this.props.issues,
          { limit, page } = this.props,
          { visible } = this.state;
          
    return (
      <div className={data.length ? 'issues-main visible' : 'issues-main'}>
        { total_count ? <Views limit={limit} onClick={this.handleChange} /> : null }
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Message</th>
              <th>Date open</th>
            </tr>
          </thead>
          <Issue data={data} repo={this.state.full_name}/>
        </table>
        { data.length ? <Pagination count={limit} page={page} max={10} total_count={total_count} onClick={this.handleChange} /> : null}
      </div>
    );
  }
}

function mapToStateProps(state) {
  const { page, limit, issues } = state.issues;

  return { page, limit, issues };
}

Issues.propTypes = {
  page: PropTypes.number,
  limit: PropTypes.number,
  issues: PropTypes.object,
}
Issues.defaultProps = {
  issues: {
    data: [],
    issues: [],
  },
  page: 1,
  limit: 20,
  total_count: 0,
}
export default connect(mapToStateProps)(Issues);
