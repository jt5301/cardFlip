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
      rows:2,
      columns:2
    })
  },[])

  useEffect(()=>{
    //keeps track of whether grid is even or odd, then sets grid nums
    let nums = gridRxC.columns * gridRxC.rows
    if(nums%2!==0){
      isOddGrid(true)
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

  function flip(){
    let headTails = Math.floor(Math.random()*2)
    console.log(headTails)
  }
  const buildGrid = () =>{
    let keys = Object.keys(gridNums)
    let copyGridNums = {...gridNums}
    //for initial render
    if(keys.length===0)return
    let grid = new Array(gridRxC.columns).fill('')
    grid = grid.map(()=>{
      return new Array(gridRxC.rows).fill()
    })
    return grid.map((rows)=>{
      return (
        <div>
        {rows.map(()=>{
          let ID = ''
          if(!oddGrid){
            //for every square, remove used keys/nums from array
            for(let i = 0;i<keys.length;i++){
            let keyOfInd = keys[i]
            if(!copyGridNums[keyOfInd]){
              keys.splice(i,1)
            }
          } //then assign a key here to id that hasn't been already assigned
            let index = Math.floor(Math.random()*keys.length)
            ID = keys[index]
            copyGridNums[ID]-=1
          }
          return <Square value = {ID}/>
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
