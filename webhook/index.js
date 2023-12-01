const express = require('express')
const app = express()
const cors = require('cors')
const port = 3001

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Home')
})

app.get("/trigger", async(req, res) => {
    const data = {
        secret: "rahasia",
        data: [
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
    }

    const response = await fetch("http://localhost:3000/webhook-event/", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const dataResponse = await response.json()

    if (dataResponse.message == "failed"){
        res.send("failed")

        return
    }

    res.send("success")
})

app.listen(port, () => {
  console.log(`Running localhost:${port}`)
})