import './App.css';
import Square from './components/Square.js'
import React, {useState, useEffect} from 'react'

function App() {

  const [gridRxC,setGridRxC] = useState({})
  const [oddGrid,isOddGrid] = useState(false)
  const [gridNums,setGridNums] = useState({})

  useEffect(()=>{
    //initial grid setup
    setGridRxC({
      rows:4,
      columns:4
    })
  },[])

  useEffect(()=>{
    //keeps track of whether grid is even or odd, then sets grid nums
    let nums = gridRxC.columns * gridRxC.rows
    if(nums%2!==0){
      isOddGrid(true)
      setGridNums({})
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
      setGridNums(randomNums)
    }
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
    let keys = Object.keys(gridNums)
    let grid = new Array(gridRxC.columns).fill('')
    grid = grid.map(()=>{
      return new Array(gridRxC.rows).fill()
    })
    return grid.map((rows)=>{
      return (
        <div>
        {rows.map(()=>{
          return <Square/>
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
