<script>
import ar from "../../languages/pages/ar";
import en from "../../languages/pages/en.js";
export default {
  mixins:[ar,en],
  data(){
    return{

      lang:localStorage['locale'] || "en"
    }
  },
  methods: {
    
    translate(props) {
      return this[lang][props];
    },
  },
};
</script>
