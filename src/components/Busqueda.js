import React from 'react';
import '../App.css';
import navio from "navio";


class Busqueda extends React.Component {

  onChange()
  {
    this.setState({'ruta':this.myIn.value})
  }
  constructor(props)
  {
    super(props)
    this.setState({ruta:''})
    this.onChange = this.onChange.blind(this)

  }
  metodoNavio()
  {
    var url = this.state['ruta']
    fetch(url)
      .then(res => res.json())
      .then(data => {
          console.log(data)

      });
    var nv = navio(this.myIn.value,600);
    //nv.data(data);
    //nv.addAllAtribs()
  }
  render()
  {
      return(<div>
        <input type="text">PRUEBA
        rfef={myIn => this.myIn=myIn}
        onInput ={this.onChange.bind}</input>
        <button onClick={this.metodoNavio}>ACEPTAR</button>
      </div>);
  }
}


export default Busqueda;