const ws = require("ws")
const fs = require("fs")
const express = require("express")

const signaling = require("./signaling.js")
// const admin = require("./admin.js")
 
const config = JSON.parse(fs.readFileSync("./server/config.json"))

const PORT = process.env.PORT || config.port
const HOST = config.host

const wsserver = new ws.Server({host:HOST, port: PORT})
const httpServer = express()


signaling.setConfig({
	isClientIdsPublic: config.isClientIdsPublic,	// If true, all client ids are retrievable in the client side
	clientMaxUnreachableTime: config.clientMaxUnreachableTime,	// milliseconds
	clientMaxConnectionTime: config.clientMaxConnectionTime,
	verificationHash: config.verificationHash
})


wsserver.on("connection", (client, req)=>{
	signaling.addNewClient(client)
})


httpServer.listen(PORT, ()=>{
	console.log("Aa")
})
