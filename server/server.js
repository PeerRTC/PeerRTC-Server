const ws = require("ws")
const fs = require("fs")

const signaling = require("./signaling.js")
 
const config = JSON.parse(fs.readFileSync("./server/config.json"))

const PORT = process.env.PORT || config.port
const HOST = config.host

const wsserver = new ws.Server({host:HOST, port: PORT})


signaling.setConfig({
	isClientIdsPublic: config.isClientIdsPublic,	// If true, all client ids are retrievable in the client side
	clientMaxUnreachableTime: config.clientMaxUnreachableTime,	// milliseconds
	clientMaxConnectionTime: config.clientMaxConnectionTime,
	allowPayloadStoring: config.allowPayloadStoring,
	displayErrors: config.displayErrors,
	verificationHash: config.verificationHash
})


wsserver.on("connection", (client, req)=>{
	signaling.addNewClient(client)
})

