import { router as productRouter } from "./product.js";

function route(app) {
    app.use('/product', productRouter);
}

export { route };