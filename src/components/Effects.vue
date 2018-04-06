<template>
<div class="mycontainer">

</div>
</template>

<script>

class MakePaticle1 { 
         
         moveme(delta) {
            
             
            this.el.style.top = (this.el.offsetTop + this.yMotion) + "px"
            this.el.style.left = (this.el.offsetLeft + this.xMotion) + "px"
            this.yMotion++

            if(this.el.offsetTop < 1000) {
                window.requestAnimationFrame(delta => this.moveme(delta))
            }
         }
         
         constructor(x , y) {
             this.el = document.createElement("div");
             let el = this.el;
             this.yMotion = -10;
             this.xMotion = -10 + Math.random()*20
            

                el.style.position = 'absolute'
                el.className = "goldparticle"
                el.style.width = "40px"
                el.style.height = "40px"
                el.style.left = x + 'px'
                el.style.top = y + 'px'
                el.style.backgroundColor = "yellow";

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

    .particle {
        width: 100px;
        height: 100px;
        background: yellow
    }

    .goldparticle {
        width: 40px;
        height: 40px;
        border-radius:20px;
    }
</style>
