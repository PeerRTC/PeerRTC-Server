const ws = require("ws")
const fs = require("fs")
const signaling = require("./signaling.js")
 
const config = JSON.parse(fs.readFileSync("config.json"))

const PORT = process.env.PORT || config.port
const HOST = config.host

const wsserver = new ws.Server({host:HOST, port: PORT})


signaling.setConfig({
	isClientIdsPublic: config.isClientIdsPublic,	// If true, all client ids are retrievable in the client side
	clientMaxUnreachableTime: config.clientMaxUnreachableTime	//milliseconds
})


wsserver.on("connection", (client, req)=>{
	var ip = req.socket.remoteAddress
	if (!ip) {
		const forwadedFor = req.headers['x-forwarded-for']
		if (header) {
			ip = forwadedFor.split(',')[0].trim()
		}
		
	}
	
	console.log(ip)
	signaling.addNewClient(client)
})

