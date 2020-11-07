import './App.css';
import Square from './components/Square.js'
import React, {useState, useEffect} from 'react'

function App() {

  const [gridNums,setGridNums] = useState({})
  const [oddGrid,isOddGrid] = useState(false)

  useEffect(()=>{
    setGridNums({
      rows:4,
      columns:4
    })
  },[])
  useEffect(()=>{
    let nums = gridNums.columns * gridNums.rows
    if(nums%2!=0){
      isOddGrid(true)
    }
    else{
      isOddGrid(false)
    }
  },[gridNums])

  function modColumn(instructions){
    let newColumns = {...gridNums}
    if(instructions==='addColumn') newColumns.columns +=1
    if(instructions === 'subtractColumn') newColumns.columns -=1
    setGridNums(newColumns)
  }

  function modRow(instructions){
    let newRows = {...gridNums}
    if(instructions==='addRow') newRows.rows +=1
    if(instructions === 'subtractRow') newRows.rows -=1
    setGridNums(newRows)
  }

  const buildGrid = () =>{
    console.log(oddGrid)
    let grid = new Array(gridNums.columns).fill('')
    grid = grid.map(()=>{
      return new Array(gridNums.rows).fill('1')
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
