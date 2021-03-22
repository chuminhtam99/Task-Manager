import React, { Component, useState, useEffect } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import AddButton from './components/AddButton';
import TaskSearch from './components/TaskSearch';
import TaskOrder from './components/TaskOrder';
import TaskTable from './components/TaskTable';
import axios from 'axios';

function App (){
  const url = 'http://localhost:3000/tasks';
  const [formStatus, setFormStatus] = useState(false);
  const [ tasks, setTasks] = useState([]);
  const [ editingTask, setEditingTask] = useState();
  const [ clonedTasks, setClonedTasks] = useState([]);
  const [ order, setOrder] = useState({
    orderBy:'',
    orderType: ''
  });


  async function getJSON(){
    let json = await axios.get(url);
    setTasks(json.data);
    // setClonedTasks(json.data);
  }

  // function getJSON(){
  //   axios.get(url)
  //   .then(res => {
  //     setTasks(res.data)
  //   })
  // }

  useEffect(() => {
    getJSON();
  } ,[] );

  
  function toToggleForm(param){
    if(param){
      setFormStatus(!formStatus);
    };
    setEditingTask();
  }

  function toGetData(data){
  
    axios.post(url, data )
    .then(res => {
      tasks.push( res.data)
      setTasks( tasks => [...tasks])
    });
    
  }


  function toCloseForm(param){
    if(param){
      setFormStatus(false)
    }
  }

  function toGetId(task, tasks){
    let result;
    for ( let i = 0 ; i < tasks.length ; i++){
      if ( task.id === tasks[i].id){
        result = task.id
      }
    }
    return result;
  }

  function toToggleStatus(task){
    let id = toGetId(task, tasks);
    let i;
    tasks.forEach(( element, index) => {
      if ( task.id === element.id){
        i = index
      }
    });
    let newTask = Object.assign({},task);
    if ( task.status === 'true'){
      newTask.status = 'false'
    }
    if ( task.status === 'false'){
      newTask.status = 'true'
    }
    tasks[i] = newTask;
    setTasks( tasks => [ ...tasks]);
    
    axios.put( url + `/${id}` , newTask)
  }
  

  function toDeleteTask(task){
    let id = toGetId(task, tasks);
    let i;
    tasks.forEach(( element, index) => {
      if ( task.id === element.id){
        i = index
      }
    })
    axios.delete( url + `/${id}`, )
    tasks.splice( i, 1);
    setTasks( tasks => [...tasks])

  }

  function toEditTask(editingTask){
    setEditingTask(editingTask);
    setFormStatus(true)
  }


  function toEditDataFromForm(editedTask){
    let id = toGetId(editedTask, tasks);
    let i;
    tasks.forEach(( element, index) => {
      if ( editedTask.id === element.id){
        i = index
      }
    });
  
    tasks[i] = editedTask;
    setTasks( tasks => [ ...tasks]);
    
    axios.put( url + `/${id}` , editedTask);
    setEditingTask();

  }

   function toSearch(searchValue){
      axios.get(url)
        .then( res => {
          setClonedTasks(res.data)
        })
      let searchedTasks = clonedTasks.filter((task, index) => {
        return task.name.toLowerCase().indexOf( searchValue.toLowerCase()) !== -1
      })
      setTasks(searchedTasks)
 
  }

   function toSearchTable(searchValue){
    axios.get(url)
    .then( res => {
      setClonedTasks(res.data)
    })

    let searchedTasks = clonedTasks.filter((task, index) => {
      return task.name.toLowerCase().indexOf( searchValue.toLowerCase()) !== -1
    })
    setTasks(searchedTasks)
    }

    function toReOrder(orderBy, orderType){
      axios.get(url)
      .then( res => {
        setClonedTasks(res.data)
      })
      
      setOrder({
        orderBy,
        orderType
      })
      if ( orderBy === 'name'){
        clonedTasks.sort(function (a, b) {
            if (a.name > b.name) {
                return orderType;
            }
            if (b.name > a.name) {
                return -orderType;
            }
            return 0;
        });
      }
      if ( orderBy === 'status'){
        clonedTasks.sort(function (a, b) {
            if (a.status > b.status) {
                return -orderType;
            }
            if (b.status > a.status) {
                return orderType;
            }
            return 0;
        });
      }
      setTasks(clonedTasks)
    }
    
    function toSort(sortValue){
      axios.get(url)
      .then( res => {
        setClonedTasks(res.data)
      })
      clonedTasks.sort(function (a, b) {
        if (a.status > b.status) {
            return -sortValue;
        }
        if (b.status > a.status) {
            return sortValue;
        }
        return 0;
      });
      setTasks(clonedTasks)
      
    }


  return (
    <div>
      <header className="header" style={{marginBottom: '40px'}}>
        <div className="grid">
          <div className="header-text">Task Management</div>
          <hr />
        </div>
      </header>
      <div className="container" style={{marginBottom: '40px'}}>
        <div className={ formStatus=== true ? "grid contain-block" : "grid contain-block full-output"}>
          <InputForm
          toGetData = {toGetData}
          toCloseForm = {toCloseForm}
          editingTask = {editingTask}
          toEditDataFromForm = {toEditDataFromForm}
          ></InputForm>
          <div className="container__output">
            <AddButton
            toToggleForm = {toToggleForm}
            ></AddButton>
            <div className="output__search-and-arrange">
              <TaskSearch
              toSearch = {toSearch}
              ></TaskSearch>
              <TaskOrder
              toReOrder = {toReOrder}
              ></TaskOrder>
            </div>
            <div className="output__task-table">
              <TaskTable
              tasks = {tasks}
              toToggleStatus = {toToggleStatus}
              toDeleteTask = {toDeleteTask}
              toEditTask = {toEditTask}
              toSearchTable = {toSearchTable}
              toSort = {toSort}
              ></TaskTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


