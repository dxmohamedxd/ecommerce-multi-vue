<template>
  <div id="app">
    <BaseHeader @show-sidebar="(showSideBar) => handleSidebar(showSideBar)" />
      <router-view></router-view>

         <BaseFooter  v-if="isShowFooter && !isDashboard" :showSideBar="isShowSideBar" />


  </div>
</template>

<script>
import BaseHeader from './components/BaseHeader'
import BaseFooter from './components/BaseFooter'
//  import user from '@/modules/user/store'
// import products from '@/modules/product/store'
export default {
  data: () => ({
    isShowSideBar: true,
    // isDashbardPage:false
    isShowFooter: true,
  }),

  components: {
    BaseHeader,
    BaseFooter,
  },

  computed:{
     isDashboard(){

      return this.$route.name === "dashboard" | this.$route.name === "CategoryDashboard"

     }
  },
  methods: {
    handleSidebar(showSideBar) {
      this.isShowSideBar = showSideBar
    },

  },

  created() {
    // if (! this.$store.hasModule('userName')) {
    // this.$store.registerModule('userName', user)
    // }
    // if (! this.$store.hasModule('products')) {
    // this.$store.registerModule('products', products)
    // }
  }
}
</script>

<style></style>
