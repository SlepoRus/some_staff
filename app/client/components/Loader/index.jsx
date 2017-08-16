import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({loading}) => {
  if (loading) return <img src="https://d13yacurqjgara.cloudfront.net/users/82092/screenshots/1073359/spinner.gif" width="150px"/>
  else return null;
}
Loader.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default Loader;
