import React, {useState} from 'react'
const Square = (props) => {
  let [number,showNumber] = useState(false)
  // const flip = () =>{
  //   let headTails = Math.floor(Math.random()*2)
  //   console.log(headTails)
  // }
  return (
    <div className = 'square' >{props.value}</div>
  )
}

export default Square
