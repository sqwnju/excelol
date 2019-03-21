class webeditor {
    static createWebsocket(userId,fileId,handleMessage) {
        let ws;
        if("WebSocket" in window) {
            let url = "ws://localhost:8080/websocket/"+userId+"/"+fileId;
            ws = new WebSocket(url);
            ws.onerror = this.onError;
            ws.onopen = this.onOpen;
            ws.onmessage = (evt)=> {
                handleMessage(evt);
            }
            ws.onclose = this.onClose;
        }
        else {
            alert("浏览器不支持WebSocket");
        }
        return ws;
    }
    static onOpen() {
        console.log("openning...");
    }
    static onError() {
        console.log("error...");
    }
    static onClose() {
        console.log("closing...");
    }
}

export default webeditor;