import * as PIXI from 'pixi.js'

const win_w:number = window.innerWidth;
const win_h:number = window.innerHeight;
const char_rec:PIXI.Rectangle= new PIXI.Rectangle(0,0,32,32);

const img_array:Array<String> = new Array("png","jpg")

let texture_dic:{
    [name:string]:PIXI.Texture|undefined;
} = {};

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

        texture_dic["char1"] = make_frame(texture_dic["char1"],char_rec);

        let char1 = new PIXI.Sprite(texture_dic["char1"]);

        char1.x = 50;
        char1.y = 50;
        
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