import React from 'react'

class Lista extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={'listaurl':[]}
    }
    componentWillMount()
    {
        let listaUrl = []
        fetch("http://localhost:5000/historial")
        .then(res => res.json())
        .then(data => {
            console.log("basededatos",data)
          if(data!=null)
          {
          data.forEach(function(element){
            
            listaUrl.push(element['url'])
          })
          this.setState({'listaUrl':listaUrl})
        
  
  
        }});
    }
    render( )
    {
    const { listaurl } = this.state;
     return(<div>
         {listaurl.map(url=> <h1>{url}</h1>)}
     </div>)
    }

}
export default Lista

