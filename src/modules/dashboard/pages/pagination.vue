<template>
    <div class="row">
              <div class=" col-sm-12">
                  <div class="products" style="margin-top: 20px;">
                    <div  v-for="(item) in products" :key="item.id" class="products__item">
                        <div class="card">
                          <div class="card__image">
                            <img
                              :src="Url + item.image"
                              alt="logo"
                              class="card__img"
                            />
                          </div>
                          <div class="card__title">
                            {{ item.name }}
                          </div>
                          <div class="card__price">
                            <span class="card__total-price">
                              {{item.price}}</span>
                          </div>
                          <span class="card__discount">%6</span>

                            <!-- <div id ="buttonAccess">
                              <button class="btn btn-outline-success btn-sm float-left editButton "  @click="showMyModal(item)" style="width:45%">{{ translate("edit")}}</button>
                              <button  @click="deleteItem(item.id)" class="btn btn-outline-danger float-right btn-sm w-50">{{ translate("delete")}}</button>
                            </div> -->

                        </div>
                    </div>
                </div>

              </div>
          </div>
<paginate
:page-count="5"
:page-range="3"
:margin-pages="2"
:click-handler="clickCallback"
:prev-text="'Prev'"
:next-text="'Next'"
:container-class="'pagination'"
:page-class="'page-item'"
>
</paginate>

</template>

<script>
import axios from 'axios';
import Paginate from 'vuejs-paginate-next';
export default {
  data(){
    return{
     NumPage:{},
     products:{},
     Url:'http://127.0.0.1:7000',
    }
  },
components: {
  paginate: Paginate,
},
    methods:{
    async  clickCallback(pageNum){
       this.NumPage = pageNum
      let res =  await axios.get(`http://localhost:7000/limit-offset-product/${pageNum-1}`)
      if(res.status){
        this.products = res.data.product;
        console.log(res.data.product);
      }
      }
    },
  created(){
    // this.clickCallback();
  }
}
</script>

<style lang="css">
/* Adopt bootstrap pagination stylesheet. */
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

/* Write your own CSS for pagination */
.pagination{
   margin-top: 20px;
 }
.page-item {
}
</style>

