<template>
  <main class="main">
    <div class="account">
      <div class="container">
        <h1 class="account__title">Login User</h1>
        <div class="account__form">
          <form action="" >
            <input type="text" class="txt txt--left" placeholder="username or email" v-model="users.name"/>
            <input type="text" class="txt txt--left" placeholder="password" v-model="users.password" />
            <label class="ui-checkbox">
              <input type="checkbox" class="ui-checkbox__input" />
              <span class="ui-checkbox__mark"></span>
              remember me
            </label>
            <router-link
              :to="{ name: 'ResetPass' }"
              class="account__recoverpass" >reset password</router-link>
            <button type="button" class="btn btn--brand btn--boxshadow w--100" @click="LoginUser()" >login</button>

            <div class="account__footer">
              <span>dont have an account?</span>
              <router-link :to="{ name: 'Register' }" class="account__router">register page</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
 import axios from 'axios';
//  import About from "@/pages/About.vue'"
export default {
  data(){
    return{
      users:{
        name:'',
        password:"",
      },
    }
  },
  methods:{
   async LoginUser(){
    this.users
        if(!(this.users.name=="" |  this.users.password == "")){
            const res =  await axios.post("http://127.0.0.1:7000/login-user",this.users)
            if(res.data.status){

            try{
                  localStorage.setItem("token",res.data.token);
                  localStorage.setItem("user_id",res.data.id);
                  swal({
                    title: "Good job!",
                    text: res.data.msg,
                    icon: "success",
                    button: "Ok",
                  });

                  this.$router.push("/");
                  // location.reload();

                }catch{

                // console.log("error");
              }
            }


            }else{
              // swal('Hello Vue world!!!');
          }
      }
  }
}
</script>

<style></style>
