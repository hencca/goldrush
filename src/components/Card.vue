<template>
  <div ref="ww" v-bind:style="gt" class="wrapper">
    <div class="lid" v-if="!open"></div>
     <div v-bind:class="'container ' +( gold ? 'gold': 'empty1')" v-if="open">
         <img style="width:100%" v-if="gold" src="assets/img/gold.gif">

     </div>
  </div>
</template>

<script>
import State from "../sate";
import Consts from "../consts";
export default {

   data:function() {
     return {
         open:false,
         firstClicked:false,
         gold:false,
     }   
    },


methods: {
 
    startGame() {
        this.firstClicked = false;
        //this.gold = Math.random() < .3 ? true : false;
    },

    resize:function() {
           this.$refs.ww.style.height = this.$refs.ww.offsetWidth + "px"
    },
   hClick() {
       if(State.vuex.state.gameState !== Consts.GAMESTATE_PLAYING) return;
        if(this.firstClicked) return;
        this.firstClicked = true;

        State.EE.emit("reveal", this)
        this.open = true

   },
    getStyle() {
            //console.log(this.$refs)
        //return "height:" + this.$refs.wrapper.offsetWidth + "px"
    }
},
computed: {
    gt:function() {
        //console.log(this.$refs.ww)
       // return "height:200px"
    }
},
    mounted() {
        var that = this;
        window.addEventListener("resize",this.resize )
        //this.resize();

        setTimeout(function() {
        that.resize();
            
        },100)

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
border-left: 4px solid #ce4141;
flex: 1;
position: relative;
border-top: 2px solid #dd4848;
border-bottom: 3px solid;
border-right: 4px solid;
box-sizing: border-box;

}
.lid {
    background-color:#776600;
    position: absolute;
    width: 100%;
    height: 100%;
}


.container.gold {
    height: 100%;
    width: 100%;
}



.container.gold img {
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: crisp-edges;
    position: absolute;
    left: 0;
    top: 0;
}

.lid.empty1 {
    background-color: gray;
}



</style>
