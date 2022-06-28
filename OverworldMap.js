class OverworldMap{
    constructor(config){
        this.overworld = null;
        this.GameObjects = config.GameObjects;
        this.cutsceneSpaces = config.cutsceneSpaces||{};
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
        // reset npcs to do their edle behavior
        Object.values(this.GameObjects).forEach(Object => Object.doBehaviorEvent(this))
    }
    checkForActionCutscene(){
        const hero = this.GameObjects["hero"];
        const nextCoords = utils.nextPosition(hero.x,hero.y,hero.direction);
        const match = Object.values(this.GameObjects).find(Object => {
            return `${Object.x},${Object.y}` === `${nextCoords.x},${nextCoords.y}`
        });
        if(!this.isCutScenePlaying && match && match.talking.length){
            this.startCutScene(match.talking[0].events);
        }
    }
    checkForFootstepCutscene(){
        const hero = this.GameObjects["hero"];
        const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
        if(!this.isCutScenePlaying && match){
            this.startCutScene(match[0].events)
        }
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
                ],
                talking:[
                    {
                        events:[
                            {type:"textMessage",text:"Hi",faceHero:"npc1"},
                            {who:"hero",type:"walk",direction:"up"}
                        ]
                    }
                ]
            }),
            npc2:new Person({
                x:utils.withGrid(8),
                y:utils.withGrid(5),
                src:"/images/characters/people/npc2.png",
                /*behaviorLoop:[
                    {type:"walk",   direction:"left"},
                    {type:"stand",  direction:"up", time:800},
                    {type:"walk",   direction:"up"},
                    {type:"walk",   direction:"right"},
                    {type:"walk",   direction:"down"}
                ]*/
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
            [utils.asGridCoord(7,3)]:true,
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
            [utils.asGridCoord(1,10)]:true,
            [utils.asGridCoord(2,10)]:true,
            [utils.asGridCoord(3,10)]:true,
            [utils.asGridCoord(4,10)]:true,
            [utils.asGridCoord(5,11)]:true,
            [utils.asGridCoord(6,10)]:true,
            [utils.asGridCoord(7,10)]:true,
            [utils.asGridCoord(8,10)]:true,
            [utils.asGridCoord(9,10)]:true,
            [utils.asGridCoord(10,10)]:true,
            [utils.asGridCoord(11,4)]:true,
            [utils.asGridCoord(11,5)]:true,
            [utils.asGridCoord(11,6)]:true,
            [utils.asGridCoord(11,7)]:true,
            [utils.asGridCoord(11,8)]:true,
            [utils.asGridCoord(11,9)]:true,

        },
        cutsceneSpaces:{
            [utils.asGridCoord(7,4)]:[
                {
                    events:[
                        {who:"npc2",type:"walk",direction:"left"},
                        {who:"npc2",type:"stand",direction:"up",time:500},
                        {type:"textMessage",text:"You can't be in there!"},
                        {who:"npc2",type:"walk",direction:"right"},
                        {who:"npc2",type:"stand",direction:"down"},
                        {who:"hero",type:"walk",direction:"down"},
                        {who:"hero",type:"walk",direction:"left"},
                    ]
                }
            ],
            [utils.asGridCoord(5,10)]:[
                {
                    events:[
                        {type:"changeMap",map:"Kitchen"}
                    ]
                }
            ]
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
                src:"/images/characters/people/npc2.png",
                talking:[
                    {
                        events:[
                            {type:"textMessage",text:"You made it!",faceHero:["npc"]},
                        ]
                    }
                ]
            }),
        },
        walls:{
            [utils.asGridCoord(1,4)]:true,
            [utils.asGridCoord(2,3)]:true,
            [utils.asGridCoord(3,3)]:true,
            [utils.asGridCoord(4,3)]:true,
            [utils.asGridCoord(5,3)]:true,
            [utils.asGridCoord(6,3)]:true,
            [utils.asGridCoord(7,3)]:true,
            [utils.asGridCoord(8,3)]:true,
            [utils.asGridCoord(9,3)]:true,
            [utils.asGridCoord(10,3)]:true,
            [utils.asGridCoord(11,4)]:true,
            [utils.asGridCoord(12,4)]:true,

        }
    },
}