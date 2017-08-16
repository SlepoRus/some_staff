import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ error }) => {
  if (error === null) return null
  let err = '',
      { status } = error.response || { status: undefined };
  if (status == 404 || status == 422)
  err = 'Results not found';
  if (status == 403)
  err = 'Limit is exceeded';

  return (
    <div className={'error-block'}> {err} </div>
  )
}
Info.propTypes = {
  error: PropTypes.any,
}

export default Info;
