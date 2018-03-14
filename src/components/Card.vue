<template>
  <div ref="ww" @mousedown="reveal" v-bind:style="gt" class="wrapper">

  </div>
</template>

<script>
import State from "../sate";
export default {

methods: {
    resize:function() {
           this.$refs.ww.style.height = this.$refs.ww.offsetWidth + "px"
    },
   reveal() {
       this.$refs.ww.style.backgroundColor = "yellow"
   },
    getStyle() {
            //console.log(this.$refs)
        //return "height:" + this.$refs.wrapper.offsetWidth + "px"
    }
},
computed: {
    gt:function() {
        console.log(this.$refs.ww)
        return "height:200px"
    }
},
mounted() {
window.addEventListener("resize",this.resize )
this.resize();
State.EE.on("foo", this.reveal)
}

}


</script>

<style>
.wrapper {
 border:1px solid;
 flex: 1;
}
</style>
