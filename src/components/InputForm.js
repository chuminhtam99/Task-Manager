import React, { useEffect, useState } from 'react';
// import './App.css';

function InputForm(props){
  const[ name, setName] = useState('')
  const[ status, setStatus] = useState('true');
  const[ id, setId] = useState('');
  const {editingTask} = props;

  function onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    if ( name === 'name'){
      setName(value)
    }
    if ( name === 'status'){
      setStatus(value)
    }
    
  }

  function toSubmit(e){
    e.preventDefault();
    if ( !editingTask ){
      // console.log('them moi');
      props.toGetData({
        name, status
      });
    } else {
      // console.log('sua task');
      props.toEditDataFromForm({
        name, status, id
      })
    }
    toCloseForm();
  }

  function toCloseForm(){
    props.toCloseForm(true);
    toClearForm();
  }

  function toClearForm(){
    // console.log('hihi');
    setName('');
    setStatus('true');
  }

  useEffect( () => {
    if ( editingTask) {
      setName(editingTask.name);
      setStatus(editingTask.status);
      setId( editingTask.id);
    }
  }, [editingTask])


  return (
    <div className="container__input">
    <div className="container__input-block">
      <div className="container__input--header">
        <span className="input--header-text">Thêm công việc</span>
        <button onClick={ toCloseForm}
          className="input--header-close"
          ><i className="fas fa-times-circle" /></button>
      </div>
      <div className="container__input--body">
        <form onSubmit={toSubmit} className="input--body__form">
          <div className="input--body__element-form">
            <label htmlFor="name">Tên</label>
            <input 
              value={name}
              type="text" 
              name="name" 
              id="name" 
              onChange = {onChange}
             />
          </div>
          <div className="input--body__element-form">
            <label htmlFor="status">Trạng thái</label>
            <select 
              value = {status}
              name="status" 
              id="status"
              onChange = {onChange}
            >
              <option value='false'>Ẩn</option>
              <option value='true'>Kích hoạt</option>
            </select>
          </div>
          <div className="input--body__buttons">
            <button className="input--body__button input--body__save-button" type="submit">
              <i className="fas fa-plus" />
              <span>Lưu lại</span>
            </button>
            <button 
              onClick={toClearForm}
              className="input--body__button input--body__cancel-button" 
              type="button">
              <i className="fas fa-times" />
              <span>Hủy bỏ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}


export default InputForm;
