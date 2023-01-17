import './style.css'
import {v4 as uuid} from 'uuid'
import { Component } from './Component'
import axios from 'axios'

export interface User {
  name:string,
  email:string,
  id:string
}

export interface DataState {
  users: User[],
  editUser: User | null
}

//state global
//debe ser inmutable
/*const state:DataState = {
  users:[],
  editUser:null,
}*/

export const deleteUser = (id:string) => { 
  const prevState:DataState = app.getState()
  app.setState({
    users:prevState.users.filter((user) => user.id !== id)
  })
}

export const editUserFun = (user:User) => {
  app.setState({editUser:user})
  const name = document.getElementById('name') as HTMLInputElement
  const email = document.getElementById('email') as HTMLInputElement
  const btnSubmit = document.getElementById('btn-submit') as HTMLButtonElement
  name.value = user.name
  email.value = user.email
  btnSubmit.textContent='update'
}

const app = new (Component as any)({
  container:'#table-container',
  state:{
    users:[],
    editUser:null,
  },
  template: function (props:{users:User[]}) {
    if(props.users.length===0) return `<div><h3>No users!</h3></div>`

    const tableBody = props.users.map(({name,email,id}) => {
      return `
        <tr>
          <td>${name}</td>
          <td>${email}</td>
          <td><button data-id="${id}">delete</button></td>
          <td><button data-user="${[name,email,id]}">edit</button></td>
        </tr>
        `}
    ).join('')
  
    const tableTemplate = `
    <table>
      <thead>
        <th>Name</th>
        <th>Email</th>
      </thead>
      <tbody>
        ${tableBody}
      </tbody>  
    </table>
    `
  
    return tableTemplate
  }
}) 

document.addEventListener('DOMContentLoaded',app.render)

app.setState({
  users: await getData()
})

const handleSubmit = (e:SubmitEvent):void|boolean => {
  e.preventDefault()
  const name = document.getElementById('name') as HTMLInputElement
  const email = document.getElementById('email') as HTMLInputElement
  if(name.value==='' || email.value==='') return false
  
  if(app.state.editUser===null){

    const user = {
      name:name.value,
      email:email.value,
      id: uuid()
    }

    const prevState:DataState = app.getState()
    prevState.users.push(user)
    app.setState({users:prevState.users})

  } else if(app.state.editUser) {

    const user = {
      name:name.value,
      email:email.value,
      id: app.state.editUser.id
    }

    const prevState:DataState = app.getState()
    const index = prevState.users.findIndex(({id}) => id===app.state.editUser.id)
    prevState.users[index] = user

    app.setState({
      users:prevState.users,
      editUser: null,
    })

  }

  name.value=''
  email.value=''

  app.render()
}

const form = document.getElementById('form') as HTMLFormElement
form.addEventListener('submit', handleSubmit)
form.reset()

async function getData(){
  const res = await axios.get('http://localhost:3000/registers')
  return res.data 
}