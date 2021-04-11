require('./init')
const chartuserService = require("./service/chartuserService")
const express = require('express')
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io').listen(server)
const path = require('path')
let users = [];
let curUser='';
app.use(express.static(path.resolve(__dirname,'public')))
io.on("connection",(socket) =>{
    socket.on("login",async(data) =>{
        if(curUser == data.loginName){
            socket.emit('login',false)
            return
        }
      const result = await chartuserService.login(data.loginName,data.loginPwd);
      if(result){
          socket.emit("login",true)
          socket.broadcast.emit("userin",result.loginName)
          socket.emit("userin",result.loginName);
            users.push({
                username:data.loginName,
                socket
            })
            curUser = data.loginName
            const all = await chartuserService.getAllUser();
            socket.emit('getAll',all.length)
            socket.broadcast.emit('getAll',all.length);
            const inlineUser = [];
            users.forEach((el) =>{
                inlineUser.push(el.username)
            })
            socket.broadcast.emit('getInline',Array.from(inlineUser))
      }else{
          socket.emit("login",false)
      }
    })
    socket.on('users',async()=>{
        const all = await chartuserService.getAllUser();
        socket.emit('getAll',all.length)
        const inlineUser = [];
        users.forEach((el) =>{
            inlineUser.push(el.username)
        })
        socket.emit('getInline',Array.from(inlineUser))
    })
    socket.on("register",async(data) =>{
        console.log(data)
        const result = await chartuserService.addUser(data);
        if(result){
            socket.emit("register",true)
        }else{
            socket.emit("register",false)
        }
    })
    socket.on("msg",(data)=>{
        if(data.to){
            const us = users.filter((user) => user.username == data.to)
            const u = us[0];
            console.log('aaa')
            u.socket.emit("newMsg",{
                content:data.content,
                from:data.from,
                to:data.to
            })
        }else{
            socket.broadcast.emit("newMsg",data)
            socket.emit("newMsg",data)
        }
    })
})
server.listen(5000)