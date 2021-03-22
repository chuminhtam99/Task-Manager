import React from 'react';


function AddButton(props){

  function toToggleForm() {
    props.toToggleForm(true)
  }

  return(
  <button
    onClick= {toToggleForm}
     className="output__add-task-button">
    <i className="fas fa-plus" />
    <span> Thêm công việc</span>
  </button>
  )
}


export default AddButton;
