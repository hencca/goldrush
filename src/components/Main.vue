
<script>
import Card from "./Card.vue"
import Effects from "./Effects.vue"

import State from "../sate";
import Consts from "../consts";
import _ from "lodash"
function getRow(h, i) {
     let ret = []
     for(var o = 0; o< 5; o++) {
         ret.push(<card ref={'card'+((i*5) + o) } ></card>)
     }

   return (
       <div class={'row'}>
            {ret}
        </div>
   )
}

function showEffects(h) {
   if( State.vuex.state.gameState === Consts.GAMESTATE_PLAYING) {
        return(
            <effects ref='effects' />
        )
    }
}

export default {
    render:function(h) {
       let ret = []
       for(var i = 0; i < 4; i++) {
        ret.push (
            getRow( h, i )
        )
       }



       return (
       <div>
       {
           showEffects(h)
       }
        <h2 class="score">Level: {this.level}</h2>
       <div class="container">
      
       {ret}
       </div>
       </div>);
    },
   components: {
       "card" :Card,
       "effects" :Effects,
   },

   data: function() {
   return {
       level:State.vuex.state.level,
       found:0,
       userStarted:false,
   }

   },

    computed:{
        llevel() {
            return State.vuex.state.level;
        }
    },

    methods: {

        hideall() {
            State.EE.emit("hideAll")
        },

        addGoldToCards() {
              var ar = _.range(0,19)
            ar.forEach(e=> {
                 this.$refs["card"+ e].gold = false;
            })

            for(var i = 0 ; i < this.level; i++) {
            var r = ar.splice(Math.floor(Math.random()*ar.length-1),1)
            this.$refs["card"+ r].gold = true;
            }
        },

        nextLevel() {
            var that = this;
            State.vuex.commit("increment");

            this.level = this.llevel;

               // .sort((a,b)=>Math.random()>.5 ? -1 :1)
            this.userStarted = false;
            this.found = 0;

            this.addGoldToCards();

            State.EE.emit("startgame")
             State.EE.emit("revealAll")
             setTimeout(function() {
                if(!that.userStarted) {

                     State.EE.emit("hideAll")
                     document.body.style.backgroundColor = "black"


                }

             },2000)
        },

        checkIfBlockTouched(e) {
          
            let mouseLeft = e.pageX
            let mouseTop = e.pageY
            
                for(var i = 0; i< 20; i ++) {
                    let card = this.$refs['card' + i];
                    let top = card.$el.offsetTop;
                    let left = card.$el.offsetLeft;
                    let cardWidth = card.$el.offsetWidth;
                    let cardHeight = card.$el.offsetHeight;
                   
                   if(mouseLeft > left && mouseLeft < left + cardWidth) {
                       if(mouseTop > top && mouseTop < top + cardHeight) {
                             e.preventDefault()
                            card.hClick();  
                       }
                       
                   }
                }
        }
    },
    mounted() {

        window.addEventListener('touchstart', this.checkIfBlockTouched);
        window.addEventListener('mousedown', this.checkIfBlockTouched);

        this.nextLevel()
           var that = this;


        State.EE.on(Consts.INIT_NEW_GAME, function() {
            that.userStarted = false;
             State.vuex.commit("init");
            that.level = 1;
            that.nextLevel();
        })

        State.EE.on("reveal", card => {
               if(!that.userStarted) {
                   that.userStarted = true;
                       document.body.style.backgroundColor = "black"
                   State.EE.emit("hideAll")
               }
               if(card.gold) {
                   this.$refs.effects.displayFoundGold( card );
                that.found ++;
                    if(that.found === that.level) {
                        State.EE.emit(Consts.LEVEL_COMPLETE);
                        State.EE.emit("revealAll")
                       // that.startNewGame();
                       setTimeout(function() {
                           that.nextLevel()
                       },1000)
                    }
               } else {
                        State.vuex.commit("setGameState", Consts.GAMESTATE_OVER);

                        document.body.style.backgroundColor = "red"
                        that.userStarted = false;
                        State.EE.emit("revealAll")
               }


        });
   }

}
</script>

 <style scoped>

.container {
    margin: auto;
    max-width: 700px;
    background-color:brown;
}

.row {
    display: flex;
}


</style>

