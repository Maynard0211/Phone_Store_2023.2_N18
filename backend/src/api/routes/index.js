import { router as productRouter } from "./product.js";
import { router as orderRouter } from "./order.js";
import { router as userRouter } from "./users.js";

function route(app) {
    app.use('/product', productRouter);
    app.use('/order', orderRouter);
    app.use('/use', userRouter);
}

export { route };