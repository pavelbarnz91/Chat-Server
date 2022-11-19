const Router = require('koa-router');
const router = new Router();
const users = require('../../dataBase/users.js');
const database = require('../../dataBase/databases.js');

router.post('/checkUser', async (ctx) => {
    const user = ctx.request.body;
    let result = false;

    users.forEach(item => {
        if(item.userName === user.userName) {
            result = true;
        }
    })

    if(result){
        ctx.response.body = {status: true, text: 'Такое имя уже используется!'};
    } else {
        users.push(user);
        ctx.response.body = {status: false, html: database.html.chatWindow, name: {userName: user.userName}};
    }
});
module.exports = router;