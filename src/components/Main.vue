
<script>
import Card from "./Card.vue"
import State from "../sate";

function getRow(h, i) {
     let ret = []
     for(var o = 1; o< 6; o++) {
         ret.push(<card ref={'card'+i + '_' + o } ></card>)
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
       for(var i = 1; i< 5; i++) {
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
       level:4,
       found:0
   }
   
   },

    methods: {
        startNewGame() {
         
            this.$refs.card1_1.gold = true;
            this.$refs.card2_2.gold = true;
            this.$refs.card3_4.gold = true;
            this.$refs.card1_4.gold = true;
   
            State.EE.emit("startgame")
             State.EE.emit("revealAll")
             setTimeout(function() {
                 State.EE.emit("hideAll")    
             },2000)

        }
    },
    mounted:function() {
        this.startNewGame()
        State.EE.on("gameOver", ()=>{
          //  alert("gameOver")
             this.startNewGame()
        })
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

