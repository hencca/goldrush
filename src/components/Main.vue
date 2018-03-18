
<script>
import Card from "./Card.vue"
import State from "../sate";
import Consts from "../consts";
import _ from "lodash"
function getRow(h, i) {
     let ret = []
     for(var o = 0; o< 5; o++) {
         ret.push(<card ref={'card'+((i*5) + o) } ></card>)
     }

   return (
       <div  class={'row'}>     
            {ret}
        </div>
   )
}

export default {
    render:function(h) {
       let ret = []
       for(var i = 0; i< 4; i++) {
        ret.push (
            
            getRow(h,i)
       

        )
       }   
       return <div class="container">{ret}</div>;
    },
   components: {
       "card" :Card,
   },

   data: function() {
   return {
       level:2,
       found:0,
       userStarted:false,
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
            this.level++;
          
            
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

        }
    },
    mounted:function() {
        this.nextLevel()
           var that = this;
 

        State.EE.on(Consts.INIT_NEW_GAME, function() {
            that.userStarted = false;
            that.level = 1;
            that.nextLevel();
        })

        State.EE.on("foundgold", function(e) {
     
        })
     
        State.EE.on("reveal", function(card) {
               if(!that.userStarted) {
                   that.userStarted = true;
                       document.body.style.backgroundColor = "black"
                   State.EE.emit("hideAll") 
               }
               if(card.gold) {
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
                        State.gameState = Consts.GAMESTATE_OVER;
                
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
    height: 100vh;
}

.row {
    display: flex;
}
</style>

