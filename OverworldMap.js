class OverworldMap{
    constructor(config){
        this.GameObjects = config.GameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }
    drawLowerImage(ctx){
        ctx.drawImage(this.lowerImage,0,0)
    }
    drawUpperImage(ctx){
        ctx.drawImage(this.upperImage,0,0)
    }
}

window.OverworldMaps = {
    DemoRoom:{
        lowerSrc:"/images/maps/DemoLower.png",
        upperSrc:"/images/maps/DemoUpper.png",
        GameObjects:{
            hero:new Person({
                isPlayerControlled:true,
                x:utils.withGrid(5),
                y:utils.withGrid(6),
            }),
            npc1:new Person({
                x:utils.withGrid(7),
                y:utils.withGrid(9),
                src:"/images/characters/people/npc1.png"
            })
        }
    },
    Kitchen:{
        lowerSrc:"/images/maps/KitchenLower.png",
        upperSrc:"/images/maps/KitchenUpper.png",
        GameObjects:{
            hero:new Person({
                isPlayerControlled:true,
                x:utils.withGrid(5),
                y:utils.withGrid(7),
            }),
            npc1:new Person({
                x:utils.withGrid(9),
                y:utils.withGrid(5),
                src:"/images/characters/people/npc1.png"
            }),
            npc:new Person({
                x:utils.withGrid(8),
                y:utils.withGrid(7),
                src:"/images/characters/people/npc2.png"
            }),
        }
    },
}