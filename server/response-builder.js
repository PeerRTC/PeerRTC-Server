const utils = require("./utils.js")
const {Constants} = require("./constants.js")

class ResponseBuilder{
	
	constructor(){
		this.response = {}
	}


	getResponse(){
		this.response.responseTime = utils.getNowMillis()
		return JSON.stringify(this.response)
	}


	// for building the response for type initial
	buildTypeInitial(id, connectionCreationTime){
		const response = this.response
		response.type = Constants.RES_TYPE_INITIAL
		response.id = id
		response.connectionCreationTime = connectionCreationTime
	}


	// for building the response for type sdp
	buildTypeIncomingPeer(fromId, iceCandidates, sdpData){
		const response = this.response
		response.type = Constants.RES_TYPE_INCOMING_PEER
		response.fromId = fromId
		response.iceCandidates = iceCandidates
		response.sdp = sdpData
	}


	// for building the response for type sdp
	buildTypeAnswerPeer(fromId, iceCandidates, sdpData){
		const response = this.response
		response.type = Constants.RES_TYPE_ANSWER_PEER
		response.fromId = fromId
		response.iceCandidates = iceCandidates
		response.sdp = sdpData
	}


	buildTypePeerIds(peerIds){
		const response = this.response
		response.type = Constants.RES_TYPE_PEER_IDS
		response.ids = peerIds
	}


	buildTypeNewPayload(payload){
		const response = this.response
		response.type = Constants.RES_TYPE_NEW_PAYLOAD
		response.payload = payload
	}


	buildTypeNewPrivatePayload(payload){
		const response = this.response
		response.type = Constants.RES_TYPE_NEW_PRIVATE_PAYLOAD
		response.payload = payload
	}


	buildTypeAllPeerPayloads(payloads){
		const response = this.response
		response.type = Constants.RES_ALL_PEER_PAYLOADS
		response.payloads = payloads
	}

	buildTypePeerPayload(peerId, payload){
		const response = this.response
		response.type = Constants.RES_PEER_PAYLOAD
		response.peerId = peerId
		response.payload = payload

	}

	buildTypePeerConnectDecline(id){
		const response = this.response
		response.type = Constants.RES_PEER_CONNECT_DECLINE
		response.peerId = id
	}


	buildTypeAdminBroadcastData(data){
		const response = this.response
		response.type = Constants.RES_TYPE_ADMIN_BROADCAST_DATA
		response.data = data
	}


	buildTypeAdminGetAllClientsData(jsonData){
		const response = this.response
		response.type = Constants.RES_TYPE_ADMIN_GET_ALL_CLIENTS_DATA
		response.data = jsonData
	}


	buildTypeAdminActionDecline(){
		const response = this.response
		response.type = Constants.RES_TYPE_ADMIN_ACTION_DECLINE
	}
}



module.exports = {
	ResponseBuilder:ResponseBuilder
}