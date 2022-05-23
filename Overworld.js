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

            // Establish the camera person
            const cameraPerson = this.map.GameObjects.hero;
            
            // Update all objects
            Object.values(this.map.GameObjects).forEach(Object =>{
                Object.update({
                    arrow:this.directionInput.direction,
                    map:this.map
                });
            })

            // Draw the lower area
            this.map.drawLowerImage(this.ctx,cameraPerson);

            // Draw the Game Objects
            Object.values(this.map.GameObjects).sort((a,b)=>{
                return a.y - b.y;
            }).forEach(Object =>{
                Object.sprite.draw(this.ctx,cameraPerson);
            })

            // Draw the Upper areas
            this.map.drawUpperImage(this.ctx,cameraPerson);
            requestAnimationFrame(()=>{
                step();// the recursion must be here, otherwise it will loop infinitely
            })
        }
        step();
    }
    init(){
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.map.mountObjects();

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();

        this.map.startCutScene([
            {who:"hero",type:"walk",direction:"down"},
            {who:"hero",type:"walk",direction:"down"},
            {who:"hero",type:"stand",direction:"right"},

            {who:"npc1",type:"walk",direction:"up"},
            {who:"npc1",type:"walk",direction:"left"},
            {who:"npc1",type:"stand",direction:"left",time:200},
            {type:"textMessage",text:"Why hello there!"}

        ])
    }
}