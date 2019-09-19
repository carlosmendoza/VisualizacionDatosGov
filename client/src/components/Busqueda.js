import React from 'react';
import '../App.css';
import Navio from "./Navio";
import Lista from './Lista';


class Busqueda extends React.Component {

  
  constructor(props)
  {
    super(props);
    this.state ={url:'', datos:[]};
    this.metodoNavio = this.metodoNavio.bind(this);
    this.onChange = this.onChange.bind(this);
    this.agregarNuevosDatos = this.agregarNuevosDatos.bind(this);
  }
  onChange()
  {
    let url = document.getElementsByName('url')[0].value;
    this.setState({'url':url});
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

  metodoNavio2()
  {
    let url = document.getElementsByName('url')[0].value;
    let tamanioDataSet =0;
    
    
    fetch(url+"?$select=count(*)")
    .then(res => res.json())
    .then(data => {
        
        tamanioDataSet = data[0]['count']
        console.log("tamaño",tamanioDataSet);        
        this.setState({'tamanio':tamanioDataSet},()=>this.aux(url,0))
    });

  }
  agregarNuevosDatos(url, inicial)
  {
    console.log("aaaa",this.state['tamanio'])
    if(inicial<this.state['tamanio'])
    {
    console.log("entró")
    let arregloAnterior = this.state['datos']
    fetch(url+"?$limit=1000&$offset="+inicial)
      .then(res => res.json())
      .then(data => {
          let nuevosDatos = arregloAnterior.push(data);
          console.log("entroooo")
          this.setState({'datos':nuevosDatos}, this.aux(url,inicial+1000));

      });
    }
       
    
  }
  aux(a,b)
  {
    console.log("auxxx",a,b)
    this.agregarNuevosDatos(a,b)
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