import express from 'express';
const routerApi = express.Router();

import { controladorGetProductos,
    controladorPostProductos,
    controladorPutProductosSegunId,
    controladorGetProductosSegunId,
    controladorDeleteProductosSegunId,
    controladorproductosRandom,
    soloParaAdmins } from '../controllers/controllerProducts.js';

routerApi.post('/', soloParaAdmins, controladorPostProductos);
routerApi.get('/', controladorGetProductos);
routerApi.get('/:id', controladorGetProductosSegunId);
routerApi.put('/:id', soloParaAdmins, controladorPutProductosSegunId);
routerApi.delete('/:id', soloParaAdmins, controladorDeleteProductosSegunId);
routerApi.get('/random/productosRandom', controladorproductosRandom);


export  {routerApi};
