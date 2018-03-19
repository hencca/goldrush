import Vue from "../node_modules/vue/dist/vue.js";
import Main from "./components/Main.vue";
import State from "./sate";
import Consts from "./consts"
import Vuex from "vuex"
const ui = `<div v-if="vuex.state.gameState==Consts.GAMESTATE_OVER">
<button class="startnew" @click="startNewGame()">Start new Game</button>
</div>`

document.addEventListener("touchmove", function(e) {
    e.preventDefault();
})

 document.write("<app></app>");
 document.write(`<link rel="stylesheet" href="assets/styles/styles.css">`);

document.body.style.backgroundColor = "black"
Vue.use(Vuex)

const app = new Vue({
    el: "app" ,
    data:{
        vuex:State.vuex,
        Consts
    },
    methods:{
        startNewGame() {
            State.EE.emit(Consts.INIT_NEW_GAME)
            State.vuex.commit("setGameState", Consts.GAMESTATE_PLAYING);
            document.body.style.backgroundColor = "black"
        }
    },
    template:`<div><main-component></main-component>${ui}</div>`,
    components:{
        "main-component":Main,
    },
    mounted() {
        State.EE.on(Consts.LEVEL_COMPLETE, function() {
            document.body.style.backgroundColor = "green"
        })
    }
});
