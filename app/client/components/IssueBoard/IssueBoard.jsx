import React from 'react';
import './IssueBoard.less';
import { github } from '../../api';
import PropTypes from 'prop-types';
import NavLink from 'react-router-dom/NavLink';
import { User } from '../';
import { boardRequest } from '../../../redux/actions/board';
import { connect } from 'react-redux';
class IssueBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { params } = this.props.match;
    this.props.dispatch(boardRequest(params));
  }

  render() {
      const { board } = this.props;
      let status;
      if (board.state === "open") status = "Open"
      if (board.state === "closed") status = "Closed"
      if (!board.state) return null
      return (
        <div className={'board-main'}>
          <div className={'board-head'}>
            <span> #{board.number} </span>
            <div className={'board-title'}>{ board.title }</div>
            <div className={'board-user'}>
              <User {...board.user} width="25px"/>
            </div>
          </div>
          <div className={'board-body'}>
            <code>{ board.body } </code>
            <div className={board.state === "open" ? 'board-open' : 'board-closed'}>
              <span>{status}</span>
            </div>
          </div>
        </div>
      )
  }
}

IssueBoard.propTypes = {
  board: PropTypes.any,
}
IssueBoard.defaultProps = {
  board: {},
}
function mapToStateProps(state) {
  const { board } = state.board;
  
  return { board };
}
export default connect(mapToStateProps)(IssueBoard)
