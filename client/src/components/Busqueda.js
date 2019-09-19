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
  metodoNavio(pUrl)
  {
    let url ="";
    if(pUrl)
    {url = pUrl}
    else{
      url = document.getElementsByName('url')[0].value;
    }
    
    console.log("metodo navio", url)
    fetch(url)
      .then(res => res.json())
      .then(data => {
          console.log(data)
          this.setState({'data':data},()=>this.almacenarUrl(url))

      });

  }
  almacenarUrl(pUrl)
  {
    console.log("metodoAlmace",pUrl)
    fetch(
      "http://localhost:5000/historial",
      {
        method: "POST",
        body: JSON.stringify({ "url":pUrl}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
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
  getResponse(result)
  {
   this.metodoNavio(result);
  } 
  render()
  {
      return(<div>
        <label>Ingrese la URL del data set que quiere visualizar</label>
        <br></br><br></br>
        <input type="text" name="url" onChange={this.onChange}>
        </input>
        <br></br><br></br>
        <button onClick={this.metodoNavio}>ACEPTAR</button>
        <Navio data={this.state['data']}></Navio>
        <Lista callback={this.getResponse.bind(this)}></Lista>
        
      </div>);
  }
}


export default Busqueda;