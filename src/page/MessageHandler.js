//表格产生改动时生成的Message传到这里处理
//表格接收到的远程Message传到这里处理
//messages:CellValueChange;insertRow;insertCol;deleteRow;deleteCol;undo;rodo
//commands:modify;insertAtRow;insertAtCol;deleteRow;deleteCol
import CommandHandler from './CommandHandler';
class MessageHandler{
    constructor(webSocket,userId,fileId) {

        this.userId = userId;
        this.fileId = fileId;
        this.webSocket = webSocket;
        this.send = this.send.bind(this);
        this.receive = this.receive.bind(this);
        //冲突处理部分
        this.xform = this.xform.bind(this);
        this.outgoing = {};
        this.myMessages = 0;
        this.otherMessages = 0;
        //缓冲处理
        //this.receiveBuffer = [];
        //this.receiveToBuffer = this.receiveToBuffer.bind(this);
        //this.applyBuffer = this.applyBuffer.bind(this);

    }
    //接收到本地表格的操作，转换成message
    send = (command)=> {
        if(command === {}) {
            return;
        }

        let message = CommandHandler.CommandToMessage(command);
        message['userId'] = this.userId;
        message['fileId'] = this.fileId;
        message['state'] = this.otherMessages;
        //console.log(message);
        if(this.webSocket.readyState === this.webSocket.OPEN) {
            this.webSocket.send(JSON.stringify(message));
        }

        message['state'] = this.myMessages;
        this.outgoing[this.myMessages] = message;
        this.myMessages = this.myMessages + 1;
        
        //console.log(this.outgoing);

    }
    receive = (message)=> {
        //与已经执行过的消息对比
        Object.keys(this.outgoing).forEach(element=> {
            if(this.outgoing[element]['state'] < message['state']) {
                delete this.outgoing[element];
            }
        });
        let msg = message;
        Object.keys(this.outgoing).forEach(element=> {
            message = this.xform(msg,this.outgoing[element]);
        })

        //这里添加转换成command返回给handleMessage去执行变动
        let command = CommandHandler.MessageToCommand(message);
        //console.log(command);
        this.otherMessages = this.otherMessages + 1;
        return command;
    }
    xform = (message1,message2)=> {
        if(message1['operation'] === 'CellValueChange' && message2['operation'] === 'insertRow') {
            if(message1['row'] >= message2['row']) {
                message1['row'] = message1['row'] + 1;
            }
        }
        else if(message1['operation'] === 'CellValueChange' && message2['operation'] === 'deleteRow') {
            if(message1['row'] >= message2['row']) {
                message1['row'] = message1['row'] - 1;
            }
        }
        else if(message1['operation'] === 'CellValueChange' && message2['operation'] === 'insertCol') {
            if(message1['col'] >= message2['col']) {
                message1['col'] = message1['col'] + 1;
            }
        }
        else if(message1['operation'] === 'CellValueChange' && message2['operation'] === 'deleteCol') {
            if(message1['col'] >= message2['col']) {
                message1['col'] = message1['col'] -1;
            }
        }
        else if(message1['operation'] === 'insertRow' && message2['operation'] === 'insertRow') {
            if(message1['row'] <= message2['row']) {
                message2['row'] = message2['row'] + 1;
            }
            else {
                message1['row'] = message1['row'] + 1;
            }
        }
        else if(message1['operation'] === 'deleteRow' && message2['operation'] === 'deleteRow') {
            if(message1['row'] <= message2['row']) {
                message2['row'] = message2['row'] + 1;
            }
            else {
                message1['row'] = message1['row'] + 1;
            }
        }
        //else if(message1['operation'] === )
        return message1;
    }
}

export default MessageHandler;