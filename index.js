#!/usr/bin/env node

"use strict";
const sizeOf = require('image-size');
const fs = require("fs");
const Dir = process.cwd();
const path = require("path");

var files = fs.readdirSync(Dir);

const landscapePath = path.join(Dir,"landscape");
const portraitPath = path.join(Dir,"portrait");

if(!fs.existsSync(landscapePath)){
    fs.mkdirSync(landscapePath);
}
if(!fs.existsSync(portraitPath)){
    fs.mkdirSync(portraitPath);
}

var landscape = 0;
var portrait = 0;

for(let i = 0; i < files.length;i++){
    let size = "";
    try {
        size = sizeOf(files[i]);
    }
    catch(e){
    }
    if(size){
        if(size.width > size.height){
            fs.renameSync(files[i],path.join(landscapePath,files[i]));
            landscape++;
        }
        else if (size.height > size.width) {
            fs.renameSync(files[i],path.join(portraitPath,files[i]));
            portrait++;
        }
        else { }
    }
}
console.log(landscape, "landscape");
console.log(portrait,"portrait");