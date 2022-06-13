const utils = require("./utils.js")
const SHA256 = require("crypto-js/sha256")
const {ResponseBuilder} = require("./response-builder.js")
const {Constants} = require("./constants.js")

const clients = new Map()

var config = null

//set the configurations for signaling
function setConfig(c) {
	config = c
}

function addNewClient(client){
	var id = null
	
	// prevent id duplicates
	while(!id || clients.has(id)){
		id = utils.uuidv4()
	}

	client.on("message", data=>{
		handleMessage(id, data)
	})

	client.on("close", () => {
		clients.delete(id)
	})


	
	const metadata = {
		client: client,
		creationTime: utils.getNowMillis()
	}

	clients.set(id, metadata)

	const res = new ResponseBuilder()
	res.buildTypeInitial(id, metadata.creationTime)
	client.send(res.getResponse())

	attachClientLifeChecker(client)
	attachtMaxConnectTime(client)
}

function attachClientLifeChecker(client){
	var alive = true
	const interval = setInterval(()=>{
		if (!alive) {
			client.close()
			clearInterval(interval)
		}
		try{
			client.ping()
		}catch(e){

		}
		alive = false
	}, config.clientMaxUnreachableTime)

	client.on("pong", ()=>{
		alive = true
	})
}


function attachtMaxConnectTime(client){
	const maxTime = config.clientMaxConnectionTime
	if (typeof maxTime == "number") {
		setTimeout(()=>{
			client.close()
		}, maxTime)
	}
}

function handleMessage(requesterId, data){
	try{
		const jsonData = JSON.parse(data)
		const res = new ResponseBuilder()
		var toId = null


		if (jsonData.type == Constants.REQ_TYPE_CONNECT_PEER) {
			const peerId = jsonData.peerId

			// Request connection only if target exists
			if (clients.has(peerId)) {
				toId = peerId
				res.buildTypeIncomingPeer(requesterId, jsonData.iceCandidates, jsonData.sdp)
			}
		
		} else if (jsonData.type == Constants.REQ_TYPE_ANSWER_PEER) {
			const peerId = jsonData.peerId

			// Send answer only if target exists
			if (clients.has(peerId)) {
				toId = peerId
				res.buildTypeAnswerPeer(requesterId, jsonData.iceCandidates, jsonData.sdp)
			}
		} else if (jsonData.type == Constants.REQ_TYPE_PEER_IDS) {
			toId = jsonData.id
			const ids = []
			if (config.isClientIdsPublic) {
				for(id of clients.keys()){
					ids.push(id)
				}
			}
			
			res.buildTypePeerIds(ids)

		} else if (jsonData.type == Constants.REQ_TYPE_ADD_PAYLOAD) {
			toId = requesterId
			const payload = JSON.parse(jsonData.payload)
			clients.get(requesterId).payload = payload
			res.buildTypeNewPayload(jsonData.payload)
		} else if (jsonData.type == Constants.REQ_TYPE_ADD_PRIVATE_PAYLOAD) {
			toId = requesterId
			const payload = JSON.parse(jsonData.payload)
			clients.get(requesterId).privatePayload = payload 
			res.buildTypeNewPayload(jsonData.payload)
		} else if (jsonData.type == Constants.REQ_TYPE_GET_ALL_PEER_PAYLOADS) {
			toId = requesterId
			const payloads = []
			if (config.isClientIdsPublic) {
				for(id of  clients.keys()){
					payloads.push(JSON.stringify({
						"id": id,
						"payload": clients.get(id).payload
					}))
				}

			}

			res.buildTypeAllPeerPayloads(payloads)

		} else if(jsonData.type == Constants.REQ_TYPE_GET_PEER_PAYLOAD){
			toId = requesterId
			var peerId = jsonData.peerId
			const peer = clients.get(peerId)
			var payload = undefined
			if (peer ) {
				payload = peer.payload
			} else{
				peerId = undefined
			}

			res.buildTypePeerPayload(peerId, payload)
		} else if(jsonData.type == Constants.REQ_TYPE_DECLINE_PEER_CONNECT){
			toId = jsonData.peerId
			res.buildTypePeerConnectDecline(requesterId)
		} else if (jsonData.type == Constants.REQ_TYPE_ADMIN) {
			const hash = config.verificationHash
			const key = jsonData.key
			if (hash != "" && SHA256(key).toString() == hash) {
				const action = jsonData.action
				if (action ==  Constants.ADMIN_ACTION_BROADCAST_DATA) {
					for(metadata of clients.values()){
						const adminRes = new ResponseBuilder()
						adminRes.buildTypeAdminBroadcastData(jsonData.data)
						metadata.client.send(adminRes.getResponse())
					}
				} else if (action == Constants.ADMIN_ACTION_GET_ALL_CLIENTS_DATA) {
					const adminRes = new ResponseBuilder()
					const clientsData = []
					for(id of clients.keys()){
						const metadata = clients.get(id)
						const metadataKeys = Object.keys(metadata)
						const response = {}

						response.id = id
						for(metaKey of metadataKeys){
							response[metaKey] = metadata[metaKey]
						}

						delete response.client
						clientsData.push(response)
						
					}
					adminRes.buildTypeAdminGetAllClientsData(clientsData)
					clients.get(requesterId).client.send(adminRes.getResponse())
				}
				
			} else{
				toId = requesterId
				res.buildTypeAdminActionDecline()
			}
		}


		if (toId) {
			clients.get(toId).client.send(res.getResponse())
		}


	}catch(e){

		if (config.displayErrors) {
			console.log(e)
		}

	}
	
}




module.exports = {
	addNewClient:addNewClient,
	setConfig:setConfig
	
}

