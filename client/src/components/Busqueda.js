import React from 'react';
import '../App.css';
import Navio from "./Navio";
import Lista from './Lista';


class Busqueda extends React.Component {

  
  constructor(props)
  {
    super(props);
    this.state ={url:'', "datos":[]};
    this.metodoNavio = this.metodoNavio.bind(this);
    this.metodoNavio2 = this.metodoNavio2.bind(this);
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
    {
      url = pUrl;
    }
    else{
      url = this.state['url'];
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
          
          this.setState({'data':data},()=>this.almacenarUrl(url))

      });

  }
  almacenarUrl(pUrl)
  {
  
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
    let tamanioDataSet =-1;
    fetch(url+"?$select=count(*)")
    .then(res => res.json())
    .then(data => {
        tamanioDataSet = data[0]['count'];
        this.almacenarUrl(url)
       this.agregarNuevosDatos(url,tamanioDataSet)
       
    });
  }

  agregarNuevosDatos(url, tamanio)
  {
    fetch(url+"?$limit="+tamanio+"&$offset="+0)
      .then(res => res.json())
      .then(data => {
          this.setState({'data':data});
      });
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
        <button onClick={this.metodoNavio2}>ACEPTAR</button>
        <Navio data={this.state['data']}></Navio>
        <Lista callback={this.getResponse.bind(this)}></Lista>
        
      </div>);
  }
}


export default Busqueda;