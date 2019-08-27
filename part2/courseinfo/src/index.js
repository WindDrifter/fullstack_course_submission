import React from 'react';
import ReactDOM from 'react-dom';
import Course from './course';

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


    
    const list_of_courses =courses.map(value => <Course key={value.id} name={value.name} parts={value.parts}/>)

    // must set default value to 0 or it will add up as object
    
    return (
    <div>
      <h1>Full stack course</h1>
      <div>{list_of_courses}</div> 
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'))