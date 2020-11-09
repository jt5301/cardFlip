import './App.css';
import Square from './components/Square.js'
import React, {useState, useEffect} from 'react'

function App() {

  const [gridRxC,setGridRxC] = useState({})
  const [oddGrid,isOddGrid] = useState(false)
  const [stateGrid,setStateGrid] = useState([])
  const [pair,pickPair] = useState([])

  useEffect(()=>{
    //initial grid setup
    setGridRxC({
      rows:2,
      columns:2
    })
  },[])

  useEffect(()=>{
    //keeps track of whether grid is even or odd, then sets grid
    let nums = gridRxC.columns * gridRxC.rows
    let grid = []
    grid = new Array(gridRxC.rows).fill('')
    grid = grid.map(()=>{
      return new Array(gridRxC.columns).fill('')
    })
    if(nums%2!==0){
      isOddGrid(true)
      for(let row = 0;row<grid.length;row++){
        for(let column = 0;column < grid[row].length;column++){
          grid[row][column] = ''
      }
    }
  }
    else{
      isOddGrid(false)
      let randomNums = {}
      let index = 0
      while(index < nums){
        let id = Math.ceil(Math.random()*100)
        if(randomNums[id])continue
        randomNums[id]=2
        index+=2
      }
      let randomNumKeys = Object.keys(randomNums)
      for(let row = 0;row<grid.length;row++){
        for(let column = 0;column < grid[row].length;column++){
          let index = Math.floor(Math.random()*randomNumKeys.length)
          let value = randomNumKeys[index]
          grid[row][column] = value
          randomNums[value]-=1
          if(!randomNums[value]){
            randomNumKeys.splice(index,1)
          }
        }
      }
    }
    setStateGrid(grid)
  },[gridRxC])

  function modColumn(instructions){
    let newColumns = {...gridRxC}
    if(instructions==='addColumn') newColumns.columns +=1
    if(instructions === 'subtractColumn') newColumns.columns -=1
    setGridRxC(newColumns)
  }

  function modRow(instructions){
    let newRows = {...gridRxC}
    if(instructions==='addRow') newRows.rows +=1
    if(instructions === 'subtractRow') newRows.rows -=1
    setGridRxC(newRows)
  }

  const buildGrid = () =>{
    return stateGrid.map((rows)=>{
      return (
        <div className = 'row'>
          {rows.map((num)=>{
           return(<Square value = {num}/>)
          })}
        </div>
      )
    })
  }
  return (
    <div className="App">
      <div className="App-body">
      <button onClick = {()=>{
        modColumn('addColumn')}}>Add Column</button>
      <button onClick = {()=>{
        modColumn('subtractColumn')}}>Remove Column</button>
      <div className = 'gridContainer'>
        {buildGrid()}
      </div>
      <button onClick = {()=>{
        modRow('addRow')}}>Add Row</button>
      <button onClick = {()=>{
        modRow('subtractRow')}}>Remove Row</button>
      </div>
    </div>
  );
}

export default App;
