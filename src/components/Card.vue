<template>
  <div ref="ww" @mousedown="hClick()" v-bind:style="gt" class="wrapper">
    <div class="lid" v-if="!open"></div>
     <div v-bind:class="'lid container ' +( gold ? '': 'empty1')" v-if="open">{{gold ? "*" : ""}}</div>
  </div>
</template>

<script>
import State from "../sate";
export default {

   data:function() {
     return {
         open:false,
         gold:false,
     }   
    },

methods: {
 
    startGame() {
     
        //this.gold = Math.random() < .3 ? true : false;
    },

    resize:function() {
           this.$refs.ww.style.height = this.$refs.ww.offsetWidth + "px"
    },
   hClick() {
       this.open = true
       if(this.gold) {

       } else {
           State.EE.emit("gameOver")
       }
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
        var that = this;
        window.addEventListener("resize",this.resize )
        this.resize();
        State.EE.on("startgame", this.startGame);
          State.EE.on("revealAll", function() {
                that.open = true;
          });

        State.EE.on("hideAll", function() {
                that.open = false;
          });
    }

}


</script>

<style scoped>
.wrapper {
 border:1px solid;
 flex: 1;
 position: relative;
}
.lid {
    background-color: red;
    position: absolute;
    width: 100%;
    height: 100%;
}
.lid.container {
    background-color: yellow;
}

.lid.empty1 {
    background-color: gray;
}


.container {
    font-size: 190px;
    text-align: center;
}
</style>
