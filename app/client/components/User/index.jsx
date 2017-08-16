import React from 'react';

const User = ({ html_url, avatar_url, login , width}) => (
    <a href={html_url}>
      <img src={avatar_url} alt={login} width={width} />
      <span>{login}</span>
    </a>
)

export default User;
