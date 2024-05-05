import { router as productRouter } from "./product.js";
import { router as orderRouter } from "./order.js";

function route(app) {
    app.use('/product', productRouter);
    app.use('/order', orderRouter);
}

export { route };