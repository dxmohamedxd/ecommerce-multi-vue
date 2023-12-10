<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="handleSidebar(true)">عرض الشريط الجانبي</button>

  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'About',

  setup() {
    const store = useStore()

    store.dispatch('products/getProducts', '')

    return {
      products: computed(() => store.state.products.products),
      isShowSideBar: false,
    }
  },
  components:{

  }
  ,
  methods:{
    handleSidebar(howSideBar){
       this.isShowSideBar=howSideBar
    }
  }

}
</script>
