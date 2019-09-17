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
    this.setState({ruta:'', datos:[]});
    this.onChange = this.onChange.bind(this);
    this.metodoAux = this.metodoAux.bind(this);

  }
  metodoAux()
  {
    var nv = navio(this.myIn.value,600);
    var dataAux = this.s
    nv.data(data);
    nv.addAllAtribs()
  }
  metodoNavio()
  {
    var url = this.state['ruta']
    fetch(url)
      .then(res => res.json())
      .then(data => {
          console.log(data)
          this.state({'data':data})

      }, this.metodoAux());

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