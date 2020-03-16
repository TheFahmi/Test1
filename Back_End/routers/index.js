const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');
const dashboardRouter = require('./dashboardRouter');
const userRouter = require('./userRouter');
const transRouter = require('./transRouter');
// const userRouter = require('./userRouter')

module.exports = {
    productRouter,
    cartRouter,
    dashboardRouter,
    transRouter,
    userRouter
}