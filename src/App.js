import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import Person from './Person/Person'

const StyledButton = styled.button`
background-color: ${props => props.alt ? 'red' : 'green'};
color: white;
font: inherit;
border: 1px solid blue;
padding: 8px;
cursor:pointer;

&:hover{
  background-color: ${props => props.alt ? 'salmon':'lightgreen'};
  color: black;
}
`;

class App extends Component {
  state = {
    persons : [
      {id: 'asfa1',name: "max", age:28},
      {id: 'vasdf1',name: "Manu", age:30},
      {id: 'asdf1',name: "Parag", age:40}
    ],
    otherState : "Some other value",
    showPersons : false
  }

  nameChangedHandler = (event, id) =>{
    const personIndex = this.state.persons.find(p => {
      return p.id === id;
    });

    const person = {...this.state.persons[personIndex]}; //copies the object
    person.name = event.target.value;

    const persons = [...this.state.persons]; //copies the array
    persons[personIndex] = person;
    this.setState({
      persons: persons
    })
  }

  deletePersonHandler = (personIndex)=>{
    const persons = this.state.persons.slice();//slice without any arguments copies the whole array
    persons.splice(personIndex,1);
    this.setState({persons: persons}) 
  }

  togglePersonsHandler = ()=>{
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    // const style = {
    //   backgroundColor: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor:'pointer',
    //   ':hover':{
    //     backgroundColor: 'lightgreen',
    //     color: 'black'
    //   }
    // }
    let persons = null;
    if(this.state.showPersons){
      persons = (        
      <div>
        {this.state.persons.map((person, index) => {
          return <Person
           click={()=>this.deletePersonHandler(index)}
           name={person.name} 
           age={person.age} 
           key={person.id}
           changed={(event)=>this.nameChangedHandler(event,person.id)}
           />
        })}
        {/* <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler.bind(this, 'Max!')} changed={this.nameChangedHandler}>My Hobbies: racing </Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age} /> */}
      </div> 
      );

      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // }


    }

    const classes = [];
    if(this.state.persons.length <=2){
      classes.push('red'); //classes = ['red']
    }
    if(this.state.persons.length<=1){
      classes.push('bold'); //classes = ['red', 'bold']
    }

    return (
      <div className="App">
        <h1> Hi, I'm a react app</h1>
        <p className={classes.join(' ')}> This is really working!</p>
        <StyledButton alt={this.state.showPersons} onClick={this.togglePersonsHandler} >Toggle Persons</StyledButton>
        {persons}
      </div>
    );
    // return React.createElement('div',{className: 'App'}, React.createElement('h1',null,'Does this work now?'))
  }
}

export default App;