<template>
  <main class="main">
    <div class="account">
      <div class="container">
        <h1 class="account__title">Register Customer</h1>
        <div class="account__form">
          <form @submit.prevent='createUser()'>
            <input type="text" class="txt"  placeholder="Username"      v-model= "users.name"  />
            <input type="email" class="txt txt--left" placeholder="E-mail"  v-model="users.email" />
            <input type="text" class="txt txt--left" placeholder="password" v-model= "users.password" />
            <input type="text" class="txt txt--left" placeholder="Phone"  v-model="users.phone" />
            <input type="text" class="txt txt--left" placeholder="Roles"  v-model="users.roles" />
            <button class="btn btn--brand btn--boxshadow w--100 margin--bottom-10">
              register
            </button>
            <button class="btn btn--cancel btn--cancel w--100">cancel</button>

            <div class="account__footer">
              <span>already have an account?</span>
              <router-link :to="{ name: 'Login' }" class="account__router">Login page</router-link>
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
      users:{
        name:"",
        email:"",
        password:"",
        phone:"",
        roles:""
      }
    }
   },
   methods:{
  async  createUser(){
    var users= this.users
    if(!(users.name==""| users.email==""| users.password==""| users.phone=="")){
      const res =  await axios.post("http://127.0.0.1:7000/add-new-user",this.users)
       if(res.data.status){
          swal(res.data.msg)
          this.users = "";
          this.$router.push("/login")
        //  console.log(user)
        }else{
          alert(res.data.msg)
       }
      }else{
        alert('Please fill in the data')
      }
    }
  },
}
</script>

<style></style>
