const ChartUser = require('../model/ChartUser');
exports.addUser =async function(userObj){
    const ins = await ChartUser.create(userObj);
    return ins.toJSON();
}

exports.updateAdmin = async function(id,userObj){
await ChartUser.update(userObj,{
    where:{
        id
    }
})
}
exports.login = async function(loginName,loginPwd){
    const res = await ChartUser.findOne({
        where:{
            loginName,
            loginPwd
        }
    })
    if(res && res.loginName === loginName && res.loginPwd === loginPwd){
        return res.toJSON();
    }
    return null
}
exports.getAllUser = async function(){
    const res = await ChartUser.findAll();
    return JSON.parse(JSON.stringify(res))

}