# PeerRTC-Server 💻
Backend server for the [PeerRTC](https://github.com/PeerRTC/PeerRTC) module. This server is used as the signaling server for clients coming from
the PeerRTC clients. This server can also be used as a temporary storage for client related data and payloads.

## ❗ Note
* Add credits and attribution to this [website](https://peerrtc.github.io/) when using the backend server.
* This module is still in beta phase and can be unstable. 
* Source code contributions and bug reports are encouraged.

## ⚙️ Setup
1. Install [Node.js](https://nodejs.org/en/) first. Skip this step if already installed.
2. Clone this [repository](https://github.com/PeerRTC/PeerRTC-Server).
3. In command line, navigate to root directory of the newly downloaded repository.
4. Install all needed dependencies via `npm install` in the command line.
5. Start the server by entering `npm start` in the command line.

## 🔧 Modifying configurations
Server configurations can be modified in the `server/config.json` as found [here](https://github.com/PeerRTC/PeerRTC-Server/blob/main/server/config.json).
<hr/>

`host` : `string` <br/>
* A string host address to be used by the server. <br/>
<hr/>

`port` : `number` <br/>
* The port number the server will be using. <br/>
<hr/>

`isClientIdsPublic` : `boolean` <br/>
* Whether all client ids are retrievable by all of the connected peer. Public payloads can also be retrieved if this flag is set to true.
Admin related methods however are exempted by this flag because it caan retrieve all client's data. <br/>
<hr/>

`clientMaxUnreachableTime` : `number` <br/>
* The maximum time in milliseconds a client is unreachable by the backend server through ping before disconnecting it. Setting this flag to negative number 
means unlimited maximum unreachable time.<br/>
<hr/>

`clientMaxConnectionTime` : `number` <br/>
* The maximum time in milliseconds a client can remain connected in a server before disconnecting it. Setting this flag to negative number 
means unlimited maximum connection time. <br/>
<hr/>

`allowPayloadStoring` : `boolean` <br/>
* Whether to allow storing both [public](https://github.com/PeerRTC/PeerRTC#addpayload-method) and [private](https://github.com/PeerRTC/PeerRTC#addprivatepayload-method) payloads from clients. Set this to false if there is no plan of storing payloads to prevent unauthorized data storage. <br/>
<hr/>

`displayErrors` : `boolean` <br/>
* Whether to display error messages when errors occur in command line. <br/>
<hr/>

`verificationHash` : `string` <br/>
* The sha256 hash of the key that are used in admin related api in [PeerRTC](https://github.com/PeerRTC/PeerRTC) client. Setting
this flag to empty string means that admin related task are disabled. <br/>
<hr/>
