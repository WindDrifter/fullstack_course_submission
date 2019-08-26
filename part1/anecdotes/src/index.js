import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClickFunction, name})=>{
    return(<button onClick={onClickFunction}>{name}</button>);

}
const Anecdote = ({anecdote, votes})=>{
    return(<div>
        <p>{anecdote}</p>
        <p>Votes: {votes || 0}</p>
    </div>)


}
function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() *(max-min)) + min;
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [mostVotedOne, setMostVotedOne] = useState(0);
  const [score, setScore] = useState({});

  const totalAnecdotes = props.anecdotes.length;
  const changeSelect=()=>{
    setSelected(getRandomInt(0,totalAnecdotes));
  }
  const voteUp=()=>{
    const copy = { ...score };
    copy[selected] = copy[selected]? copy[selected]+1 : 1;
    setScore(copy);
    if(copy[selected] > copy[mostVotedOne]){
        setMostVotedOne(selected);
    }
  }

  return (
    <div>
      <Anecdote anecdote={props.anecdotes[selected]} votes={score[selected]}/>
      <Button onClickFunction={changeSelect} name="Next anecdote"/>
      <Button onClickFunction={voteUp} name="Vote"/>
      {score[mostVotedOne]>0 &&
      (<div>
          <h2>Most voted</h2>
          <Anecdote anecdote={props.anecdotes[mostVotedOne]} votes={score[mostVotedOne]}/>
      </div>)}

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)