import PropTypes from 'prop-types';
import React from 'react';
import './DropDown.less';
import NavLink from 'react-router-dom/NavLink';

const DropDown = ({ data, onClick }) => {
  if (!data.length) return null;
  let list = data.map((val,key) => {
    return (
        <div key={key} className="dropdown-item">
          <NavLink to={`/${val.owner.login}/${val.name}`} onClick={() => onClick(val.name)}>{val.name}</NavLink>
        </div>
      )
    }
  )
  return (
    <div className='dropdown'>
      <div>
         {list}
      </div>
    </div>
  )

}
DropDown.propTypes = {
  children: PropTypes.array,
  onClick: PropTypes.func.isRequired,
}

export default DropDown;
