<template>
   <headerView></headerView>
  <div class="content-wrapper" >
 <div class="container">
    <div class="col-md-6 offset-3 mt-3 col-sm-12">
        <h2 class="text-center">add new product </h2>
 <form @submit.prevent="craeteProduct()">
    <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">name</label>
        <input type="text" class="form-control p-3" id="exampleFormControlInput1"  v-model="name">
    </div>
    <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">price</label>
        <input type="text" class="form-control p-3" id="exampleFormControlInput1" v-model="price">
    </div>
    <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">category</label>
       <select class="form-select p-3" v-model="category_id">

        <option v-for="item in category"  :key="item.category_id"  :value="item.category_id" >{{item.name_category}}</option>

       </select>
    </div>
    <div class="mb-3">
        <label for="desc" class="form-label">description</label>
        <input type="text" class="form-control p-3" id="desc" v-model="descr">
    </div>
    <div class="mb-3">
        <label for="img" class="form-label">image</label>
        <input type="file" class="form-control p-3" name="image" id="img"  @change="UploadImage" >
    </div>
     <button type="submit" class="btn btn-primary text-center">Add</button>
   </form>
</div>
   </div>
   </div>
  </template>

  <script>
  import headerView from '../component/layout/headerView.vue'
import axios from 'axios'

  export default {
    data(){
        return{
            product:{},
            category:{},
            name:"",
            price:null,
            descr:"",
            image:null,
            category_id : this.category_id


        }
    },
    components:{
      headerView
    },
    methods:{
      UploadImage(event){

          this.image = event.target.files[0]
          console.log(this.image)

        },
      async craeteProduct(){
            let formData = new FormData();
            formData.append('name',this.name)
            formData.append("price",this.price)
            formData.append('image',this.image)
            formData.append("descr",this.descr)
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
            }else{
                console.log(res.data.msg)
            }
        },
     async geCategory(){
       const   res = await axios.get('http://127.0.0.1:7000/get-category')
         if(res.data.status){
            this.category = res.data.category
          console.log(res.data.category);
         }


     }
    },
    created(){
      this.geCategory()
    }
  }
  </script>

  <style></style>
