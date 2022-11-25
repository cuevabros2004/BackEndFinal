import { randomUUID } from 'crypto';
import { ContenedorCarrito } from "../container/containerCarrito.js"
import { Contenedor } from "../container/container.js"

const productos = new Contenedor('productos.txt')
const cartFile = new ContenedorCarrito('cart.txt')

async function controladorPostCart(req, res) {
    res.status(201);
    const objeto = req.body;
    const prodsCart = []
    objeto.id_cart = randomUUID();
    objeto.productos = prodsCart
    await cartFile.save(objeto);
    res.json(objeto.id_cart)
}

async function controladorDeleteCartById({ body, params: { id_carrito } }, res) {
    const cartList = await cartFile.getAll();

    const indiceBuscado = cartList.findIndex(c => c.id_cart === id_carrito);


    if (indiceBuscado === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontró carrito con ese id (${id_carrito})` });

    } else {
        //body.id = id_cart;
        cartList[indiceBuscado].productos = []
        await cartFile.update(cartList);
        res.json(body);
    }


}

async function controladorPostCartSegunId({ body, params: { id_cart } }, res) {

    const cartList = await cartFile.getAll();
    const prods = await productos.getAll();

    const indiceProdBuscado = prods.findIndex(p => p.id === body.id)
    const indiceBuscado = cartList.findIndex(c => c.id_cart === id_cart);

    if (indiceProdBuscado === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con ese id (${body.id})` });
    } else {
        if (indiceBuscado === -1) {
            res.status(404);
            res.json({ mensaje: `no se encontró carrito con ese id (${id_cart})` });

        } else {
            //body.id = id_cart;
            cartList[indiceBuscado].productos.push(prods[indiceProdBuscado]);
            await cartFile.update(cartList);
            res.json(body);
        }

    }

}

async function controladorGetCartProductsById({ body, params: { id_cart } }, res) {
    const cartList = await cartFile.getAll();
    const cartBuscado = cartList.find(c => c.id_cart === id_cart);
    if (!cartBuscado) {
        res.status(404);
        res.json({ mensaje: `no se encontró carrito con ese id (${id})` });
    } else {
        if (!cartBuscado.productos) {
            res.status(404);
            res.json({ mensaje: `no se encontraron productos en el carrito con ese id (${id})` });
        } else {
            res.json(cartBuscado.productos);
        }

    }
}

async function controladorDeleteCartProductById({params: { id_cart }, params: {id_prod} }, res) {
    const CartList = await cartFile.getAll();
    const indiceBuscadoCart = CartList.findIndex(c => c.id_cart === id_cart);
    const indiceBuscadoProd = CartList[indiceBuscadoCart].productos.findIndex(p => p.id === id_prod);

    if (indiceBuscadoCart === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontró carrito con ese id (${id_cart})` });
    } else {
      if (indiceBuscadoProd === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con ese id (${id_prod}), en el carrito con id (${id_cart}` });
      } else {
        const borrados = await cartFile.deleteByIdProd(indiceBuscadoCart, id_prod);
        res.json(borrados);
      }
    }

}

let esAdmin = true

function soloParaAdmins(req, res, next) {
    if (esAdmin) {
        next()
    } else {
        res.sendStatus(403)
    }
}

export {
    controladorPostCart,
    controladorPostCartSegunId,
    controladorDeleteCartById,
    controladorGetCartProductsById,
    controladorDeleteCartProductById,
    soloParaAdmins
}