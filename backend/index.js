const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Home')
})

const usersData = [
    {
        id: 1,
        username: "umar",
        password: "12344321"
    },
    {
        id: 2,
        username: "jihad",
        password: "abcddcba"
    }
]

app.get('/users', (req, res) => {
  res.json({
    status: 200,
    data: usersData.map(item => ({id: item.id, username: item.username}))
  })
})

app.post('/users', (req, res) => {
    const userData = req.body

    const response = usersData.filter(data => {
        if (data.username == userData.username && data.password == userData.password){
            return data
        }
    })

    let message;
    if (response.length == 1){
        message = "login success"
    }
    else {
        message = "login failed"
    }

    res.json({
        message: message
    })
})

app.post("/webhook-event", (req, res) => {
    const data = req.body
    if (data.secret !== "rahasia"){
        res.json({
            message: "failed"
        })

        return
    }

    console.log(data.data)

    res.json({message: "success"})
})

app.listen(port, () => {
  console.log(`Running localhost:${port}`)
})