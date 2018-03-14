<template>
 <div class="container">

<div class="row">
    <card></card>
    <card></card>
    <card></card>
    <card></card>
    <card></card>
</div>

<div class="row">
    <card></card>
    <card></card>
    <card></card>
    <card></card>
    <card></card>
</div>

<div class="row">
    <card></card>
    <card></card>
    <card></card>
    <card></card>
    <card></card>
</div>

<div class="row">
    <card></card>
    <card></card>
    <card></card>
    <card></card>
    <card></card>
</div>

  </div>
</template>

<script>
import Card from "./Card.vue"
import State from "../sate";
export default {
   components: {
       "card" :Card
   },

   mounted:function() {
       setTimeout(s=> {
        State.EE.emit("foo")
       },1000)
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

