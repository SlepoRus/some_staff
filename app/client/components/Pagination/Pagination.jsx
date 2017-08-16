import './Pagination.less'
import React from 'react';
const Pagination = ({ count, page, total_count, onClick, max }) => {
  let pages = Math.ceil(total_count/count);
  let list = [], i = page > 6 ? page-5 : 1;
  const TOTAL_MAX_PAGES = max + i;
  while (i <= pages && i <= TOTAL_MAX_PAGES) {
    list.push({ number: i, active: page == i ? true : false });
    i++;
  }
  let result = list.map((val,key) => (
      <span key={key} className={val.active ? 'active' : null} onClick={!val.active ? ()=>onClick({ page:val.number }) : null}>
        {val.number}
      </span>
    )
  )
  return (
    <div className={'pages-list'}>
      {result}
    </div>
  )
}

export default Pagination;
