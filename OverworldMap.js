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
            hero:new GameObject({
                x:5,
                y:6,
            }),
            npc1:new GameObject({
                x:7,
                y:9,
                src:"/images/characters/people/npc1.png"
            })
        }
    },
    Kitchen:{
        lowerSrc:"/images/maps/KitchenLower.png",
        upperSrc:"/images/maps/KitchenUpper.png",
        GameObjects:{
            hero:new GameObject({
                x:2,
                y:7,
            }),
            npc1:new GameObject({
                x:9,
                y:5,
                src:"/images/characters/people/npc1.png"
            }),
            npc:new GameObject({
                x:8,
                y:7,
                src:"/images/characters/people/npc2.png"
            }),
        }
    },
}