const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');
const dashboardRouter = require('./dashboardRouter');
const userRouter = require('./userRouter');
const transRouter = require('./transRouter');
// const userController = require('./userRouter')

module.exports = {
    productRouter,
    cartRouter,
    dashboardRouter,
    transRouter,
    userRouter
}