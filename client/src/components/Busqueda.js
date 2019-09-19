import React from 'react';
import '../App.css';
import Navio from "./Navio";
import Lista from './Lista';


class Busqueda extends React.Component {

  constructor(props)
  {
    super(props);
    this.state ={url:'', "datos":[], "count":[]};
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
    if(pUrl!=undefined)
    {
      url = pUrl.split("(")[0];
    }
    else{
      url = document.getElementsByName('url')[0].value;
    
    }
    let tamanioDataSet =-1;
    fetch(url+"?$select=count(*)")
    .then(res => res.json())
    .then(data => {
        tamanioDataSet = data[0]['count'];
        this.almacenarUrl(url);
       this.agregarNuevosDatos(url,tamanioDataSet)
       
    });

  }
  almacenarUrl(pUrl)
  {
  
    fetch(
      "https://datosgov.herokuapp.com/historial",
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
      <h2>Visualización de datos <strong>datos.gov.co</strong></h2>
      <label>Ingrese la URL del data set que quiere visualizar</label>
      <br></br><br></br>
      <input className="input"type="text" name="url" onChange={this.onChange}>
      </input>        
      <button className="boton" onClick={this.metodoNavio2}>ACEPTAR</button>
      <Navio className="navio" data={this.state['data']}></Navio>
      <Lista callback={this.getResponse.bind(this)}></Lista>
      
    </div>);
  }
}


export default Busqueda;