import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) =>{
    console.log(props);
    return (<h1>{props.course}</h1>);
};
const Content = (props) =>{
    const parts = props.parts;
    const list_of_parts = parts.map(value => <Part name={value.name} exercises={value.exercises}/>)
    return (
    <div>
        {list_of_parts}
    </div>);
};
const Part = (props) => {
    return (<p>{props.name} {props.exercises}</p>)

};
const Total = (props) =>{

    return (<p>Number of exercises {props.total}</p>)
};

const App = () => {
    const course = 'Half Stack application development'
    const parts = [{
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }];
    let total_exercises = 0;
    parts.forEach(value => {
        total_exercises += value.exercises;
    });

    return (
    <div>
        <Header course={course}/>
        <Content parts={parts}/>
        <Total total={total_exercises}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'))