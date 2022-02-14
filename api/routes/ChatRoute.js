const express = require('express');

const {ChatApp} = require("../models");

const chatRoute = express.Router();

function asyncHandler(callBack){
    return async (req,res,next) => {
        try {
            await callBack(req,res,next);

        } catch (error) {
            next(error);
        }
    }
}

chatRoute.get('/', asyncHandler(async (req,res,next)=>{
    let items = await ChatApp.findAll();
    res.status(200).json(items);
}));

chatRoute.post('/', asyncHandler(async (req,res,next)=>{
    let item = req.body;
    let chatApp = await ChatApp.create(item);
    console.log(item);
    res.status(200).json('Item succesfuly posted');
}));

chatRoute.put('/', asyncHandler(async (req,res,next)=>{
    let item = req.body;
    let {id} = req.body;
    let d = await ChatApp.findByPk(id);

    if(item.username!= ''){
        d.username = item.username;
    }
    if(item.message != ''){
        d.message = item.message;
    }
    if(item.time_sent != ''){
        d.time_sent = item.time_sent;
    }

    d.save();

    res.json('From put with love');
}));

chatRoute.delete('/:id', asyncHandler(async (req,res,next)=>{
    let {id} = req.params;
    let d = await ChatApp.findByPk(id);
    await d.destroy();
    res.json('Item was deleted');
}));

module.exports=chatRoute;