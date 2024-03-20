const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");

// import express from "express";
// import fileUpload from "express-fileupload";
// import PdfParse from "pdf-parse";

const app = express();
app.use("/", express.static("public"));
app.use(fileUpload());

app.post("/extract-text",(req,res)=>{
    if(!req.files && !req.files.pdfFile){
        res.status(400);
        res.end();
    }

    pdfParse(req.files.pdfFile).then(result => {
        //console.log(result);
        res.send(result.text);
    })
})

app.listen(3000);