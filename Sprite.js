class Sprite{
    constructor(config){
        // Set Up the Image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded  = true;
        }
        // Shadow
        this.shadow = new Image();
        this.useShadow = true;
        if(this.useShadow){
            this.shadow.src = "/images/characters/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }

        // Configure Animation & Initial State
        this.animations = config.animations || {
            idleDown:[
                [0,0]
            ]
        }
        this.currentAnimation = config.currentAnimation||"idleDown";
        this.currentAnimationFrame = 0;
        // Referece the game objects
        this.GameObject = config.GameObject;
    }
    draw(ctx){
        const x = this.GameObject.x * 16-8;
        const y = this.GameObject.y * 16-18;
        this.isShadowLoaded &&ctx.drawImage(this.shadow,x,y)
        this.isLoaded && ctx.drawImage(this.image,
            0,0,
            32,32,
            x,y,
            32,32
        )
    }
}