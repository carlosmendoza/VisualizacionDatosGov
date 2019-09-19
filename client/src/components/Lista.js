import React from 'react'

class Lista extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={'listaurl':[]};
        this.llenarLista = this.llenarLista.bind(this);
        this.actualizar = this.actualizar.bind(this);
    }
    componentDidMount()
    {
        this.llenarLista();
    }
    seleccion(url)
    {
        console.log("url seleccionado", url);
        this.props.callback(url)
    }
    llenarLista()
    {
    let listaUrl = []
    fetch("http://localhost:5000/historial")
    .then(res => res.json())
    .then(data => {
        if(data!=null)
        {
        data.forEach(function(element){
        listaUrl.push(element['url']);
        })
        this.actualizar(listaUrl);
        }
    });
    }
    actualizar(lista)
    {
      this.setState({'listaurl':lista});
    }

    render()
    {
    
     return(<div>
         <br></br>
         <br></br>
         <h2>Historial De Búsqueda</h2>
         {this.state.listaurl.map(url=> <div key={url} id={url} onClick={()=>this.seleccion(url)}>{url}</div>)}
     </div>)
    }

}
export default Lista

