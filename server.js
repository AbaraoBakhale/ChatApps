const express=require("express");
const { Socket } = require("socket.io");
const app=express();

const http=require('http').createServer(app)

const PORT=process.env.PORT || 2400
http.listen(PORT,()=>{
    console.log(`listening http://localhost:${PORT}`)
})
// read pub folder use middleware
app.use(express.static(__dirname + '/pub'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

// require socket
// declare variable and require socket.io library.
const io=require("socket.io")(http)
io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})