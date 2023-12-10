<template>
    <main class="main">
    <div class="account">
      <div class="container">
        <h1 class="account__title">Login admin</h1>
        <div class="account__form">
          <form action="" >
            <input type="text" class="txt txt--left" placeholder="username or email" v-model="admins.name"/>
            <input type="text" class="txt txt--left" placeholder="password" v-model="admins.password" />
            <label class="ui-checkbox">
              <input type="checkbox" class="ui-checkbox__input" />
              <span class="ui-checkbox__mark"></span>
              remember me
            </label>
            <router-link
              :to="{ name: 'ResetPass' }"
              class="account__recoverpass" >reset password</router-link>
            <button type="button" class="btn btn--brand btn--boxshadow w--100" @click="loginDamin()" >login</button>


          </form>
        </div>
      </div>
    </div>
  </main>
</template>
<script>

import headerView from '../component/layout/headerView.vue'
import axios from 'axios';
export default {
     data(){
      return{
         admins:{
          name:"",
          password:""
         }
      }
     },
     components:{
      headerView,

     },
     methods:{
      async loginDamin(){
        if(!(this.admins.name=="" |  this.admins.password == "")){
            const res =  await axios.post("http://127.0.0.1:7000/login-admin",this.admins)
            if(res.data.status){

            try{
                  localStorage.setItem("token_admin",res.data.token);
                localStorage.setItem("admin_name",res.data.name);
             
                  this.$router.push("/dashboard");
                  // location.reload();

                }catch{

                // console.log("error");
              }
            }


            }else{
             swal('please fill fiald');
          }
      }
     }

}
</script>
