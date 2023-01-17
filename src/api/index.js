import express from 'express'
import registers from './db.json' assert { type: "json" };
import {v4} from 'uuid'

const app = express()

app.set('port',3000)

app.use(express.json())

app.get('/registers', (req,res) => {
    res.json(registers)
})

app.get('/register/:id',(req,res) => {
    const {id} = req.params
    const register = registers.find(row => row.id === id)
    res.json(register)
})

app.listen(app.get('port'))
console.log(`server running on port ${app.get('port')}`);

