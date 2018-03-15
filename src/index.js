import Vue from "../node_modules/vue/dist/vue.js";
import Main from "./components/Main.vue";

 document.write("<app></app>");

document.body.style.backgroundColor = "black"
const app = new Vue({
    el: "app" ,
    template:"<main-component></main-component>",
    components:{
        "main-component":Main,
    
    },
});
