import React, { useState } from 'react';
import ReactDOM from 'react-dom';
const Button =({onClickFunction, name})=>{
  return (<button onClick={onClickFunction}>{name}</button>)

}
const TableElement = ({tableheader, number})=>{
  return (<tr><th>{tableheader}</th><th>{number}</th></tr>)

}

const Stats=(props)=>{
  const average = 0;
  const {good, neutral, bad, total} = props;
  return (<div>
    {total>0 ? 

    (<table>
      <tbody><TableElement tableheader="Good:" number={good}/>
      <TableElement tableheader="So-So:" number={neutral}/>
      <TableElement tableheader="Terrible:" number={bad}/>
      <TableElement tableheader="Total Votes::" number={total}/>
      <TableElement tableheader="Average:" number={(good-bad)/total}/>
      <TableElement tableheader="Postivite %:" number={(good)/total*100}/>
      </tbody>
    </table>)
    :
    (<div><p>No feed back given</p></div>)
  }


  </div>);

};


const App=()=> {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const handleBad =()=>{
    setBad(bad+1);
    setTotal(total+1);
  }
  const handleGood =()=>{
    setGood(good+1);
    setTotal(total+1);
  }
  const handleNeutral =()=>{
    setNeutral(neutral+1);
    setTotal(total+1);
  }

  return (
    <div className="App">
      <h1>Give feedback</h1>
      <Button onClickFunction={handleGood} name="Good"/>
      <Button onClickFunction={handleNeutral} name="So-So"/>
      <Button onClickFunction={handleBad} name="Terrible"/>
      <h2>Stats</h2>
      <Stats good={good} bad={bad} neutral={neutral} total={total}/>
      

    </div>
  );
}

export default App;
