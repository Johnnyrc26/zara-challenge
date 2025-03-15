# Zara Challenge - Frontend  

## Descripción  
Este proyecto es una aplicación web diseñada para visualizar, buscar y gestionar un catálogo de teléfonos móviles. Permite a los usuarios consultar detalles específicos de cada dispositivo, así como añadirlos o eliminarlos del carrito de compras de manera sencilla.

## Tecnologías Utilizadas  
- **Framework:** React + Vite + TypeScript  
- **Gestión de Estado:** Zustand + React Context API  
- **Estilos:** CSS, SASS o StyledComponents  
- **Autenticación:** API Key en los headers  
- **Pruebas:** Jest + React Testing Library  
- **Despliegue:** Netlify  

## Estructura del Proyecto  
```plaintext
zara-challenge/
│── public/                      
│   ├── LOGO.svg
│   ├── MBST.png
│   ├── MBST.svg
│
│── src/                         
│   ├── api/                     
│   │   ├── test/                
│   │   │   ├── get-phone-by-id.sh
│   │   │   ├── get-phones.sh
│   │   ├── apiClient.ts
│   │   ├── phoneService.ts
│   │
│   ├── components/              
│   │   ├── Detail/
│   │   │   ├── backButton/
│   │   │   ├── CarouselPhones/
│   │   │   ├── Detail/
│   │   │   ├── Specifications/
│   │   ├── Layout/
│   │   ├── NavBar/
│   │   ├── PhonesGrid/
│   │   ├── ShoppingCart/
│   │   │   ├── Buttons/
│   │   │   ├── Product/
│   │   │   ├── ProductsCount/
│   │
│   ├── pages/                   
│   │   ├── CartView.tsx
│   │   ├── PhonesDetail.tsx
│   │   ├── PhoneListHome.tsx
│   │
│   ├── store/                      
│   │   ├── cartStore.ts
│
│   ├── styles/                     
│   │   ├── index.css
│
│   ├── main.tsx                    
│   ├── App.tsx                     
│   ├── vite-env.d.ts               
│
│── .env 
│── .eslintrc.cjs             
│── .prettierrc               
│── jest.config.ts            
│── jest.setup.ts             
│── vite.config.ts            
│── tsconfig.json              
│── package.json               
│── README.md                  
```

## Instalación y Ejecución  
### 1. Clonar el repositorio:  
```sh
git clone https://github.com/tu-usuario/zara-challenge.git
cd zara-challenge
```

### 2. Instalar dependencias:  
```sh
npm install
```

### 3. Configurar variables de entorno:  
Crea un archivo `.env` en la raíz y añade:
```sh
VITE_API_BASE_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
VITE_API_KEY=87909682e6cd74208f41a6ef39fe4191
```

### 4. Ejecutar en modo desarrollo:  
```sh
npm run dev
```

### 5. Construir para producción:  
```sh
npm run build
```

## Pruebas  
Ejecutar los tests con Jest:  
```sh
npm test
```

##  Despliegue en Netlify  
### 1. Conectar el repositorio en Netlify  
### 2. Configurar variables de entorno en Netlify > Settings > Environment Variables  
### 3. Especificar el comando de build:  
```sh
npm run build
```

### 4. Seleccionar la carpeta de salida `/dist`  
### 5. Deploy  [text](https://zara-challenge-frontdev.netlify.app/)!   