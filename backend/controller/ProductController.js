import express from 'express'
import bodyParser from 'body-parser'
import {
    products
} from '../model/index.js'

const productRouter = express.Router()

productRouter.get('/', (req, res) => {
    try {
        products.fetchProducts(req, res)
    } catch (error) {
        res.json({
            status: res.errorCode,
            message: "Cannot retrieve products. Try again later."
        })
    }
})
productRouter.get('/:id', (req, res) => {
    try {
        products.fetchProduct(req, res)
    } catch (error) {
        res.json({
            status: res.errorCode,
            message: "Unable retrieve selected product. Retry."
        })
    }
})
productRouter.post('/addProduct', bodyParser.json(), (req, res) => {
    try {
        products.addProduct(req, res)
    } catch (error) {
        res.json({
            status: res.errorCode,
            message: "Unable to add a new product."
        })
    }
})
productRouter.patch('/update/:id', bodyParser.json(), (req, res) => {
    try {
        products.updateProduct(req, res)
    } catch (error) {
        res.json({
            status: res.errorCode,
            message: "Unable to update the product."
        })
    }
})
productRouter.delete('/delete/:id', (req, res) => {
    try {
        products.deleteProduct(req, res)
    } catch (e) {
        res.json({
            status: res.errorCode,
            message: "Delete request unsuccessful. Retry."
        })
    }
})

export {
    productRouter, express
}