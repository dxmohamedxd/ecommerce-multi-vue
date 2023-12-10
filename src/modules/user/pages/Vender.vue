<template>
    <main class="main">
      <div class="account">
        <div class="container">
          <h1 class="account__title">Register Vender</h1>
          <div class="account__form">
            <form  @submit.prevent="createVender()">
              <input type="text" class="txt"  placeholder=" Username" v-model="vender.name"  />
              <input type="email" class="txt txt--left" placeholder="E-mail"  v-model="vender.email" />
              <input type="text" class="txt txt--left" placeholder="Password" v-model="vender.password" />
              <input type="text" class="txt txt--left" placeholder="Service" v-model="vender.service" />
              <button type="submit"
                class="btn btn--brand btn--boxshadow w--100 margin--bottom-10">
                register
              </button>
              <button class="btn btn--cancel btn--cancel w--100">cancel</button>
  
              <div class="account__footer">
                <span>already have an account?</span>
                <router-link :to="{ name: 'Login' }" class="account__router"
                  >Login page</router-link
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script>
 import axios from 'axios';
  export default {
    data(){
      return{
        vender:{
          name:"",
          email:"",
          password:"",
          service:""
        }
      }
    },
    methods:{
      async createVender(){
        if(!(this.vender.name =="" | this.vender.email =="" | 
        this.vender.password =="" | this.vender.service =="")){
              const  res = await axios.post("http://127.0.0.1:7000/add-new-vender",this.vender)
              console.log(res.data.msg)
              if(res.data.status){
                console.log(res.data)
                  alert(res.data.msg)
                  this.vender=""
              }else{
                alert(res.data.msg)
              }
          }else{
            alert("Please fill in the data")
          }
         }
      }  
    }
  </script>
  
  <style></style>
