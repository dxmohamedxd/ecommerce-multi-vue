<template>
<headerView></headerView>
  <div class="content-wrapper" >
    <div class="container mb-3">
      <div class="row">
          <div class="col-2">
             <button  @click="showMyModal2()" class="btn btn-primary my-3 btn-sm"><span style="font-size: 15px; font-weight: bold;">+</span></button>
          </div>
          <div class="col-md-8 my-3 table-responsive">
            <table class="table">
                <tr>
                  <th>#</th>
                  <th>{{  translate("name")}}</th>
                  <th>{{  translate("action")}}</th>
                </tr>
                <tr  v-for="item in category" :key="item">
                    <td>{{  item.category_id}}</td>
                    <td>{{ item.name_category}}</td>
                    <td>
                        <button @click="showMyModal3(item)" class="btn btn-outline-success btn-sm"> {{  translate("edit")}}</button>
                        <button @click="DeleteCategory(item.category_id)" class="btn btn-outline-danger float-right btn-sm"> {{  translate("delete")}}</button>
                    </td>
                </tr>

              </table>

          </div>
  </div>
  </div>
    <!-- create new category -->
    <div class="modal fade" id="CreateMdodel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" id="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{ translate("newcategory") }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="addCategory()" >
               <div class="modal-body">

                  <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">{{  translate("name")}}</label>
                      <input type="text" class="form-control" id="exampleFormControlInput1"  v-model="name">
                  </div>
               </div>
       <div class="modal-footer">
        <button type="submit" class="btn btn-primary">{{ translate("add")}}</button>

        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="hideMyModal()">{{  translate("close")}}</button>
      </div>
    </form>
    </div>
  </div>
</div>
  <!-- update new category -->
  <div class="modal fade" id="updateModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" id="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{ translate("updatecategory") }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="updateCategory(getItems.category_id)" >
               <div class="modal-body">

                  <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">{{  translate("name")}}</label>
                      <input type="text" class="form-control" id="exampleFormControlInput1"  v-model="getItems.name_category">
                  </div>
               </div>
       <div class="modal-footer">
        <button type="submit" class="btn btn-primary">{{translate("add") }}</button>

        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="hideMyModal()">{{ translate("close") }}</button>
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
import { Modal} from 'bootstrap';
import axios from 'axios';
export default {
  mixins:[en,ar],
  data: () => ({
      name:"",
      CreateModel:null,
      updateMeodel:null,
      category:{},
      getItems:{},
      lang:localStorage['locale'] || "en"

  }),
  components:{
    headerView,
  },
  methods:{
    translate(props){

        return this[this.lang][props];


    },
    async getCategory(){

const   res = await axios.get('http://127.0.0.1:7000/get-category')
  if(res.data.status){
     this.category = res.data.category
   console.log(this.category);
  }
},
 async addCategory(){
      let res = await axios.post("http://127.0.0.1:7000/add-new-category",{name:this.name});
      if(res.data.status){
         this.CreateModel.hide();
        //  this.this.name_category = ""
         this.getCategory()
      }
    },
    showMyModal2(){
      this.CreateModel = new Modal("#CreateMdodel")
       this.CreateModel.show();
    },
    showMyModal3(item){
      this.getItems = item
      this.updateMeodel = new Modal("#updateModel")
       this.updateMeodel.show();
    },
    hideMyModal(){
       this.updateMeodel.hide()

    },
   async updateCategory(id){
    // var name = {};
    // Object.assign(this.editItem,this.getItems)
      let res = await axios.put(`http://127.0.0.1:7000/edit-category/`+id,{name:this.getItems.name_category});
      if(res.data.status){
            this.updateMeodel.hide()
           this.getCategory();
          }else{
            alert(res.date.msg)
          }
      },
  async  DeleteCategory(id){
     let name = this.getItems.name_category
        var x = confirm("Are You Sure delete ?")
        if(x){
          let res = await axios.delete(`http://127.0.0.1:7000/delete-category/`+id,name);
          if(res.data.status){
            this.getCategory()
          }else{
            alert(res.date.msg)
          }
        }

    }

  },
  created(){
    this.getCategory()
  }
}
</script>
