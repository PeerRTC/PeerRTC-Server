const ws = require("ws")
const fs = require("fs")
const signaling = require("./signaling.js")
 
const config = JSON.parse(fs.readFileSync("config.json"))

const PORT = process.env.PORT || config.port

const wsserver = new ws.Server({host:'0.0.0.0', port: PORT})


signaling.setConfig({
	isClientIdsPublic: config.isClientIdsPublic,	// If true, all client ids are retrievable in the client side
	clientMaxUnreachableTime: config.clientMaxUnreachableTime	//milliseconds
})


wsserver.on("connection", client=>{
	signaling.addNewClient(client)
})

