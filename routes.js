const names = ['N', 'N', 'M', 'M', 'R']

const routes = (req, res) => {
  if (req.url === '/') {
    res.write('<html><h1>Hi there</h1>')
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
    )
    res.write('</html>')
    return res.end()
  }

  if (req.url === '/users') {
    res.write('<html>')
    if (req.url === '/users') {
      for (let i = 0; i < names.length; i++) {
        res.write(names[i] + '<br/>')
      }
    }
    res.write('</html>')
    res.end()
  }

  if (req.url === '/create-user' && req.method === 'POST') {
    const body = []
    req.on('data', data => {
      body.push(data)
    })
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString()
      console.log(parsedBody.split('=')[1])
      return res.end()
    })
    res.statusCode = 302
    res.setHeader('Location', '/')
  }
}

module.exports = routes
