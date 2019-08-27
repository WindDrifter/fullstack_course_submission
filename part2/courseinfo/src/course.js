import React from 'react';

const Header = (props) =>{
    console.log(props);
    return (<h2>{props.name}</h2>);
};
const Content = (props) =>{
    const parts = props.parts;
    const list_of_parts = parts.map(value => <Part key={value.id} name={value.name} exercises={value.exercises}/>)
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


const Course = ({key, parts, name}) =>{
    const total_exercises = parts.reduce((total_value, value) => {
        return  total_value + value.exercises;
    }, 0);
    return (<div>
        <Header name={name}/>
        <Content parts={parts}/>
        <Total total={total_exercises}/>
    </div>);

}

export default Course;
