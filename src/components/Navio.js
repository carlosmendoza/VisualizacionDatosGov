import navio from "navio";
import React from 'react'

class Navio extends React.Component
{
constructor(props)
{
  super(props);
  this.state={};
}
componentDidUpdate()
{
    let dataAux = this.props.data
    let nv = navio(this.myDiv,600);
    console.log(dataAux)
    if(dataAux!==undefined)
    {
    console.log(dataAux)
    nv.data(dataAux);
    nv.addAllAttribs();
    }
}
render ()
{
  
  return(
    <div ref={myDiv => this.myDiv=myDiv}>

    </div>
  )
}
}
export default Navio