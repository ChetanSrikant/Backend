const http = require('http')

const server = http.createServer((req, res) => {  
  if(req.url == "/about"){
    res.end('this is about page')
  }
  if(req.url == "/contact"){
    res.end('this is contact page')
  }
  else{
    res.end('this is home page')
  }
})          

server.listen(3000)