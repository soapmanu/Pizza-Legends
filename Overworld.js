class Overworld {
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }
    init(){
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image,0,0)
        };
        image.src = "/images/maps/DemoLower.png";

        const x = 5;
        const y = 6;

        const shadow = new Image();
        shadow.onload = () => {
            this.ctx.drawImage(shadow,0, // First left Pixel
            0, // First Top Pixel
            32, // width left pixel draw
            32, // height top pixel draw
            x*16-8,  // position
            y*16-18, // position
            32, //width size
            32  // height size
            )
        }
        shadow.src = "/images/characters/shadow.png"

        const hero = new Image();
        hero.onload = () => {
            this.ctx.drawImage(hero,
                0, // First left Pixel
                0, // First Top Pixel
                32, // width left pixel draw
                32, // height top pixel draw
                x*16-8,  // position
                y*16-18, // position
                32, //width size
                32  // height size
                )
        }
        hero.src = "/images/characters/people/hero.png"
    }
}