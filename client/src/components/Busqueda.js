import React from 'react';
import '../App.css';
import Navio from "./Navio";


class Busqueda extends React.Component {

  onChange()
  {
    let url = document.getElementsByName('url')[0].value
    console.log("a",url)
    this.setState({'url':url})
  }
  constructor(props)
  {
    super(props)
    this.state ={url:'', datos:[]}
    this.metodoNavio = this.metodoNavio.bind(this);
    this.onChange = this.onChange.bind(this);


  }

  metodoNavio()
  {

    let url = document.getElementsByName('url')[0].value
    console.log("metodo navio", url)
    fetch(url)
      .then(res => res.json())
      .then(data => {
          console.log(data)
          this.setState({'data':data})

      });

  }
  render()
  {
      return(<div>
        <input type="text" name="url" onChange={this.onChange}>
        </input>
        <button onClick={this.metodoNavio}>ACEPTAR</button>
        <Navio data={this.state['data']}></Navio>
      </div>);
  }
}


export default Busqueda;