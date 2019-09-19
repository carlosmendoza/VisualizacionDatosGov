# VisualizacionDatosGov
Esta página permite visualizar datasets de la página de datos abiertos datos.gov haciendo uso de Navio.dev, el usuario solo debe ingresar en enlace de la API que desea.

![](https://firebasestorage.googleapis.com/v0/b/proyectodiana-b940e.appspot.com/o/ScreenShot.PNG?alt=media&token=a8269778-50ad-4533-b2fc-30578bd65b00)

# Autor: 
Carlos Alberto Mendoza Patalagua

# Objetivo:
Permitirle a los usuarios la visualización de un dataset de la página datos.gov.co  

# Aplicación en línea  
https://datosgov.herokuapp.com/


# Como desplegar localmente la aplicación  
Clonar el proyecto haciendo uso de git  
* git clone https://github.com/carlosmendoza/VisualizacionDatosGov.git

Instalar las dependencias del servidor backend  

 
* npm install  

Instalar las dependencias del servidor frontend  
 
* npm run client-install  

Para poder hacer uso de la base de datos es necesario crear un archivo .env en el directorio raiz y escribir una variable con la ruta del servidor de mongodb (DATABASE_URL=<yourDatabaseURL>) un ejemplo es DATABASE_URL=mongodb://localhost/datosgov  
 
Ejecutar ambos servidores
* npm run dev

