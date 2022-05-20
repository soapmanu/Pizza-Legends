class GameObject {
    constructor(config){
        this.id = null;
        this.isMounted  = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction ||"down";
        this.sprite = new Sprite({
            GameObject:this,
            src:config.src||"/images/characters/people/hero.png",
        });
        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;
    }
    mount(map){
        console.log("mounting");
        this.isMounted = true;
        map.addWall(this.x,this.y);

        // If we have a behavior kick off after a short delay
        setTimeout(()=>{
            this.doBehaviorEvent(map);
        },10)
    }
    update(){

    }
    async doBehaviorEvent(map){
        // Don't do anything if there is a more important cutscene or I don't ahve config to do
        if(map.isCutScenePlaying || this.behaviorLoop.length === 0){
            return;
        }

        // Setting up our event with relevant info
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;
        // Create an event instance out of our next eventConfig  
        const eventHandler = new OverWorldEvent({map,event:eventConfig});
        await eventHandler.init();

        // Asynchronous event, nothing before the await will happend unless is called
        // Setting the next event to fire
        this.behaviorLoopIndex += 1;
        if(this.behaviorLoopIndex === this.behaviorLoop.length){
            this.behaviorLoopIndex = 0;
        }

        // Do it again, as a infinite loop 
        this.doBehaviorEvent(map);

    }

}