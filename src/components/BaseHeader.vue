<template>
  <header class="header header--bg">
    <div class="header__shape">
      <div class="header__shape-inner"></div>
    </div>



    <div   class="container">
      <div    v-if='isShowNavbar && !isDashboard'   class="navbar">
        <div class="navbar__row" style="justify-content: space-between; width: 100%">
          <div   class="header__logo">
            <router-link
              :to="{ path: '/' }" class="header__logo-img"></router-link>
          </div>
          <div class="navbar__items" :class="{ 'navbar__items--is-active': showSideBar }">
            <ul    class="navbar__ul">
              <li   class="navbar__item">
                <router-link
                  to="/category"
                  class="navbar__link navbar__link--is-active"
                  >home</router-link
                >
              </li>
              <li   class="navbar__item navbar__item--has-sub">
                <router-link to="/" class="navbar__link">Categories</router-link>
                <ul class="navbar__subset" >
                  <!-- <li v-for ="(category) in categories" :key="category.category_id"  class="navbar__item" >

                      <router-link to="/category" class="navbar__link">{{ category.name_category }} </router-link>
                  </li> -->
                </ul>
              </li>
              <!-- <li class="navbar__item">
                <router-link :to="{ name: 'product' }" class="navbar__link">Product</router-link>
              </li> -->
              <li   class="navbar__item">
                <router-link :to="{ path: '/about' }" class="navbar__link"
                  >About us</router-link>
              </li>
              <li  class="navbar__item">
                <router-link :to="{ path: '/about' }" class="navbar__link" >Contact us</router-link>
              </li>
              <li   class="navbar__item">
                <router-link :to="{ path: '/dashboard' }" class="navbar__link" >Dashboard</router-link>
              </li>
            </ul>
          </div>
          <div    class="navbar__action">
            <div class="header__basket">
              <span
                class="header__basket-icon"
                @click="showDropDownBasket"
              ></span>
              <span class="header__basket-count">{{cart.length}}</span>
              <div
                class="header__dropdown"
                :class="{ 'header__dropdown--is-active': isBasketDropDown }"
              >
                <div
                  class="header__dropdown-content header__dropdown-content--overflow">
                  <div
                    class="header__basket-item"
                    v-for="item in cart"
                    :key="item">
                    <a href="" class="header__basket-link">
                      <img
                        :src="'http://127.0.0.1:7000'+ item.image"
                        class="header__basket-img"
                      />

                    </a>
                    <div class="header__basket-details">
                      <h5>
                        <a class="header__basket-title" href="">{{ item.name }}</a>
                      </h5>
                      <div class="header__basket-price">
                        {{ item.price }}
                        <!-- {{ formattedPrice(item.price) }} -->
                      </div>
                      <div class="header__basket-price">
                        <form>
                         <input type="number" v-model="item.qty">
                        </form>

                        <!-- {{ formattedPrice(item.price) }} -->
                      </div>
                      <button
                        @click="removeItemLocalStorage(item.id)"
                        class="header__basket-remove">
                        remove
                      </button>
                    </div>
                  </div>
                  <div class="header__basket-btn">

                 <button class="btn btn--boxshadow btn--brand w--100" @click="showMyModal()">complete order</button>

                  </div>
                </div>
              </div>
            </div>
            <div class="header__account">
              <span
                class="header__account-icon"
                @click="showDropDownAccount"
              ></span>
              <div
                class="header__dropdown header__dropdown--w200"
                :class="{ 'header__dropdown--is-active': isAccountDropDown }">
                <div class="header__dropdown-content">
                  <a   v-if="token"  class="header__account-link"  @click="logoutUser()"> Logout </a>
                   <a v-else class="header__account-link"><router-link    :to="{ name: 'Login' }" >Login</router-link></a>
                </div>
              </div>
            </div>
            <div
              class="header__menu"
              :class="{ 'header__menu--is-active': showSideBar }"
              @click="toggleSidebar"
            ></div>
          </div>
        </div>
      </div>
    </div>

  </header>

  <div class="modal fade" id="Modal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">

    <div class="modal-content">
      <div class="modal-header">
        <h1> order </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="OrderProduct()" >
          <div class="modal-body">

    <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">address</label>
        <input type="text" class="form-control" id="exampleFormControlInput1"  v-model="address">
    </div>


    </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary">Order</button>

        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="hideMyModal()">Close</button>
      </div>
    </form>
    </div>

  </div>
</div>

</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import axios  from 'axios';
import { Modal} from 'bootstrap';
export default {
  name: 'BaseHeader',

  data: () => ({
    isBasketDropDown: false,
    isAccountDropDown: false,
    showSideBar: false,
    categories:{},
    id:0,
    name:"",
    order:{},
    address:"",
    cart:localStorage.cart?JSON.parse(localStorage.cart):[],
    token:localStorage.token,
    isShowNavbar:true,

    // qty:1
  }),

  computed: {
    ...mapState('cart', ['items']),
    ...mapGetters('cart', ['count']),

    isDashboard() {
    if(this.$route.name === "dashboard" | this.$route.name === "CategoryDashboard" ){
      return this.$route.name === "dashboard" | this.$route.name === "CategoryDashboard"
    }
    },


  },

  methods: {
    isDashboard(){

         this.isNavbarVisible = false;

      },
    showDropDownBasket() {
      this.isAccountDropDown = false
      this.isBasketDropDown = !this.isBasketDropDown
    },
    showDropDownAccount() {
      this.isBasketDropDown = false
      this.isAccountDropDown = !this.isAccountDropDown
    },
    eventListener(event) {
      if (!event.target.closest('.header__basket,.header__account')) {
        this.isBasketDropDown = false
        this.isAccountDropDown = false
      }
      if (!event.target.closest('.navbar')) {
        this.showSideBar = false

        this.$emit('show-sidebar', false)
      }
    },
    async geCategory(){
      const   res = await axios.get('http://127.0.0.1:7000/get-category')
         if(res.data.status){
            this.categories = res.data.category
          console.log(this.categories);
         }
    },
    toggleSidebar() {
      this.showSideBar = !this.showSideBar

      this.$emit('show-sidebar', this.showSideBar)
    },
    formattedPrice(price) {
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD'
      }).format(price)
    },
    // ...mapActions('cart', ['removeItem']),
    removeItemLocalStorage(id){
      this.cart = localStorage.cart?this.cart:[];

    this.cart.forEach((el ,index) => {
      if(el.id == id){
        this.cart.splice(index,1)
        localStorage.setItem("cart" , JSON.stringify(this.cart))
      }
      this.cart = localStorage.cart?JSON.parse(localStorage.cart):[];
   });
    },
 async  OrderProduct(){
  var user_id = localStorage.getItem('user_id');
       this.cart.forEach((product)=>{
        product.address = this.address;
        product.user_id = user_id;
      })
      let token =  localStorage.token
         console.log(token);
        var res = await axios.post("http://127.0.0.1:7000/add-new-order",this.cart,{
                              headers: {Authorization: `Bearer ${token}`,}});
        if(res.status){
          alert(res.data.msg);
          this.myModal.hide();
          localStorage.removeItem('cart');
          location.reload();
        }else{
          alert(res.data.msg)
        }
      },
      logoutUser(){
        swal({
            title: "Logout",
            text: "Are you Sure Logout?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                if(this.token){
                localStorage.removeItem('token');
                localStorage.removeItem("user_id")
                this.$router.push("/login");
                    swal("You have logged out", {
                      icon: "success",
                    });
              }
            }
        });
      //  if(this.token){

      //     localStorage.removeItem('token');
      //     localStorage.removeItem("user_id")
      //     this.$router.push("/login");
      //     // location.reload();
      //  }else{

      //  }
      },
      showMyModal() {

            // this.getItems = item
            // console.log(this.getItems);
            this.myModal = new Modal("#Modal2")
            this.myModal.show();
        },
      hideMyModal() {
              this.myModal.hide();
        },
  },

  mounted() {
    document.addEventListener('click', this.eventListener)
  },

  unmounted() {
    document.removeEventListener('click', this.eventListener)
  },
  created(){

     this.geCategory();
    //  this.order_delaits()
    //  this.OrderProduct()

  }
}
</script>

<style></style>
