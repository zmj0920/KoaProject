const sql = require('../mysql/mysql.js');

//查询用户
exports.selectUser = async ctx => {
    let pageNum = ctx.request.query.pageNum
    let pageSize = ctx.request.query.pageSize
    let count
    await sql.userTotal().then(res => count=res[0].total)
    await sql.user(pageNum, pageSize).then((res) => {
        ctx.body = {data:res, total:Number(count),pageNum:Number(pageNum),pageSize:Number(pageSize)};
        ctx.response.status = 200;
    }).catch(() => {
        ctx.body = 'error'
    })
}
//删除用户
exports.deleteUser = async ctx => {
    let uid = ctx.request.body.uid;
    console.log(uid)
    await sql.deleteUserData(uid).then(() => {
        ctx.body = {
            code: 200,
            msg: '成功'
        }

    }).catch(() => {
        ctx.body = {
            code: 500,
            msg: '失败'
        }
    })
}
//修改用户信息
exports.updateUser = async ctx => {
    let uname = ctx.request.body.uname;
    let email = ctx.request.body.email;
    let phone = ctx.request.body.phone;
    let user_name = ctx.request.body.user_name;
    let gender = ctx.request.body.gender;
    let uid = ctx.request.body.uid;
    let values = [uname, email, phone, user_name, gender, uid]
    console.log(values);
    await sql.updateUser(values).then(() => {
        ctx.body = {
            code: 200,
            msg: '成功'
        }
    }).catch(() => {
        ctx.body = {
            code: 500,
            msg: '失败'
        }
    })
}
//添加信息
exports.insertUser = async ctx => {
    let values = ctx.request.body;
    await sql.insertUser(values).then(() => {
        ctx.body = {
            code: 200,
            msg: '成功'
        }
    }).catch(() => {
        ctx.body = {
            code: 500,
            msg: '失败'
        }
    })

}
