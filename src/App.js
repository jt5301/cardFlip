import './App.css';
import Square from './components/Square.js'
import React, {useState, useEffect} from 'react'

function App() {

  const [gridNums,setGridNums] = useState({})

  useEffect(()=>{
    setGridNums({
      rows:4,
      columns:3
    })
  },[])
  const buildGrid = () =>{
    let grid = new Array(gridNums.columns).fill('')
    grid = grid.map((column)=>{
      return new Array(gridNums.rows).fill('1')
    })
    return grid.map((rows)=>{
      return (
        <div>
        {rows.map((columns)=>{
          return <Square/>
        })}
      </div>
      )



    })

    // let gridColumns = new Array(columns).fill('')
    // let grid = []
    // for(let i = 0;i<rows;i++){
    //   grid.push(gridColumns)
    // }
    // return (
    //   <div className = 'gridContainer'>
    //     {grid.map((rows)=>{
    //       console.log(rows)
    //       let count = 0
    //       return (<Square/>)
    //     })}
    //   </div>
    // )
  }
  return (
    <div className="App">
      <div className="App-body">
      <div className = 'gridContainer'>
        {buildGrid()}
      </div>

      </div>
    </div>
  );
}

export default App;
