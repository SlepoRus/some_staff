import React from 'react';
import PropTypes from 'prop-types';
import './Views.less'
const Views = ({limit, onClick}) => {
  const data = [
    {
      limit:20,
      name: "limit",
    },
    {
      limit:50,
      name: "limit",
    },
    {
      limit:100,
      name: "limit",
    }
  ]

  return (
    <div className={'views-main'}>
      Views :  {data.map((val,key) => (
        <span key={key}>
          <input  type="radio" name={val.name} defaultChecked={limit === val.limit}/>
          <label><span className={limit === val.limit ? "checked" : null} onClick={()=>onClick({ limit:val.limit })}></span>{val.limit}</label>
        </span>
        )
      )}
    </div>
  )
}
Views.propTypes = {
  limit: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}
export default Views;
