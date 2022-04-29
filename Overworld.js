class Overworld {
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }
    startGameLoop(){
        const step =()=>{
            // Clear Off the canvas
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

            // Draw the lower area
            this.map.drawLowerImage(this.ctx);

            // Draw the Game Objects
            Object.values(this.map.GameObjects).forEach(Object =>{
                //Object.x += 0.05;
                Object.sprite.draw(this.ctx);
            })

            // Draw the Upper areas
            this.map.drawUpperImage(this.ctx);
            requestAnimationFrame(()=>{
                step();// the recursion must be here, otherwise it will loop infinitely
            })
        }
        step();
    }
    init(){
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.startGameLoop();
    }
}