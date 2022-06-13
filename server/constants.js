class Constants{
	// server request constants
	static REQ_TYPE_CONNECT_PEER = "connectpeer"
	static REQ_TYPE_ANSWER_PEER = "answerpeer"
	static REQ_TYPE_PEER_IDS = "peerids"
	static REQ_TYPE_ADD_PAYLOAD = "addpayload"
	static REQ_TYPE_ADD_PRIVATE_PAYLOAD = "addprivatepayload"
	static REQ_TYPE_GET_ALL_PEER_PAYLOADS = "getallpeerpayloads"
	static REQ_TYPE_GET_PEER_PAYLOAD = "getpeerpayload"
	static REQ_TYPE_DECLINE_PEER_CONNECT = "declinepeerconnect"


	// response related constants
	static RES_TYPE_INITIAL = "initial"
	static RES_TYPE_INCOMING_PEER = "incomingpeer"
	static RES_TYPE_ANSWER_PEER = "answerpeer"
	static RES_TYPE_PEER_IDS = "peerids"
	static RES_TYPE_NEW_PAYLOAD = "newpayload"
	static RES_TYPE_NEW_PRIVATE_PAYLOAD = "newprivatepayload"
	static RES_ALL_PEER_PAYLOADS = "allpeerpayloads"
	static RES_PEER_PAYLOAD = "peerpayload"
	static RES_PEER_CONNECT_DECLINE = "peerconnectdecline"
	static RES_TYPE_ADMIN_BROADCAST_DATA = "broadcastdata"
	static RES_TYPE_ADMIN_GET_ALL_CLIENTS_DATA = "getallclientsdata"
	static RES_TYPE_ADMIN_ACTION_DECLINE = "adminactiondecline"


	// admin related constants
	static REQ_TYPE_ADMIN = "admin"
	static ADMIN_ACTION_BROADCAST_DATA = "broadcastdata"
	static ADMIN_ACTION_GET_ALL_CLIENTS_DATA = "getallclientsdata"

}



module.exports = {
	Constants:Constants
}