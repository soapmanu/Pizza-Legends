class OverworldMap{
    constructor(config){
        this.GameObjects = config.GameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.isCutScenePlaying = false;
    }
    drawLowerImage(ctx,cameraPerson){
        ctx.drawImage(this.lowerImage,utils.withGrid(10.5)-cameraPerson.x,utils.withGrid(6)-cameraPerson.y)
    }
    drawUpperImage(ctx,cameraPerson){
        ctx.drawImage(this.upperImage,utils.withGrid(10.5)-cameraPerson.x,utils.withGrid(6)-cameraPerson.y)
    }
    isSpaceTaken(currentX,currentY,direction){
        const {x,y} = utils.nextPosition(currentX,currentY,direction);
        return this.walls[`${x},${y}`] || false;
    }
    mountObjects(){
        Object.keys(this.GameObjects).forEach(key =>{

            let object = this.GameObjects[key];
            object.id = key;
            // determine if this object should actually mount
            
            object.mount(this);
        })
    }
    async startCutScene(events){
        this.isCutScenePlaying = true;

        // Start a loop of events
        for(let i = 0;i<events.length;i++){
            const event = new OverWorldEvent({
                event:events[i],
                map:this
            })
            await event.init();
        }
        // await each one
        this.isCutScenePlaying = false;
    }
    addWall(x,y){
        this.walls[`${x},${y}`] = true;
    }
    removeWall(x,y){
        delete this.walls[`${x},${y}`]
    }
    moveWall(wasX,wasY,direction){
        this.removeWall(wasX,wasY);
        const {x,y}=utils.nextPosition(wasX,wasY,direction);
        this.addWall(x,y);
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
                src:"/images/characters/people/npc1.png",
                behaviorLoop:[
                    {type:"stand",  direction:"left",   time:800},
                    {type:"stand",  direction:"up",     time:800},
                    {type:"stand",  direction:"right",  time:1200},
                    {type:"stand",  direction:"up",     time:300}
                ]
            }),
            npc2:new Person({
                x:utils.withGrid(3),
                y:utils.withGrid(7),
                src:"/images/characters/people/npc2.png",
                behaviorLoop:[
                    {type:"walk",   direction:"left"},
                    {type:"stand",  direction:"up", time:800},
                    {type:"walk",   direction:"up"},
                    {type:"walk",   direction:"right"},
                    {type:"walk",   direction:"down"}
                ]
            })
        },
        walls:{
            //"16,16"
            [utils.asGridCoord(7,6)]:true,
            [utils.asGridCoord(8,6)]:true,
            [utils.asGridCoord(7,7)]:true,
            [utils.asGridCoord(8,7)]:true,
            [utils.asGridCoord(1,3)]:true,
            [utils.asGridCoord(2,3)]:true,
            [utils.asGridCoord(3,3)]:true,
            [utils.asGridCoord(4,3)]:true,
            [utils.asGridCoord(5,3)]:true,
            [utils.asGridCoord(6,3)]:true,
            [utils.asGridCoord(8,3)]:true,
            //[utils.asGridCoord(7,3)]:true,
            [utils.asGridCoord(6,4)]:true,
            [utils.asGridCoord(8,4)]:true,
            [utils.asGridCoord(9,3)]:true,
            [utils.asGridCoord(10,3)]:true,
            [utils.asGridCoord(0,4)]:true,
            [utils.asGridCoord(0,5)]:true,
            [utils.asGridCoord(0,6)]:true,
            [utils.asGridCoord(0,7)]:true,
            [utils.asGridCoord(0,8)]:true,
            [utils.asGridCoord(0,9)]:true,
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