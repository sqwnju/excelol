//将操作信息和指令之间进行转换
//操作主要围绕：修改单元格内容（加锁先不考虑）；增删行列
//messages:lock;CellValueChange;insertRow;insertCol;deleteRow;deleteCol;undo;rodo;insertCellLeft;insertCellUp;deleteCellUp;deleteCellLeft;
//commands:lock;modify;insertAtRow;insertAtCol;deleteRow;deleteCol;undo;redo;insertCellAtLeft;insertCellAtUp;deleteCellAndUp;deleteCellAndLeft;
class CommandHandler{
    //用于将从服务器接收到的message转换成commmand
    static MessageToCommand(message) {
        let command = {};
        
        if(message['operation'] === 'lock') {
            command['evt'] = 'lock';
            command['cell'] = message['changes'];
        }
        if(message['operation'] === 'CellValueChange') {
            command['evt'] = 'modify';
            command['changes'] = message['changes'];
        }
        if(message['operation'] === 'insertRow') {
            command['evt'] = 'insertAtRow';
            command['row'] = message['row'];
        }
        if(message['operation'] === 'insertCol') {
            command['evt'] = 'insertAtCol';
            command['col'] = message['col'];
        }
        if(message['operation'] === 'deleteRow') {
            command['evt'] = 'deleteRow';
            command['row'] = message['row'];
        }
        if(message['operation'] === 'deleteCol') {
            command['evt'] = 'deleteCol';
            command['col'] = message['col'];
        }
        if(message['operation'] === 'insertCellLeft') {
            command['evt'] = 'insertCellAtLeft';
            command['row'] = message['row'];
            command['col'] = message['col'];
        }
        if(message['operation'] === 'insertCellUp') {
            command['evt'] = 'insertCellAtUp';
            command['row'] = message['row'];
            command['col'] = message['col'];
        }
        if(message['operation'] === 'deleteCellUp') {
            command['evt'] = 'deleteCellAndUp';
            command['row'] = message['row'];
            command['col'] = message['col'];
        }
        if(message['operation'] === 'deleteCellLeft') {
            command['evt'] = 'deleteCellAndLeft';
            command['row'] = message['row'];
            command['col'] = message['col'];
        }
        if(message['operation'] === 'clearAllCells') {
            command['evt'] = 'clearTheSheet';
        }
        if(message['operation'] === 'clearCell') {
            command['evt'] = 'clearCellAt';
            command['row'] = message['row'];
            command['col'] = message['col'];
        }
        if(message['operation'] === 'clearSheet') {
            command['evt'] = 'clearTheSheet';
        }
        if(message['operation'] === 'sortA') {
            command['evt'] = 'sortColAZ';
            command['col'] = message['col'];
        }
        if(message['operation'] === 'sortZ') {
            command['evt'] = 'sortColZA';
            command['col'] = message['col'];
        }
        if(message['operation'] === 'sortByThisColA') {
            command['evt'] = 'sortTheSheetAZByCol';
            command['col'] = message['col'];
        }
        if(message['operation'] === 'sortByThisColZ') {
            command['evt'] = 'sortTheSheetZAByCol';
            command['col'] = message['col'];
        }
        if(message['operation'] === 'undo') {
            command['evt'] ='undo';
        }
        if(message['operation'] === 'redo') {
            command['evt'] = 'redo';
        }
        if(message['operation'] === 'exchangeRows') {
            command['evt'] = 'exchangeTwoRows';
            command['row1'] = message['row1'];
            command['row2'] = message['row2'];
        }
        if(message['operation'] === 'exchangeCols') {
            command['evt'] = 'exchangeTwoCols';
            command['col1'] = message['col1'];
            command['col2'] = message['col2'];
        }
        return command;

    }
    //用于将本地的command转换成message用以传给服务器
    static CommandToMessage(command) {
        let message = {
            changes:{},
            userId:"",
            fileId:"",
            operation:"",
            row:0,
            col:0,
            value:"",
            state:0,
        }
        if(command['evt'] === 'lock') {
            message['operation'] = 'lock';
            message['row'] = command['row'];
            message['col'] = command['col'];
            message['changes'] = command['cell'];
        }
        if(command['evt'] === 'modify') {
            message['operation'] = 'CellValueChange';
            let changes = command['changes'];
            //console.log(cells);
            let cell = changes[0];
            message['changes'] = changes;
            message['value'] = cell['value'];
        }
        if(command['evt'] === 'insertAtRow') {
            message['operation'] = 'insertRow';
            message['row'] = command['row'];
        }
        if(command['evt'] === 'insertAtCol') {
            message['operation'] = 'insertCol';
            message['col'] = command['col'];
        }
        if(command['evt'] === 'deleteRow') {
            message['operation'] = 'deleteRow';
            message['row'] = command['row'];
        }
        if(command['evt'] === 'deleteCol') {
            message['operation'] = 'deleteCol';
            message['col'] = command['col'];
        }
        if(command['evt'] === 'insertCellAtLeft') {
            message['operation'] = 'insertCellLeft';
            message['row'] = command['row'];
            message['col'] = command['col'];
        }
        if(command['evt'] === 'insertCellAtUp') {
            message['operation'] = 'insertCellUp';
            message['row'] = command['row'];
            message['col'] = command['col'];
        }
        if(command['evt'] === 'deleteCellAndUp') {
            message['operation'] = 'deleteCellUp';
            message['row'] = command['row'];
            message['col'] = command['col'];
        }
        if(command['evt'] === 'deleteCellAndLeft') {
            message['operation'] = 'deleteCellLeft';
            message['row'] = command['row'];
            message['col'] = command['col'];
        }
        if(command['evt'] === 'clearTheSheet') {
            message['operation'] = 'clearSheet';
        }
        if(command['evt'] === 'clearCellAt') {
            message['operation'] = 'clearCell';
            message['row'] = command['row'];
            message['col'] = command['col'];
        }
        if(command['evt'] === 'undo') {
            message['operation'] = 'undo';
        }
        if(command['evt'] === 'redo') {
            message['operation'] = 'redo';
        }
        if(command['evt'] === 'sortColAZ') {
            message['operation'] = 'sortA';
            message['col'] = command['col'];
        }
        if(command['evt'] === 'sortColZA') {
            message['operation'] = 'sortZ';
            message['col'] = command['col'];
        }
        if(command['evt'] === 'sortTheSheetAZByCol') {
            message['operation'] = 'sortByThisColA';
            message['col'] = command['col'];
        }
        if(command['evt'] === 'sortTheSheetZAByCol') {
            message['operation'] = 'sortByThisColZ';
            message['col'] = command['col'];
        }
        if(command['evt'] === 'exchangeTwoRows') {
            message['operation'] = 'exchangeRows';
            message['row1'] = command['row1'];
            message['row2'] = command['row2'];
        }
        if(command['evt'] === 'exchangeTwoCols') {
            message['operation'] = 'exchangeCols';
            message['col1'] = command['col1'];
            message['col2'] = command['col2'];
        }
        return message;
    }
}

export default CommandHandler;