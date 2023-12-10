<template>
  <headerView></headerView>
  <div class="content-wrapper">
    <div class="container mb-5">
      <button  @click="showMyModal2()" class="btn btn-primary my-3 btn-sm"><span style="font-size: 15px; font-weight: bold;">+</span></button>
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

                            <div id ="buttonAccess">
                              <button class="btn btn-outline-success btn-sm float-left editButton "  @click="showMyModal(item)" style="width:45%">{{ translate("edit")}}</button>
                              <button  @click="deleteItem(item.id)" class="btn btn-outline-danger float-right btn-sm " style="width: 50%;">{{ translate("delete")}}</button>
                            </div>

                        </div>
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
<!-- <input type="number" v-model="NumPage" @input="setNumPage" /> -->

       <!-- Modal update -->
<div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" id="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{  translate("edit")}} {{  translate("product")}}  { {{ getItems.id  }}  }</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="updateProduct(getItems.id)" mimetype="multipart/form-data" >
          <div class="modal-body">

    <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">{{  translate("name")}}</label>
        <input type="text" class="form-control" id="exampleFormControlInput1"  v-model="getItems.name">
    </div>
    <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">{{  translate('price')}}</label>
        <input type="text" class="form-control" id="exampleFormControlInput1"  v-model="getItems.price">
    </div>
    <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">{{  translate("category")}}</label>
       <select class="form-select p-3" v-model="getItems.category_id">

           <option v-for="item in category"  :key="item.category_id"  :value="item.category_id" >{{item.name_category}}</option>

       </select>
    </div>
    <div class="mb-3">
        <label for="desc" class="form-label">{{ translate("descr")}}</label>
        <input type="text" class="form-control" id="desc" v-model="getItems.descr">
    </div>
    <div class="mb-3 text-center">
        <label for="img" class="form-label"> <img :src=" Url+getItems.image" width="200" height="150"></label>
        <input type="file" class="form-control"  name="image" @change="onFileChange" id="img" style="display: none;">
    </div>

          </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary">{{  translate("edit")}}</button>

        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="hideMyModal()">{{ translate('close')}}</button>
      </div>
    </form>
    </div>
  </div>
</div>

      <!-- Modal create -->
<div class="modal fade" id="adddModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" id="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"> {{ translate("newproduct") }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="addProduct()" >
          <div class="modal-body">

    <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"> {{ translate("name") }}</label>
        <input type="text" class="form-control" id="exampleFormControlInput1"  v-model="name">
    </div>
    <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">{{ translate("price") }}</label>
        <input type="text" class="form-control" id="exampleFormControlInput1"  v-model="price">
    </div>
    <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">{{translate("category") }}</label>
       <select class="form-select p-3" v-model="category_id">

        <option v-for="item in category"  :key="item.category_id"  :value="item.category_id" >{{item.name_category}}</option>

       </select>
    </div>
    <div class="mb-3">
        <label for="desc" class="form-label">{{ translate("descr")}}</label>
        <input type="text" class="form-control" id="desc" v-model="descr">
    </div>
    <div class="mb-3">
        <label for="desc" class="form-label"> {{ translate("qty") }}</label>
        <input type="number" class="form-control" id="desc" v-model="qty">
    </div>
    <div class="mb-3">
        <label for="img" class="form-label">{{  translate("image") }}</label>
        <input type="file" class="form-control p-3" name="image" id="img"  @change="onFileChange" >
    </div>
          </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary">{{translate("add")}}</button>

        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="hideMyModal()">Close</button>
      </div>
    </form>
    </div>
  </div>
</div>
</div>
</template>
<script>
import ar from "../../languages/pages/ar.js";
import en from "../../languages/pages/en.js";
import headerView from '../component/layout/headerView'
import axios from 'axios'
import { Modal} from 'bootstrap';
import Paginate from 'vuejs-paginate-next';
import { useStore } from 'vuex';
export default {
  mixins:[ar,en],
  data(){
    return{
     store :useStore(),
      NumPage: 1,
      products:{},
      category:{},
      Url:'http://127.0.0.1:7000',
      getItems:{},
      myModal:null,
      myModal2:null,
      name:"",
      price:null,
      descr:"",
      qty:0,
      image:null,
      category_id : this.category_id,
      token: localStorage.token_admin? localStorage.token_admin :"",
      lang:localStorage['locale'] || "en"

    }
  },
  components:{
     headerView,
     paginate: Paginate,
  },
  computed:{
    IsAdmin(){
      if(this.$route.name === "dashboard"){
          // console.log("yes................");
       }
    },
    // RefreshPage(){
    //   const lang = document.querySelector('html');
    //  if(lang.lang == "ar"){
    //       location.reload();
    //   }
    //  }
  },
  methods:{
    translate(props){
    return this[this.lang][props];
    },
    async geCategory(){

       const   res = await axios.get('http://127.0.0.1:7000/get-category')
         if(res.data.status){
            this.category = res.data.category
          console.log(res.data.category);
         }
     },

    async deleteItem(id){

      var x = confirm("Are You Sure delete ?")
        if(x){
          var res =  await axios.delete("http://127.0.0.1:7000/delete-product/"+id)
                    if(res.data.status){
                      alert(res.data.msg)
                      this.getProducts()

                    }else{
                      console.log("errr")
                    }

        }

    },
     showMyModal2() {
            this.myModal2 = new Modal("#adddModal")
            this.myModal2.show();
        },
        showMyModal(item) {
            this.getItems = item
            console.log(this.getItems);
            this.myModal = new Modal("#updateModal")
            this.myModal.show();
        },
        hideMyModal() {
             this.myModal.hide();
       },
       onFileChange(event){
      this.image  = event.target.files[0];
      console.log(this.image.name)
    },
    async addProduct(){
            let formData = new FormData();
            formData.append('name',this.name)
            formData.append("price",this.price)
            formData.append('image',this.image)
            formData.append("descr",this.descr)
            formData.append("qty",this.qty)
            formData.append("category",this.category_id)
            let config = {

                    headers: { 'content-type': 'multipart/form-data' }

                    }

            console.log(formData)
            const res =  await axios.post("http://127.0.0.1:7000/add-new-product",formData,config)
            if(res.data.status){
                alert(res.data.msg)
                this.name="";
                this.price=null;
                this.image= "";
                this.descr="";
                this.category=""
                this.myModal2.hide();
                this.getProducts(),
                this.geCategory()
            }else{
                console.log(res.data.msg)
            }
          },
     async  updateProduct(id){
    Object.assign(this.editItem,this.getItems)
           const name  =  this.editItem.name;
           const  price   = this.editItem.price;
           const descr   =   this.editItem.descr;
           const  category = this.editItem.category_id;
          // const oldImage =this.editItem.image;
           const formData = new FormData();

           formData.append('name',name)
            formData.append("price",price)
           formData.append("image", this.image);
            formData.append("descr",descr)
            formData.append("category_id",category)


        let config = {

             headers: { 'content-type': 'multipart/form-data' }

             }


        const res = await axios.put("http://127.0.0.1:7000/edit-product/"+id,formData,config)
        if(res.data.status){

          alert(res.data.msg);
          this.myModal.hide();
          this.getProducts()
        }else{
          console.log(res.data.msg)
        }

    },
    setNumPage() {
      // set the number of the page to be loaded
      this.NumPage = Number(this.$refs.NumPage.value);
    },
    async  clickCallback(pageNum=1){
      this.NumPage = pageNum
      if(this.token != ""){
          let res =  await axios.get(`http://localhost:7000/limit-offset-product/${pageNum-1}`)
          if(res.status){
            this.products = res.data.product;
            console.log(res.data.product);
          }
       }
      },
     async  getProducts(){
      console.log(`${this.token} ............token `);
      if(this.token != ""){
     const res =  await axios.get("http://127.0.0.1:7000/get-all-product")
     if(res.data.status){

        // this.products = await res.data.product

         console.log(this.products)

     }
    }else{
             this.$router.push("/loginDahboard");
    }
    }

  },
  created(){
    this.geCategory(),
    this.getProducts().then(() => {
      this.clickCallback();
    });
  }
 }
</script>
<style lang="css">
/* Adopt bootstrap pagination stylesheet. */
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

/* Write your own CSS for pagination */
.pagination{
   margin-left:  30px ;
   margin-bottom: 30px;
 }
.page-item {
}
</style>
