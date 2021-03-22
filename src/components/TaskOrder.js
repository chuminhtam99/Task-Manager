import React, { useState } from 'react';


function TaskOrder (props) {

  const [dropDown, setDropDown] = useState(false)
  const [orderBy, setOrderBy] = useState()
  const [orderType, setOrderType] = useState()
  function toSetDropDown(){
    setDropDown(!dropDown)
  }

  function toGetChecked(orderBy, orderType){
    setOrderBy(orderBy);
    setOrderType(orderType);
    props.toReOrder(orderBy, orderType)
  }


  function toBlur(){
    setDropDown(false)
  }


  return(
  <div className= { dropDown ? "output__arrange output__arrange-has-dropdown " : "output__arrange "} >
    <button
      onBlur={toBlur} 
      className="output__arrange--button"> 
      <span onClick = {toSetDropDown}>Sắp Xếp</span>
      <i  onClick = {toSetDropDown} 
        className="output__arrange--button-icon fas fa-caret-square-down" />
    <ul className="output__arrange-list">
      <li onClick={ () => toGetChecked('name' , 1)}
        className= { orderBy==='name'&&orderType===1 ? "output__arrange-item checked" : "output__arrange-item"}  
        >Tên A đến Z <i className="fas fa-check" /></li>
      <li onClick={ () => toGetChecked('name' , -1)}
        className= { orderBy==='name'&&orderType===-1 ? "output__arrange-item checked" : "output__arrange-item"}
        >Tên Z đến A <i className="fas fa-check" /></li>
      <hr />
      <li onClick={ () => toGetChecked('status' , 1)}
        className= { orderBy==='status'&&orderType===1 ? "output__arrange-item checked" : "output__arrange-item"}
        >Trạng thái kích hoạt <i className="fas fa-check" /></li>
      <li onClick={ () => toGetChecked('status' , -1)}
        className= { orderBy==='status'&&orderType=== -1 ? "output__arrange-item checked" : "output__arrange-item"}
        >Trạng thái ẩn <i className="fas fa-check" /></li>
    </ul>
        </button>
  </div>
  )
}


export default TaskOrder;
