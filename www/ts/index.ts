import * as PIXI from 'pixi.js'
import { BaseTexture, Rectangle } from 'pixi.js';

const win_w:number = window.innerWidth;
const win_h:number = window.innerHeight;

const w:number = 32;

const img_array:Array<String> = new Array("png","jpg")

const char_rec:PIXI.Rectangle= new PIXI.Rectangle(0,0,32,32);

let texture_dic:{
    [name:string]:PIXI.Texture|undefined;
} = {};

let ani_array:Array<PIXI.Texture>;
let app:PIXI.Application;


window.onload = () => {

    app = new PIXI.Application({
        width:win_w,
        height:win_h,
        autoStart:false,
        backgroundColor: 0xeeeeff
    });
    document.body.appendChild(app.view);

    let start = () => {

        check_resource(app.loader.resources);

        //固定熊
        //texture_dic["char1"] = make_frame(texture_dic["char1"],char_rec);

        //let char1 = new PIXI.Sprite(texture_dic["char1"]);

        //アニメ熊

        createPlayerSheet();
        
        function createPlayerSheet() {
            //@ts-ignore
            let ani_texture:PIXI.BaseTexture = new PIXI.BaseTexture.from(app.loader.resources["char1"].url)
            ani_array = new Array();
            let w = 32;
            let h = 32;
            for(let i=0;i<3; i++) {
                ani_array[i] = new PIXI.Texture(ani_texture,new PIXI.Rectangle(i*w,0,w,h))
            }
        }
        console.log(ani_array)

        let char1 = new PIXI.AnimatedSprite(ani_array);
        char1.animationSpeed= 0.1;

        console.log(char1)

        char1.x = 50;
        char1.y = 50;
        char1.play();

        app.stage.addChild(char1);

        app.start();
    }

    app.loader
        .add("char1","img/chara1.png")
        .load(start)
}

let check_resource = (resources:PIXI.utils.Dict<PIXI.LoaderResource>|undefined) => {
    for (let key in resources) {
        if(resources[key] != undefined) {
            if(img_array.find(ele => ele==resources[key].extension) != undefined) {
                texture_dic[resources[key].name] = resources[key].texture;
            }

            console.log(resources[key].name+"."+resources[key].extension+" is loaded");
        } else {
            throw new Error("check_resourceエラー")
        }
    }
}

let make_frame = (texture:PIXI.Texture|undefined, rect:PIXI.Rectangle):PIXI.Texture|undefined => {

    if(texture != undefined) {
        texture.frame = rect;
        return texture;
    } else {
        throw new Error("check_frameエラー")
    }
}

