import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

const createStoreWithMiddleware = applyMiddleware()(createStore);

const studentList = [
{id:40, name:"vivekB"},
{id:5, name:"vaibhavD"},
{id:18, name:"vinitJ"},
{id:12, name:"SaurabhM"}];

export default class ListItems extends component{
constructor(props){
  super(props);
  this.state={
    value : ""
  }
};

onchange(e){
  const value = this.state[e.target.name];
  this.setState({value : e.target.value});
}
onchange(e){
  this.setState({value : e.target.value});
}
onchange(e){
  const courses = this.state.courses;
  couses.title = e.target.value;
  this.setState({courses : courses});
}

 function handleChange(e)
 {
  console.log(e.target);

  const listItemSortedById = props.students.sort(function(a, b){return a.id-b.id}).map((x, index) =>
          <li key={index}>
            <lable> Student id = {x.id} , Name = {x.name} </lable>
          </li>
        );

  const listItemSortedByName = props.students.sort(function(a,b){return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0 )}).map((x,index) =>
            <li key={index}>
             <lable> Student id = {x.id} , Name = {x.name} </lable>
            </li>
          );
}
render(){
  return (
    <div>
    <lable>We would like to do sorting based on :
      <select value={this.state.value} onChange={this.handleChange.bind(this)}>
        <option value="select">select..</option>
        <option value="id">Id</option>
        <option value="name">Name</option>
      </select>
    </lable>
    <br />
    <lable> Sort based on id </lable>
      <ul>{listItemSortedById}</ul>
      <hr />
      <lable> Sort based on name </lable>
      <ul>{listItemSortedByName}</ul>
    </div>
  );
}
}

ReactDOM.render(
  <ListItems students={studentList}/>
  , document.querySelector('.container'));
