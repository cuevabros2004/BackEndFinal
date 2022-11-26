import express from 'express'
import { routerApi } from "./routers/routerApi.js"
import { routerShoppingCart } from "./routers/routerShoppingCart.js"

const servidor = express()

//Middlewares para resolver los datos que viene por el Post
//Si viene por un Json o si viene de un formulario (Form)
servidor.use(express.json())
servidor.use(express.urlencoded({ extended: true }))

//Middlewares para los routers
servidor.use('/api/products', routerApi)
servidor.use('/api/shoppingCart', routerShoppingCart)

//En caso de venir de una ruta no implementada devuelve error.
servidor.all('*', (req, res) => {
  res.status(403).json({error: "403", descripcion: "url: " + req.url + " método " + req.method + " forbiden"})
})

const puerto = process.env.PORT ?? 8080

function conectar(puerto = 0) {
  return new Promise((resolve, reject) => {
    const servidorConectado = servidor.listen(puerto, () => {
      resolve(servidorConectado)
    })
  })
}

 
export { conectar }