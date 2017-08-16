import NavLink from 'react-router-dom/NavLink';
import React from 'react';
import { User } from '../'
const Issue = ({ data,repo }) =>  {
  let _tmp = data.map((val,key) => {
    let date = val.created_at.slice(0,10);
    return (
      <tr key={key}>
        <td>{val.number}</td>
        <td>
          <div className={'issue-title'}>
            <NavLink to={`/${repo}/issue/${val.number}`}>
              {val.title}
            </NavLink>
          </div>
          <div className={'issue-author'}>
            <User {...val.user} width="15px"/>
          </div>
        </td>
        <td>{date}</td>
      </tr>
    )
  })
  return (
      <tbody>
        {_tmp}
      </tbody>
  )
}

export default Issue;
