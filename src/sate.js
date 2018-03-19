import Vue from "../node_modules/vue/dist/vue.js";
import EventEmitter from "EventEmitter";
import Consts from "./consts"
import Vuex from "vuex"
Vue.use(Vuex)
const vuex = new Vuex.Store({
    state: {
        level:1,
        gameState:Consts.GAMESTATE_PLAYING
    },
    mutations: {
        increment: state => state.level++,
        init: state => state.level = 1,
        setGameState:(state, gameState) => state.gameState = gameState

    }

})
const EE = new EventEmitter();

export default {
    EE,
    gameState:0,
    vuex
};