
<template>

 <div id="parent-nav" class="w-100  bg-light" style="position: absolute; top: 0;">


  <!-- Navbar -->
  <nav class=" main-header navbar navbar-expand navbar-white navbar-light p-3 w-75">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">{{ translate('dashboard')}}</a>
      </li>
      </ul>
       <ul id="float-lang" class="navbar-nav ml-auto  me-3">

                <li class='nav-item' >
                   <select  v-model="selectedLang" class="nav-link" @change="ChangeLanguages()" id="select-id" >
                        <option value="en">English</option>
                        <option value="ar">عربي</option>
                   </select>
                 </li>
                 <li  class="nav-item dropdown" id="username" >
                    <button v-if="!token_admin" class="btn btn-light"> {{  translate("login")}} </button>
                    <button  v-else class="btn btn-light"  @click="logout()" title="logout">
                          {{ isAdmin }}
                    </button>
                 </li>

    </ul>
  </nav>
  </div>
  <!-- /.navbar -->
  <div class="content-wrapper">

  </div>
  <!-- Main Sidebar Container -->
  <aside id='sidebar' class="main-sidebar sidebar-dark-primary float-sm-end elevation-4 " >
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
      <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">{{  translate("admin")}} </span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
             <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
          </div>
         <div class="info">
            <a href="#" class="d-block">mohamed</a>
         </div>
      </div>

      <!-- SidebarSearch Form -->
      <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input class="search form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="name-sidebar nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-item menu-open">
            <a href="#" class="nav-link active">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                {{  translate("dashboard")}}
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/dashboard" class="nav-link active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>{{ translate("product") }}</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/CategoryDashboard" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>{{ translate("category") }}</p>
                </router-link>
              </li>
              <li class="nav-item">
                 <a href="#" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p> {{ translate("about") }}</p>
                 </a>
              </li>
            </ul>
          </li>

        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>


</template>
<script>
import ar from "../../../languages/pages/ar.js";
import en from "../../../languages/pages/en.js";
export default {
  mixins:[ar,en],
   data(){
    return{

      userName:"",
      token_admin:localStorage.token_admin? localStorage.token_admin :"",
      locale:"",
      isAdmin:localStorage.admin_name,
      selectedLang: 'en',
      // lang:localStorage['locale'] || "en"
    }
   },
   computed:{

   },
   methods:{
    logout(){
      swal({
            title: "Logout",
            text: "Are you Sure Logout?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                if(this.token_admin){
                localStorage.removeItem('token_admin');
                localStorage.removeItem("admin_name")
                this.$router.push("/loginDahboard");
                    swal("You have logged out", {
                      icon: "success",
                    });
              }
            }
        });
    },
    translate(props){
       return this[this.selectedLang][props];
    },
    ChangeLanguages(){
          // var select_lang = document.querySelector('#select-id')
        //  if(!localStorage.setItem('locale')){
          localStorage.setItem('locale',this.selectedLang)
        // }
          // var  getLocale = localStorage.getItem('locale');
          // console.log(this.locale)
           const lang = document.querySelector('html');
            //  console.log(getLocale);
           if(lang){
            lang.setAttribute("dir", this.selectedLang === "ar"?"rtl":"ltr");
            lang.setAttribute("lang", this.selectedLang );
            console.log(lang.dir);
            console.log(lang.lang)
          if(lang.lang === "ar"){
            //  document.body.style.fontFamily='Cairo';

                document.body.style.cssText="margin:0;padding:0"

                  // sidebar.className="d-none"
                  var nav = document.querySelector("nav")
                  // nav.style.cssText="position: absolute; left: -160px; display:flex;flex-direction:row-reverse; justify-content:space-around"
                   if(nav){
                     nav.classList.remove("w-75")
                     nav.style.cssText="display:flex;flex-direction:row-reverse;width:95%"
                   }

                    var float_ul = document.getElementById('float-lang')
                    if(float_ul){
                      float_ul.style.cssText="display:flex;flex-direction:row-reverse;position: absolute; left:30px;"
                    }
                 var container = document.querySelector('.content-wrapper');
                 if(container){
                  container.classList.remove("container")
                 container.style.marginRight="20px";
                 }


                 var allLabels = document.querySelectorAll("label");

                 if(allLabels){
                  allLabels.forEach((label)=>{
                      label.style.float="right"
                   })
                  }else{
                    console.log("not labels");
                  }
                  let allInputs =  document.querySelectorAll("input");
                    if(allInputs){
                      allInputs.forEach((input)=>{
                        input.style.cssText="direction: rtl;unicode-bidi: embed;"
                      })
                    }else{
                      console.log("not inputs");
                    }
                 let table= document.querySelector(".table")
                 if(table){
                    table.style.cssText="direction: rtl;margin-left:10px"
                 }
                 let modalHeader = document.querySelectorAll("#modal-header");

                  if(modalHeader){

                    modalHeader.forEach((modal)=>{
                     modal.lastChild.remove();
                       modal.style.cssText="display:flex;flex-direction:row-reverse;justify-content:space-between";
                    })
                  }
                let   modalFooter = document.querySelectorAll('.modal-footer')
                    if(modalFooter){
                        modalFooter.forEach(footer=>{
                           footer.style.cssText="display:flex;flex-direction:row-reverse;float:right"
                        })
                    }
                 const sidebar = document.querySelector("aside");
                 if(sidebar){
                    sidebar.style.position='fixed'
                    sidebar.style.right=0;
                    sidebar.style.marginLeft="-300px"
                 }

         }else{

         }
      }
    }
   },
   mounted(){
    this.selectedLang = localStorage['locale']
    this.ChangeLanguages()
   }

}
</script>
