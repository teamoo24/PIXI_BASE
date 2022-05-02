"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = __importStar(require("pixi.js"));
const win_w = window.innerWidth;
const win_h = window.innerHeight;
const char_rec = new PIXI.Rectangle(0, 0, 32, 32);
const img_array = new Array("png", "jpg");
let texture_dic = {};
let app;
window.onload = () => {
    app = new PIXI.Application({
        width: win_w,
        height: win_h,
        autoStart: false,
        backgroundColor: 0xeeeeff
    });
    document.body.appendChild(app.view);
    let start = () => {
        check_resource(app.loader.resources);
        texture_dic["char1"] = make_frame(texture_dic["char1"], char_rec);
        let char1 = new PIXI.Sprite(texture_dic["char1"]);
        char1.x = 50;
        char1.y = 50;
        app.stage.addChild(char1);
        app.start();
    };
    app.loader
        .add("char1", "img/chara1.png")
        .load(start);
};
let check_resource = (resources) => {
    for (let key in resources) {
        if (resources[key] != undefined) {
            if (img_array.find(ele => ele == resources[key].extension) != undefined) {
                texture_dic[resources[key].name] = resources[key].texture;
            }
            console.log(resources[key].name + "." + resources[key].extension + " is loaded");
        }
        else {
            throw new Error("check_resourceエラー");
        }
    }
};
let make_frame = (texture, rect) => {
    if (texture != undefined) {
        texture.frame = rect;
        return texture;
    }
    else {
        throw new Error("check_frameエラー");
    }
};
