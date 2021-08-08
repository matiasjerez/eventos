# api_events<br/>
API Rest que permite crear usuarios, iniciar sesión para generar un token y luego poder consultar todos los eventos disponibles y agregar nuevos. Desarrollada en Node con Express y MongoDB para la persistencia de los datos.

## API ENDPOINTS
### POST api/users/

Agregar un nuevo usuario

Estructura JSON<br/>

POST /api/users <br/>
Content-Type: application/json <br/>
<br/>
{<br/>
  "username": String,<br/>
  "password": String<br/>
}<br/>

--- 

### POST api/login/

Iniciar sesión, se genera un token

Estructura JSON<br/>

POST /api/login <br/>
Content-Type: application/json<br/>
<br/>
{<br/>
  "username": String,<br/>
  "password": String<br/>
}<br/>

---

### GET api/event/

Listar todos los eventos
<br/>
Estructura JSON  <token> <br/>

GET /api/events<br/> 
Authorization: Bearer -token-  <br/>
  
---

### POST api/event/

Agregar un nuevo evento

Estructura JSON<br/>

POST /api/events<br/> 
Content-Type: application/json<br/>
Authorization: Bearer -token- <br/>
<br/>
{<br/>
"titulo": String,<br/> 
"descripcion": String,<br/> 
"lugar": String,<br/> 
"fechas": [Date],<br/> 
"destacado": Boolean,<br/> 
"imagen": String<br/>
}
