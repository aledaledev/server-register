import { DataState, deleteUser, editUserFun, User } from "./main"

export function Component(this: any, options:{container:string, state:DataState,template:(props:{users:User[]})=>string}){
  this.container = options.container
  this.state = options.state
  this.template = options.template

  this.render = function(){
      const element = document.querySelector(this.container)
      if (!element) return;
      element.innerHTML = this.template(this.state)

      const nodeList = document.querySelectorAll('button')
      const btnsArr = Array.prototype.slice.call(nodeList);

      btnsArr.forEach((btn:HTMLButtonElement) => {
        if(btn.dataset.id){
          btn.addEventListener('click',() => deleteUser(btn.dataset.id as string))
        }
        if(btn.dataset.user){
          const [name,email,id] = btn.dataset.user.split(',')
          btn.addEventListener('click',() => editUserFun({name,email,id}))
        }
      })
  }

  this.setState = function(obj:any){
      for(let key in obj) {
        if(this.state.hasOwnProperty(key)){
          this.state[key] = obj[key]
        }
      }
      this.render()
  }

  this.getState = function(){
    return JSON.parse(JSON.stringify(this.state)) 
  }

  //return Constructor
};