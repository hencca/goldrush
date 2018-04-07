<template>
<div class="mycontainer">

</div>
</template>

<script>

class MakePaticle1 { 
         
         moveme(time) {
         
         if(!this.lasttime) {
             this.lasttime = time;
         }

        let delta = (time - this.lasttime) / 1000;
       

        this.lasttime = time;

            let stepY = (this.el.offsetTop + this.yMotion) * delta
            let stepX = (this.el.offsetLeft + this.xMotion) * delta

            this.el.style.top = (this.el.offsetTop +stepY) + "px"
           this.el.style.left = (this.el.offsetLeft + stepX) + "px"
            this.yMotion+=60

            if(this.el.offsetTop < 1000) {
                window.requestAnimationFrame(delta => this.moveme(delta))
            }
         }
         
         constructor(x , y) {
             this.el = document.createElement("img");
             let el = this.el;
             this.yMotion = -400 - Math.random()*600;
             this.xMotion = -300 + Math.random()*600
            

                el.style.position = 'absolute'
                el.src = "/assets/img/SVG/gold.svg"
                el.style.width = "40px"
                el.style.height = "40px"
                el.style.left = x + 'px'
                el.style.top = y + 'px'

                window.requestAnimationFrame(delta => this.moveme(delta))

                return el;
            }
}


export default {
    methods:{
        displayFoundGold(card) {
            for(let i = 0; i< 3; i++) {
            let particle = new MakePaticle1(card.$el.offsetLeft, card.$el.offsetTop)
            this.$el.appendChild( particle );
            }
        },

        celebrate() {
            for(let i = 0; i< 7; i++) {
            let particle = new MakePaticle1(Math.random()*window.innerWidth, 0)
            this.$el.appendChild( particle );
            }
        }
    }

}
</script>

<style>
    .mycontainer {
        top: 0;
        left: 0;
        position: absolute;
        z-index: 100;
        width: 100%;
        height: 100%;
        overflow: hidden;

    }

</style>
