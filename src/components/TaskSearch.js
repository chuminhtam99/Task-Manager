import React, { useState } from 'react'

function TaskSearch(props){
  const [searchValue, changeValue] = useState('')

  function onChange(e){
    changeValue(e.target.value)
  }
  
  function onClick(){
    props.toSearch(searchValue)
  }


  return(
  <div className="output__search">
    <input onChange={onChange}
      className="output__search-input" type="text" placeholder="Nhập từ khóa" />
    <button onClick = {onClick}
      className="output__search-button">
      <i className="fas fa-search" />
      <span>Tìm</span>
    </button>
  </div>
  )
}

export default TaskSearch;
