const combineRouters = require("koa-combine-routers");
const post = require('./post/index.js');
const routers = combineRouters(post);

module.exports = routers;