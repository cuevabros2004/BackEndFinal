import { randomUUID } from 'crypto';
import { Contenedor } from "../container/container.js"
import fs from "fs";

const prodTest = new Contenedor('productos.txt')

async function controladorPostProductos(req, res) {
    res.status(201);
    const objeto = req.body;
    objeto.id = randomUUID();
    await prodTest.save(objeto);
    res.json(objeto)
}

async function controladorGetProductos(req, res) {
    const productos = await prodTest.getAll();
    res.json(productos);
}

async function controladorGetProductosSegunId({ params: { id } }, res) {
    const productos = await prodTest.getAll();
    const buscado = productos.find(c => c.id === id);
    if (!buscado) {
        res.status(404);
        res.json({ mensaje: `no se encontrĂ³ producto con ese id (${id})` });
    } else {
        res.json(buscado);
    }
}

async function controladorPutProductosSegunId({ body, params: { id } }, res) {
    const productos = await prodTest.getAll();
    const indiceBuscado = productos.findIndex(c => c.id === id);
    if (indiceBuscado === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontrĂ³ producto con ese id (${id})` });
    } else {
        body.id = id;
        productos[indiceBuscado] = body;
        await prodTest.update(productos);
        res.json(body);
    }
}


async function controladorDeleteProductosSegunId({ params: { id } }, res) {
    const productos = await prodTest.getAll();
    const indiceBuscado = productos.findIndex(c => c.id === id);
    if (indiceBuscado === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontrĂ³ producto con ese id (${id})` });
    } else {
        const borrados = await prodTest.deleteById(id);
        res.json(borrados[0]);
    }
}


function controladorproductosRandom(req, res){
    res.send(prodTest.getById(randomUUID()))
}

let esAdmin = true

function soloParaAdmins(req, res, next) {
    if (esAdmin) {
        next()
    } else {
        res.sendStatus(403)
    }
}


export {controladorGetProductos, 
        controladorPostProductos, 
        controladorGetProductosSegunId, 
        controladorPutProductosSegunId, 
        controladorDeleteProductosSegunId, 
        controladorproductosRandom,
        soloParaAdmins}