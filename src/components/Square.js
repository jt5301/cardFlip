import React, {useState} from 'react'
const Square = (props) => {
  let [number,showNumber] = useState(false)
  console.log(props)
  const flip = () =>{
    let headTails = Math.floor(Math.random()*2)
    console.log(headTails)
  }
  return (
    <div onClick = {flip} className = 'square' >{props.value}</div>
  )
}

export default Square
