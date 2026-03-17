const express = require("express")
const { exec } = require("child_process")

const app = express()

app.use(express.static("public"))

app.get("/download",(req,res)=>{

const url = req.query.url

if(!url){
return res.send("No URL provided")
}

const command = `yt-dlp.exe -f mp4 -g "${url}"`

exec(command,(error,stdout,stderr)=>{

if(error){
console.log(stderr)
return res.send("Error downloading video")
}

const videoURL = stdout.trim()

res.redirect(videoURL)

})

})

app.listen(3000,()=>{
console.log("Server running")
})