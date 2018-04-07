<template>
  <div ref="ww" v-bind:style="gt" class="wrapper">
  <div ref="wrapper2">
     <div v-bind:class="'container ' +( gold ? 'gold': 'empty1')" v-if="open">
            <img ref="gold" class="card_gold" v-if="gold" src="assets/img/SVG/gold.svg">
     </div>
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


    init(gold) {
        this.$refs.wrapper2.style.display = 'none'
        this.gold = gold
    },

    animateIn() {

        if(this.gold ) {

            //this.$refs.gold.style.display ='none'
            setTimeout(()=> {
                this.$refs.gold.style.display ='block'
                this.$refs.wrapper2.style.display = 'block'
                        TweenMax.to(this.$refs.gold, 0, {width:"8%", height:"8%"});
                        TweenMax.to(this.$refs.gold, 1, {width:"80%", height:"80%", ease:Elastic.easeOut});
                    },10 + Math.random()*1000)
        }
      
    },

    startGame() {
        this.firstClicked = false;

        console.log(this.$refs)

        //this.gold = Math.random() < .3 ? true : false;
        this.animateIn();
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
    },

    created() {
        this.$refs.gold.style.display ='none'
    }

}


</script>

<style scoped>
.wrapper {

    flex: 1;
    position: relative;
    box-sizing: border-box;
    background-color: teal;
    margin: 1px ;

}






.lid.empty1 {
    background-color: gray;
}



</style>
