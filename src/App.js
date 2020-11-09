import './App.css';
import Square from './components/Square.js'
import React, {useState, useEffect} from 'react'
import { findAllInRenderedTree } from 'react-dom/test-utils';

function App() {

  const [gridRxC,setGridRxC] = useState({})
  const [oddGrid,isOddGrid] = useState(false)
  const [stateGrid,setStateGrid] = useState([])
  const [pair,setPair] = useState([])

  useEffect(()=>{
    //initial grid setup
    setGridRxC({
      rows:2,
      columns:2
    })
  },[])

  useEffect(()=>{
    if(pair.length===0)return
    if(pair.length<=2){
      let current = pair[pair.length-1]
      current.tile.style.color = 'white'
    }
    if(pair.length===2){
      console.log(pair[1])
      let current = pair[pair.length-1]
      let compare = pair[0]
      if(stateGrid[current.coordinates[0]][current.coordinates[1]] != stateGrid[compare.coordinates[0]][compare.coordinates[1]]){
        setTimeout(()=>{
          current.tile.style.color = 'red'
          compare.tile.style.color = 'red'
        },1000)
      }
      setPair([])
    }
  },[pair])

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

  function choosePair(event){
    let row = event.currentTarget.getAttribute("data-row")
    let column = event.currentTarget.getAttribute("data-column")
    let coordinates = [row,column]
    if(pair.length===2)return
    let tileInfo = {coordinates,tile:event.target}
    setPair([...pair,tileInfo])
  }

  const buildGrid = () =>{
    let row = -1
    return stateGrid.map((rows)=>{
      row+=1
      let column = -1
      return (
        <div className = 'row'>
          {rows.map((num)=>{
            column+=1
           return(
             <div
              data-row = {row}
              data-column = {column}
              onClick = {(event)=>choosePair(event)}>
              <Square value = {num}/>
             </div>
             )
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
