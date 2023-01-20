import express from 'express'
import registers from './db.json' assert { type: "json" };
import cors from 'cors'

const app = express()

app.set('port',3000)

app.use(express.json())
app.use(cors())

app.get('/api/registers', async (req,res) => {
    res.json(registers)
})

app.get('/api/register/:id',(req,res) => {
    const {id} = req.params
    const register = registers.find(row => row.id === id)
    res.json(register)
})

app.post('/api/register', (req,res) => {
    //reescribir json
})

app.listen(app.get('port'))
console.log(`server running on port ${app.get('port')}`);

