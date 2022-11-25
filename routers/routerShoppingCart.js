import express from 'express';
const routerShoppingCart = express.Router();

import {controladorPostCart, 
        controladorPostCartSegunId, 
        controladorDeleteCartById, 
        controladorGetCartProductsById, 
        controladorDeleteCartProductById,
        soloParaAdmins} from '../controllers/controllerShoppingCart.js'

routerShoppingCart.post('/', soloParaAdmins, controladorPostCart)
routerShoppingCart.post('/:id_cart/products', soloParaAdmins, controladorPostCartSegunId)
routerShoppingCart.delete('/:id_carrito', soloParaAdmins, controladorDeleteCartById)
routerShoppingCart.get('/:id_cart/products', controladorGetCartProductsById)
routerShoppingCart.delete('/:id_cart/products/:id_prod', soloParaAdmins, controladorDeleteCartProductById)

export {routerShoppingCart}