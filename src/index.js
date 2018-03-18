import Vue from "../node_modules/vue/dist/vue.js";
import Main from "./components/Main.vue";
import State from "./sate";
import Consts from "./consts"

const ui = `<button @click="startNewGame()">Start new Game</button>`
 document.write("<app></app>");

document.body.style.backgroundColor = "black"
const app = new Vue({
    el: "app" ,
    methods:{
        startNewGame() {
            State.EE.emit(Consts.INIT_NEW_GAME)
            State.gameState = Consts.GAMESTATE_PLAYING;
            document.body.style.backgroundColor = "black"
        }
    },
    template:`<div>${ui}<main-component></main-component></div>`,
    components:{
        "main-component":Main,
    },
    mounted() {
        State.EE.on(Consts.LEVEL_COMPLETE, function() {
            document.body.style.backgroundColor = "green"
        })
    }
});
