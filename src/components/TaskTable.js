import React from 'react';

function TaskTable(props){

  function toToggleStatus(task){
    props.toToggleStatus(task)
  }

  function toDeleteTask(task){
    props.toDeleteTask(task)
  }

  function toEditTask(task){
    props.toEditTask(task)
  }

  function onChange(e){
    props.toSearchTable(e.target.value)
  }

  function toSort(e){
    props.toSort(e.target.value)
  }

  if (props.tasks){
    var elements = props.tasks.map(( task, index) => {
      return       <tr key = {index}>
      <td> {index + 1} </td>
      <td> {task.name} </td>
      <td 
        class={ task.status === 'true' ? 'table-item-active' : 'table-item-inactive'}>
        <button onClick = {() => toToggleStatus(task)} className="output__task-table--inactive"> Ẩn</button>
        <button onClick = {() => toToggleStatus(task)} className="output__task-table--active"> Kích hoạt</button>
      </td>
      <td>
        <button 
          onClick = {() => toEditTask(task)}
          className="output__task-table--edit-btn"
          > <i className="fas fa-pen" /> Sửa</button>
        <button 
          onClick = {() => toDeleteTask(task)}
          className="output__task-table--delete-btn"
          ><i className="fas fa-trash-alt" /> Xóa</button>
      </td>
    </tr>
    })
  }


  return(
  <table style={{width:"100%"}}>
    <tbody><tr className="output__task-table-head">
        <th className="output__table-index">STT</th>
        <th className="output__table-name">Tên</th>
        <th className="output__table-status" style={{width: '25%'}}>Trạng Thái</th>
        <th className="output__table-action" style={{width: '30%'}}>Hành Động</th>
      </tr>
      <tr>
        <td />
        <td><input
        onChange = {onChange}
        name ="searchValue"
        style={{width: '100%'}} /></td>
        <td>
          <select onChange={toSort} name="selectData" style={{width: '100%', outline: 'none'}}>
            <option value={0}>Tất cả</option>
            <option value={-1}>Ẩn</option>
            <option value={1}>Kích hoạt</option>
          </select>
        </td>
        <td />
      </tr>
      {elements}
    </tbody>
  </table>
  )
}

export default TaskTable;
