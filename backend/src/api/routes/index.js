import { router as productRouter } from "./product.js";
import { router as orderRouter } from "./order.js";
import { router as userRouter } from "./users.js";
import { router as categoryRouter } from "./category.js";
import { router as cartRouter } from "./cart.js"
import { router as addressRouter } from "./address.js";

function route(app) {
    app.use('/product', productRouter);
    app.use('/category', categoryRouter);
    app.use('/order', orderRouter);
    app.use('/user', userRouter);
    app.use('/cart', cartRouter);
    app.use('/address', addressRouter)
}

export { route };