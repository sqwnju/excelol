import React, {Component} from 'react';
import { Button } from '_antd@3.16.2@antd';
import _ from 'lodash';
import mathjs from 'mathjs';
import Datasheet from '../components/DataSheet';
import webeditor from './webeditor';
import MessageHandler from './MessageHandler';
import 'react-datasheet/lib/react-datasheet.css';

//import '../components/react-datasheet.css';


//TODO2:实现undo/redo √
//TODO3:改良表格格式
//TODO4:按行按列添加单元格  √
//TODO5:冲突处理，当前就有:如果远程改动的单元格本地当前正在编辑，会被忽略，并且将改动覆盖发送给远程
//TODO:以谁的单元格为准（两个单元格的值，加锁，查看相应的论文理论）（急！）（ethercalc的理念或者？冲突时让用户自己选择？）jupiter的算法
//TODO:考虑其他东西


//当前：普通表格，公式运算

let sheet = {
      'A1': {key: 'A1', value: '语文', expr: '',editing: false},
      'A2': {key: 'A2', value: '数学', expr: '',editing: false},
      'A3': {key: 'A3', value: '英语', expr: '',editing: false},
      'A4': {key: 'A4', value: '计算机', expr: '',editing: false},
      'A5': {key: 'A5', value: '', expr: '',editing: false},
      'A6': {key: 'A6', value: '', expr: '',editing: false},
      'A7': {key: 'A7', value: '', expr: '',editing: false},
      'A8': {key: 'A8', value: '', expr: '',editing: false},
      'A9': {key: 'A9', value: '', expr: '',editing: false},
      'A10': {key: 'A10', value: '', expr: '',editing: false},
      'A11': {key: 'A11', value: '', expr: '',editing: false},
      'A12': {key: 'A12', value: '', expr: '',editing: false},
      'A13': {key: 'A13', value: '', expr: '',editing: false},
      'A14': {key: 'A14', value: '', expr: '',editing: false},
      'A15': {key: 'A15', value: '', expr: '',editing: false},
      'A16': {key: 'A16', value: '', expr: '',editing: false},
      'A17': {key: 'A17', value: '', expr: '',editing: false},
      'A18': {key: 'A18', value: '', expr: '',editing: false},
      'A19': {key: 'A19', value: '', expr: '',editing: false},
      'B1': {key: 'B1', value: '90', expr: '',editing: false},
      'B2': {key: 'B2', value: '80', expr: '',editing: false},
      'B3': {key: 'B3', value: '70', expr: '',editing: false},
      'B4': {key: 'B4', value: '100', expr: '',editing: false},
      'B5': {key: 'B5', value: '', expr: '',editing: false},
      'B6': {key: 'B6', value: '', expr: '',editing: false},
      'B7': {key: 'B7', value: '', expr: '',editing: false},
      'B8': {key: 'B8', value: '', expr: '',editing: false},
      'B9': {key: 'B9', value: '', expr: '',editing: false},
      'B10': {key: 'B10', value: '', expr: '',editing: false},
      'B11': {key: 'B11', value: '', expr: '',editing: false},
      'B12': {key: 'B12', value: '', expr: '',editing: false},
      'B13': {key: 'B13', value: '', expr: '',editing: false},
      'B14': {key: 'B14', value: '', expr: '',editing: false},
      'B15': {key: 'B15', value: '', expr: '',editing: false},
      'B16': {key: 'B16', value: '', expr: '',editing: false},
      'B17': {key: 'B17', value: '', expr: '',editing: false},
      'B18': {key: 'B18', value: '', expr: '',editing: false},
      'B19': {key: 'B19', value: '', expr: '',editing: false},
      'C1': {key: 'C1', value: '', expr: '',editing: false},
      'C2': {key: 'C2', value: '', expr: '',editing: false},
      'C3': {key: 'C3', value: '', expr: '',editing: false},
      'C4': {key: 'C4', value: '', expr: '',editing: false},
      'C5': {key: 'C5', value: '', expr: '',editing: false},
      'C6': {key: 'C6', value: '', expr: '',editing: false},
      'C7': {key: 'C7', value: '', expr: '',editing: false},
      'C8': {key: 'C8', value: '', expr: '',editing: false},
      'C9': {key: 'C9', value: '', expr: '',editing: false},
      'C10': {key: 'C10', value: '', expr: '',editing: false},
      'C11': {key: 'C11', value: '', expr: '',editing: false},
      'C12': {key: 'C12', value: '', expr: '',editing: false},
      'C13': {key: 'C13', value: '', expr: '',editing: false},
      'C14': {key: 'C14', value: '', expr: '',editing: false},
      'C15': {key: 'C15', value: '', expr: '',editing: false},
      'C16': {key: 'C16', value: '', expr: '',editing: false},
      'C17': {key: 'C17', value: '', expr: '',editing: false},
      'C18': {key: 'C18', value: '', expr: '',editing: false},
      'C19': {key: 'C19', value: '', expr: '',editing: false},
      'D1': {key: 'D1', value: '', expr: '',editing: false},
      'D2': {key: 'D2', value: '', expr: '',editing: false},
      'D3': {key: 'D3', value: '', expr: '',editing: false},
      'D4': {key: 'D4', value: '', expr: '',editing: false},
      'D5': {key: 'D5', value: '', expr: '',editing: false},
      'D6': {key: 'D6', value: '', expr: '',editing: false},
      'D7': {key: 'D7', value: '', expr: '',editing: false},
      'D8': {key: 'D8', value: '', expr: '',editing: false},
      'D9': {key: 'D9', value: '', expr: '',editing: false},
      'D10': {key: 'D10', value: '', expr: '',editing: false},
      'D11': {key: 'D11', value: '', expr: '',editing: false},
      'D12': {key: 'D12', value: '', expr: '',editing: false},
      'D13': {key: 'D13', value: '', expr: '',editing: false},
      'D14': {key: 'D14', value: '', expr: '',editing: false},
      'D15': {key: 'D15', value: '', expr: '',editing: false},
      'D16': {key: 'D16', value: '', expr: '',editing: false},
      'D17': {key: 'D17', value: '', expr: '',editing: false},
      'D18': {key: 'D18', value: '', expr: '',editing: false},
      'D19': {key: 'D19', value: '', expr: '',editing: false},
      'E1': {key: 'E1', value: '', expr: '',editing: false},
      'E2': {key: 'E2', value: '', expr: '',editing: false},
      'E3': {key: 'E3', value: '', expr: '',editing: false},
      'E4': {key: 'E4', value: '', expr: '',editing: false},
      'E5': {key: 'E5', value: '', expr: '',editing: false},
      'E6': {key: 'E6', value: '', expr: '',editing: false},
      'E7': {key: 'E7', value: '', expr: '',editing: false},
      'E8': {key: 'E8', value: '', expr: '',editing: false},
      'E9': {key: 'E9', value: '', expr: '',editing: false},
      'E10': {key: 'E10', value: '', expr: '',editing: false},
      'E11': {key: 'E11', value: '', expr: '',editing: false},
      'E12': {key: 'E12', value: '', expr: '',editing: false},
      'E13': {key: 'E13', value: '', expr: '',editing: false},
      'E14': {key: 'E14', value: '', expr: '',editing: false},
      'E15': {key: 'E15', value: '', expr: '',editing: false},
      'E16': {key: 'E16', value: '', expr: '',editing: false},
      'E17': {key: 'E17', value: '', expr: '',editing: false},
      'E18': {key: 'E18', value: '', expr: '',editing: false},
      'E19': {key: 'E19', value: '', expr: '',editing: false},
      'F1': {key: 'F1', value: '', expr: '',editing: false},
      'F2': {key: 'F2', value: '', expr: '',editing: false},
      'F3': {key: 'F3', value: '', expr: '',editing: false},
      'F4': {key: 'F4', value: '', expr: '',editing: false},
      'F5': {key: 'F5', value: '', expr: '',editing: false},
      'F6': {key: 'F6', value: '', expr: '',editing: false},
      'F7': {key: 'F7', value: '', expr: '',editing: false},
      'F8': {key: 'F8', value: '', expr: '',editing: false},
      'F9': {key: 'F9', value: '', expr: '',editing: false},
      'F10': {key: 'F10', value: '', expr: '',editing: false},
      'F11': {key: 'F11', value: '', expr: '',editing: false},
      'F12': {key: 'F12', value: '', expr: '',editing: false},
      'F13': {key: 'F13', value: '', expr: '',editing: false},
      'F14': {key: 'F14', value: '', expr: '',editing: false},
      'F15': {key: 'F15', value: '', expr: '',editing: false},
      'F16': {key: 'F16', value: '', expr: '',editing: false},
      'F17': {key: 'F17', value: '', expr: '',editing: false},
      'F18': {key: 'F18', value: '', expr: '',editing: false},
      'F19': {key: 'F19', value: '', expr: '',editing: false},
      'G1': {key: 'G1', value: '', expr: '',editing: false},
      'G2': {key: 'G2', value: '', expr: '',editing: false},
      'G3': {key: 'G3', value: '', expr: '',editing: false},
      'G4': {key: 'G4', value: '', expr: '',editing: false},
      'G5': {key: 'G5', value: '', expr: '',editing: false},
      'G6': {key: 'G6', value: '', expr: '',editing: false},
      'G7': {key: 'G7', value: '', expr: '',editing: false},
      'G8': {key: 'G8', value: '', expr: '',editing: false},
      'G9': {key: 'G9', value: '', expr: '',editing: false},
      'G10': {key: 'G10', value: '', expr: '',editing: false},
      'G11': {key: 'G11', value: '', expr: '',editing: false},
      'G12': {key: 'G12', value: '', expr: '',editing: false},
      'G13': {key: 'G13', value: '', expr: '',editing: false},
      'G14': {key: 'G14', value: '', expr: '',editing: false},
      'G15': {key: 'G15', value: '', expr: '',editing: false},
      'G16': {key: 'G16', value: '', expr: '',editing: false},
      'G17': {key: 'G17', value: '', expr: '',editing: false},
      'G18': {key: 'G18', value: '', expr: '',editing: false},
      'G19': {key: 'G19', value: '', expr: '',editing: false},
}
class Sheet extends Component {

  constructor(props) {
    super(props);
    this.state = sheet;

    this.onCellsChanged = this.onCellsChanged.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.addRow = this.addRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.addCol = this.addCol.bind(this);
    this.deleteCol = this.deleteCol.bind(this);
    this.addCellDown = this.addCellDown.bind(this);
    this.addCellRight = this.addCellRight.bind(this);
    this.deleteCellUp = this.deleteCellUp.bind(this);
    this.deleteCellLeft = this.deleteCellLeft.bind(this);
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
    this.sortA = this.sortA.bind(this);
    this.sortZ = this.sortZ.bind(this)
    this.sortByThisColA = this.sortByThisColA.bind(this);
    this.sortByThisColZ = this.sortByThisColZ.bind(this);
    this.clearCell = this.clearCell.bind(this);
    this.clearSheet = this.clearSheet.bind(this);
    this.exchangeRows = this.exchangeRows.bind(this);
    this.exchangeCols = this.exchangeCols.bind(this);
    //this.sqr = this.sqr.bind(this);
    this.executeCommand = this.executeCommand.bind(this);

    var path = this.props.location['pathname'];
    var paths = path.toString().split('/');
    this.userId = paths[2];
    this.fileId = paths[3];
    this.handleMessage = this.handleMessage.bind(this);
    this.ws = webeditor.createWebsocket(this.userId,this.fileId,this.handleMessage);
    
    this.MessageHandler = new MessageHandler(this.ws,this.userId,this.fileId);

    this.rowLen = 19;
    this.colLen = 7;
    this.lastSelectedCell = {};
    this.previousSelectedCell = {};
    this.undoStack = [];
    this.undoStack.push({state:this.state, rowLen:this.rowLen, colLen:this.colLen});
    this.redoStack = [];
  }

  //生成表格数据
  generateGrid() {
    let rows = [];
    let cols = [];
    for(let i = 0;i < this.rowLen+1;i++)
      rows.push(i);
    cols.push('');
    for(let j = 1;j < this.colLen+1;j++)
      cols.push(String.fromCharCode(64+parseInt(j)));
    return rows.map((row, i) => 
      cols.map((col, j) => {
        if(i === 0 && j === 0) {
          return {readOnly: true, value: ''}
        }
        if(row === 0) {
          return {readOnly: true, value: col}
        } 
        if(j === 0) {
          return {readOnly: true, value: row}
        }
        return this.state[col + row]
      })
    )
  }

  //公式计算相关
  validateExpr(trailKeys, expr) {
    let valid = true;
    const matches = expr.match(/[A-Z][1-9]+/g) || [];
    matches.map(match => {
      if(trailKeys.indexOf(match) > -1) {
        valid = false
      } else {
        valid = this.validateExpr([...trailKeys, match], this.state[match].expr)
      }
    })
    return valid
  }

  computeExpr(key, expr, scope) {
    let value = null;
    if(expr.charAt(0) !== '=') {
      return {className: '', value: expr, expr: expr};
    } else {
      try {
        value = mathjs.eval(expr.substring(1), scope)
      } catch(e) {
        value = null
      }

      if(value !== null && this.validateExpr([key], expr)) {
        return {className: 'equation', value, expr}
      } else {
        return {className: 'error', value: 'error', expr: ''}
      }
    }
  }

  //将单元格的改动落实
  cellUpdate = (state, changeCell, expr)=> {
    const scope = _.mapValues(state, (val) => isNaN(val.value) ? 0 : parseFloat(val.value))
    const updatedCell = _.assign({}, changeCell, this.computeExpr(changeCell.key, expr, scope))
    state[changeCell.key] = updatedCell

    _.each(state, (cell, key) => {
      if(cell.expr.charAt(0) === '=' && cell.expr.indexOf(changeCell.key) > -1 && key !== changeCell.key) {
        state = this.cellUpdate(state, cell, cell.expr)
      }
    })
    return state
  }
  //undo
  undo = (isRemote)=> {
    if(this.undoStack.length === 0 || this.undoStack.length === 1 || this.undoStack.length >= 50) {
      return;
    }
    if(this.undoStack.length !== 1 && this.undoStack.length < 50) {
      //console.log(this.undoStack.length);
      let last = (this.undoStack.pop());
      //console.log(last);
      this.redoStack.push(last);
      let previous = this.undoStack[this.undoStack.length-1];
      this.rowLen = previous.rowLen;
      this.colLen = previous.colLen;
      this.setState(previous.state);
    }
    //发送服务器
    if(isRemote === false) {
      let command = {
        'evt': 'undo',
      }
      this.MessageHandler.send(command);
    }
    this.lastSelectedCell = {};
  }
  //redo
  redo = (isRemote)=> {
    if(this.redoStack.length === 0 || this.redoStack.length > 50) {
      return;
    }
    //console.log(this.redoStack.length);
    if(this.redoStack.length !==0) {
      let next = this.redoStack.pop();
      this.rowLen = next.rowLen;
      this.colLen = next.colLen;
      this.setState(next.state);
      this.undoStack.push(next);
    }

    if(isRemote === false) {
      let command = {
        'evt': 'redo',
      }
      this.MessageHandler.send(command);
    }
    this.lastSelectedCell = {};
  }

  //单元格改动
  onCellsChanged(changes,isRemote) {
    const state = _.assign({}, this.state)
    changes.forEach(({cell, value}) => {
      this.cellUpdate(state, cell, value);
      let key = cell["key"];
      this.state[key]["editing"] = false;
    })
    this.setState(state);
    
    if(isRemote === false) {
      let command = {
        "evt": "modify",
        "changes": changes,
      };
      this.MessageHandler.send(command);
    }
    if(state !== this.state) {
      this.undoStack.push({state:state,rowLen:this.rowLen,colLen:this.colLen});
      this.redoStack = [];
    }
  }

  //单机保存最后点击的位置，转移上一个最后选中的位置
  onCellClick = (row, col)=> {
    if(this.lastSelectedCell !== {}) {
      this.previousSelectedCell = _.assign({}, this.lastSelectedCell);
    }
    this.lastSelectedCell.row = row;
    this.lastSelectedCell.col = col;
  }

  //修改editing加锁
  onDoubleClick =(i, j, cell)=> {
    let command = {
      "evt": "lock",
      "row": i,
      "col": j,
      "cell": cell
    };
    this.MessageHandler.send(command);

  }

  //处理消息
  //必要添加：消息处理，因为要处理冲突
  handleMessage(eve) {

    var message = JSON.parse(eve.data);

    if(message['userId'] === this.userId || message['fileId'] !== this.fileId) {
      return;
    }

    var command = this.MessageHandler.receive(message);
    this.executeCommand(command);

    // let op = message["operation"];

    // if(op === "CellValueChange") {
    //   const state = _.assign({}, this.state);
    //   let changes = message['changes'];
      
    //   changes.forEach(({cell, value}) => {
    //     this.cellUpdate(state, cell, value);
    //     let key = cell["key"];
    //     this.state[key]["editing"] = false;
    //   })
    //   this.setState(state);
    // }
    // else if(op === 'lock') {
    //   let cell= message['changes'];
    //   let key = cell['key'];
    //   this.state[key]["editing"] = true;
    // }
    // else if(op === 'insertRow') {
    //   this.addRow(message['row'], true);
    // }
    // else if(op === 'insertCol') {
    //   this.addCol(message['col'], true);
    // }
    // else if(op === 'deleteRow') {
    //   this.deleteRow(message['row'], true);
    // }
    // else if(op === 'deleteCol') {
    //   this.deleteCol(message['col'], true);
    // }
  }

  executeCommand = (command)=> {

    var op = command['evt'];

    if(op === 'modify') {
      let changes = command['changes'];
      this.onCellsChanged(changes,true);
    }
    else if(op === 'lock') {
      let cell= command['cell'];
      let key = cell['key'];
      this.state[key]["editing"] = true;
    }
    else if(op === 'insertAtRow') {
      this.addRow(command['row'], true);
    }
    else if(op === 'insertAtCol') {
      this.addCol(command['col'], true);
    }
    else if(op === 'deleteRow') {
      this.deleteRow(command['row'], true);
    }
    else if(op === 'deleteCol') {
      this.deleteCol(command['col'], true);
    }
    else if(op === 'insertCellAtLeft') {
      this.addCellRight(command['row'], command['col'], true);
    }
    else if(op === 'insertCellAtUp') {
      this.addCellDown(command['row'], command['col'], true);
    }
    else if(op === 'deleteCellAndUp') {
      this.deleteCellUp(command['row'], command['col'], true);
    }
    else if(op === 'deleteCellAndLeft') {
      this.deleteCellLeft(command['row'], command['col'], true);
    }
    else if(op === 'sortColAZ') {
      this.sortA(command['col'], true);
    }
    else if(op === 'sortColZA') {
      this.sortZ(command['col'], true);
    }
    else if(op === 'sortTheSheetAZByCol') {
      this.sortByThisColA(command['col'], true);
    }
    else if(op === 'sortTheSheetZAByCol') {
      this.sortByThisColZ(command['col'], true);
    }
    else if(op === 'clearTheSheet') {
      this.clearSheet(true);
    }
    else if(op === 'clearCellAt') {
      this.clearCell(command['row'], command['col'], true);
    }
    else if(op === 'undo') {
      this.undo(true);
    }
    else if(op === 'redo') {
      this.redo(true);
    }
    else if(op === 'exchangeTwoRows') {
      this.exchangeRows(command['row1'], command['row2'], true);
    }
    else if(op === 'exchangeTwoCols') {
      this.exchangeCols(command['col1'], command['col2'], true);
    }
  }

  //删除一行
  deleteRow = (deletePos, isRemote)=> {
    if(_.isEmpty(this.lastSelectedCell) === true && isRemote === false) {
      return;
    }
    const state = _.assign({},this.state);
    var currentRow;
    if(isRemote === false) {
      currentRow = this.lastSelectedCell.row;
    } else {
      currentRow = deletePos;
    }
    if(currentRow === 0) {
      console.log("不能删除标题行");
      return;
    }
    let part1 = {};
    let part2 = {};

    for(let i = 1;i < currentRow; i++) {
      for(let j = 1;j < this.colLen+1;j++) {
        let key = String.fromCharCode(64+parseInt(j)).concat(i.toString());
        part1[key] = Object.assign({},state[key]);
      }
    }
    for(let j = 1;j < this.colLen;j++) {
      for(let i = currentRow;i < this.rowLen;i++) {
        let key = String.fromCharCode(64+parseInt(j)).concat(i.toString());
        let key2 = String.fromCharCode(64+parseInt(j)).concat((i+1).toString());
        part2[key] = Object.assign({},state[key2]);
        part2[key]['key'] = key;
        // part2[key]['value'] = state[key2]['value'];
        // part2[key]['expr'] = state[key2]['expr'];
        // part2[key]['editing'] = state[key2]['editing'];
      }
    }
    //console.log(part1);
    //console.log(part2);
    let newState = Object.assign({},part1,part2);
    //console.log(newState);
    this.rowLen = this.rowLen-1;
    this.setState(newState);

    if(isRemote === false) {
      let command = {
        "evt": "deleteRow",
        "row": currentRow,
      };
      this.MessageHandler.send(command);
      this.lastSelectedCell = {};
    }

    this.undoStack.push({state:newState,rowLen:this.rowLen,colLen:this.colLen});
    this.redoStack = [];
  }
  //增加一行
  addRow = (insertPos, isRemote)=> {
    //先假设肯定选了吧...
    if(_.isEmpty(this.lastSelectedCell) === true && isRemote === false) {
      return;
    }
    const state = _.assign({},this.state);
    var currentRow;
    if(isRemote === false) {
      currentRow = this.lastSelectedCell.row;
    } else {
      currentRow = insertPos;
    }
    let part1 = {};
    let newRow = {};
    let part2 = {};

    for(let i = 1;i < currentRow; i++) {
      for(let j = 1;j< this.colLen+1;j++) {
        let key = String.fromCharCode(64+parseInt(j)).concat(i.toString());
        part1[key] = Object.assign({},state[key]);
      }
    }

    for(let j =1; j< this.colLen+1;j++) {
      let key = String.fromCharCode(64+parseInt(j)).concat(currentRow.toString());
      newRow[key] = {'key': key, 'value': '', 'expr': '','editing': false};
    }

    for(let j = 1; j < this.colLen+1; j++) {
      for(let i = currentRow+1; i < this.rowLen +2; i++) {
        let key = String.fromCharCode(64+parseInt(j)).concat(i.toString());
        let key2 = String.fromCharCode(64+parseInt(j)).concat((i-1).toString());
        part2[key] = Object.assign({},state[key2]);
        part2[key]["key"] = key;
      }
    }

    let newState = Object.assign({},part1,newRow,part2);
    this.rowLen = this.rowLen+1;
    this.setState(newState);

    if(isRemote === false) {
      let command = {
        "evt": "insertAtRow",
        "row": currentRow,
      };
      this.MessageHandler.send(command);
      this.lastSelectedCell = {};
    }

    this.undoStack.push({state:newState,rowLen:this.rowLen,colLen:this.colLen});
    this.redoStack = [];
  }
  //增加一列
  addCol = (insertPos, isRemote)=> {
    if(_.isEmpty(this.lastSelectedCell) === true && isRemote === false) {
      return;
    }
    const state = _.assign({},this.state);
    var currentCol;
    if(isRemote === false) {
      currentCol = this.lastSelectedCell.col;
    } else {
      currentCol = insertPos;
    }

    let part1 = {};
    let newCol = {};
    let part2 = {};
    for(let i = 1;i < this.rowLen+1;i++) {
      for(let j = 1;j< currentCol;j++) {
        let key = String.fromCharCode(64+parseInt(j)).concat(i.toString());
        part1[key] = Object.assign({},state[key]);
      }
    }
    for(let i = 1;i < this.rowLen+1;i++) {
      let key = String.fromCharCode(64+parseInt(currentCol)).concat(i.toString());
      newCol[key] = {'key': key, 'value': '', 'expr': '','editing': false};
    }
    for(let i = 1;i < this.rowLen+1;i++) {
      for(let j = currentCol+1;j < this.colLen+2;j++) {
        let key = String.fromCharCode(64+parseInt(j)).concat(i.toString());
        let key2 = String.fromCharCode(64+parseInt(j-1)).concat(i.toString());
        part2[key] = Object.assign({},state[key2]);
        part2[key]["key"] = key;
      }
    }
    let newState = Object.assign({},part1,newCol,part2);
    this.colLen = this.colLen +1;
    this.setState(newState);

    if(isRemote === false) {
      let command = {
        "evt": "insertAtCol",
        "col": currentCol,
      };
      this.MessageHandler.send(command);
      this.lastSelectedCell = {};
    }

    this.undoStack.push({state:newState,rowLen:this.rowLen,colLen:this.colLen});
    this.redoStack = [];
  }
  //删除一列
  deleteCol = (deletePos, isRemote)=> {
    if(_.isEmpty(this.lastSelectedCell) === true && isRemote === false) {
      return;
    }
    const state = _.assign({},this.state);
    var currentCol;
    if(isRemote === false) {
      currentCol = this.lastSelectedCell.col;
    } else {
      currentCol = deletePos;
    }

    let part1 = {};
    let part2 = {};

    for(let i = 1;i < this.rowLen+1; i++) {
      for(let j = 1;j < currentCol;j++) {
        let key = String.fromCharCode(64+parseInt(j)).concat(i.toString());
        part1[key] = Object.assign({},state[key]);
      }
    }
    for(let i = 1;i < this.rowLen+1;i++) {
      for(let j = currentCol;j < this.colLen;j++) {
        let key = String.fromCharCode(64+parseInt(j)).concat(i.toString());
        let key2 = String.fromCharCode(64+parseInt(j+1)).concat((i).toString());
        part2[key] = Object.assign({},state[key2]);
        part2[key]["key"] = key;
      }
    }
    let newState = Object.assign({},part1,part2);
    this.colLen = this.colLen-1;
    this.setState(newState);

    if(isRemote === false) {
      let command = {
        "evt": "deleteCol",
        "col": currentCol,
      };
      this.MessageHandler.send(command);
      this.lastSelectedCell = {};
    }

    this.undoStack.push({state:newState,rowLen:this.rowLen,colLen:this.colLen});
    this.redoStack = [];
  } 
  //插入单元格之后往下移动下面的单元格
  addCellDown = (rowPos,colPos,isRemote)=> {
    if(_.isEmpty(this.lastSelectedCell) === true && isRemote === false) {
      return;
    }
    var currentRow;
    var currentCol;
    if(isRemote === true) {
      currentRow = rowPos;
      currentCol = colPos;
    } else {
      currentRow = this.lastSelectedCell.row;
      currentCol = this.lastSelectedCell.col;
    }
    if(currentRow === 0 || currentCol === 0) {
      console.log("不能在第一行或第一列插入单元格");
      return;
    }
    //在最下添加一行
    const state = _.assign({}, this.state);
    let part1 = state;
    let newRow = {};
    for(let j = 1; j < this.colLen + 1; j++) {
      let key = String.fromCharCode(64+parseInt(j)).concat((this.rowLen + 1).toString());
      newRow[key] = {'key': key, 'value': '', 'expr': '','editing': false};
    }
    let newState = Object.assign({},part1,newRow);
    this.rowLen = this.rowLen + 1;
    //console.log(newRow);
    //console.log(newState);

    //找到该列，进行数组下移
    let j = currentCol;
    for(let i = currentRow + 1;i < this.rowLen + 1; i++) {
      let key1 = String.fromCharCode(64+parseInt(j)).concat(i.toString());
      let key2 = String.fromCharCode(64+parseInt(j)).concat((i - 1).toString());
      newState[key1] = this.state[key2];
      newState[key1]['key'] = key1;
    }
    //设置原单元格属性为空
    let key = String.fromCharCode(64+parseInt(currentCol)).concat(currentRow.toString());
    newState[key]= {'key': key, 'value': '', 'expr': '','editing': false};
    this.setState(newState);

    if(isRemote === false) {
      let command = {
        "evt": "insertCellAtUp",
        "row": currentRow,
        "col": currentCol,
      };
      this.MessageHandler.send(command);
      this.lastSelectedCell = {};
    }

    this.undoStack.push({state:newState,rowLen:this.rowLen,colLen:this.colLen});
    this.redoStack = [];

  }
  //插入单元格之后右移
  addCellRight = (rowPos,colPos,isRemote)=> {
    if(_.isEmpty(this.lastSelectedCell) === true && isRemote === false) {
      return;
    }
    var currentRow;
    var currentCol;
    if(isRemote === true) {
      currentRow = rowPos;
      currentCol = colPos;
    } else {
      currentRow = this.lastSelectedCell.row;
      currentCol = this.lastSelectedCell.col;
    }
    if(currentRow === 0 || currentCol === 0) {
      console.log("不能在标题行或标题列插入单元格");
      return;
    }
    //在最右添加一列
    const state = _.assign({}, this.state);
    let part1 = state;
    let newCol = {};
    for(let i = 1; i < this.rowLen + 1; i++) {
      let key = String.fromCharCode(64+parseInt(this.colLen + 1)).concat(i.toString());
      newCol[key] = {'key': key, 'value': '', 'expr': '','editing': false};
    }
    let newState = Object.assign({},part1,newCol);
    this.colLen = this.colLen + 1;
    //console.log(newCol);
    //console.log(newState);

    //找到该行，进行数组右移
    let i = currentRow;
    for(let j = currentCol + 1;j < this.colLen + 1; j++) {
      let key1 = String.fromCharCode(64+parseInt(j)).concat(i.toString());
      let key2 = String.fromCharCode(64+parseInt(j-1)).concat(i.toString());
      newState[key1] = state[key2];
      //console.log(newState[key1]);
      newState[key1]['key'] = key1;
    }
    //设置原单元格属性为空
    let key = String.fromCharCode(64+parseInt(currentCol)).concat(currentRow.toString());
    newState[key]= {'key': key, 'value': '', 'expr': '','editing': false};
    this.setState(newState);

    if(isRemote === false) {
      let command = {
        "evt": "insertCellAtLeft",
        "row": currentRow,
        "col": currentCol,
      };
      this.MessageHandler.send(command);
      this.lastSelectedCell = {};
    }

    this.undoStack.push({state:newState,rowLen:this.rowLen,colLen:this.colLen});
    this.redoStack = [];
  }
  //删除单元格之后上移
  deleteCellUp = (rowPos,colPos,isRemote)=> {
    //此单元格位置以下的单元格值上移，最下方单元格设置为空
    if(_.isEmpty(this.lastSelectedCell) === true && isRemote === false) {
      return;
    }
    var currentRow;
    var currentCol;
    if(isRemote === false) {
      currentRow = this.lastSelectedCell.row;
      currentCol = this.lastSelectedCell.col;
    }
    else {
      currentRow = rowPos;
      currentCol = colPos;
    }
    if(currentRow === 0 || currentCol === 0) {
      console.log("不能删除标题行或标题列单元格");
      return;
    }
    const state = _.assign({},this.state);
    let j = currentCol;
    for(let i = currentRow; i < this.rowLen; i++) {
      let key1 = String.fromCharCode(64+parseInt(j)).concat(i.toString());
      let key2 = String.fromCharCode(64+parseInt(j)).concat((i + 1).toString());
      state[key1] = state[key2];
      state[key1]["key"] = key1;
    }
    let rowlen = this.rowLen;
    let key = String.fromCharCode(64+parseInt(j)).concat(rowlen.toString());
    state[key] = {'key': key, 'value': '', 'expr': '','editing': false};
    //console.log(state);
    this.setState(state);

    if(isRemote === false) {
      let command = {
        'evt': 'deleteCellAndUp',
        'row': currentRow,
        'col': currentCol,
      }
      this.MessageHandler.send(command);
      this.lastSelectedCell = {};
    }

    this.undoStack.push({state:state,rowLen:this.rowLen,colLen:this.colLen});
    this.redoStack = [];

  }
  //删除单元格之后左移
  deleteCellLeft = (rowPos,colPos,isRemote)=> {
    //此单元格位置以右的单元格值左移，最右方单元格设置为空
    if(_.isEmpty(this.lastSelectedCell) === true && isRemote === false) {
      return;
    }
    var currentRow;
    var currentCol;
    if(isRemote === false) {
      currentRow = this.lastSelectedCell.row;
      currentCol = this.lastSelectedCell.col;
    }
    else {
      currentRow = rowPos;
      currentCol = colPos;
    }
    if(currentRow === 0 || currentCol === 0) {
      console.log("不能删除标题行或标题列单元格");
      return;
    }
    const state = _.assign({},this.state);
    let i = currentRow;
    for(let j = currentCol; j < this.colLen; j++) {
      let key1 = String.fromCharCode(64+parseInt(j)).concat(i.toString());
      let key2 = String.fromCharCode(64+parseInt(j + 1)).concat(i.toString());
      state[key1] = state[key2];
      state[key1]["key"] = key1;
    }
    let collen = this.colLen;
    let key = String.fromCharCode(64+parseInt(collen)).concat(i.toString());
    state[key] = {'key': key, 'value': '', 'expr': '','editing': false};
    //console.log(state);
    this.setState(state);

    if(isRemote === false) {
      let command = {
        'evt': 'deleteCellAndLeft',
        'row': currentRow,
        'col': currentCol,
      }
      this.MessageHandler.send(command);
      this.lastSelectedCell = {};
    }

    this.undoStack.push({state:state,rowLen:this.rowLen,colLen:this.colLen});
    this.redoStack = [];

  }
  //将某一列排序
  sortA = (colPos, isRemote) => {
    if(_.isEmpty(this.lastSelectedCell) === true && isRemote === false) {
      return;
    }
    var currentCol;
    if(isRemote === false) {
      currentCol = this.lastSelectedCell.col;
    }
    else {
      currentCol = colPos;
    }
    const state = _.assign({}, this.state);
    for(let i = 1; i < this.rowLen + 1; i++) {
      let key = String.fromCharCode(64+parseInt(currentCol)).concat(i.toString());
      if(state[key]["value"] === "") {
        continue;
      }
      let k = i;
      for(let j = k + 1; j < this.rowLen + 1; j++) {
        let key1 = String.fromCharCode(64+parseInt(currentCol)).concat(k.toString());
        let key2 = String.fromCharCode(64+parseInt(currentCol)).concat(j.toString());
        // console.log(key1);
        // console.log(key2);
        // console.log(state[key1]);
        // console.log(state[key2]);
        //console.log(state[key2]["value"]);
        if(state[key2]["value"] === "") {
          continue;
        }
        else if(parseInt(state[key1]["value"]) > parseInt(state[key2]["value"])) {
          k = j;
        }
      }
      if(k !== i) {
        let key3 = String.fromCharCode(64+parseInt(currentCol)).concat(k.toString());
        let key4 = String.fromCharCode(64+parseInt(currentCol)).concat(i.toString());
        let temp = state[key3];
          state[key3]=state[key4];
          state[key3]["key"] = key3;
          state[key4] = temp;
          state[key4]["key"] = key4;
      }
    }
    this.setState(state);

    if(isRemote === false) {
      let command = {
        'evt': 'sortColAZ',
        'col': currentCol,
      }
      this.MessageHandler.send(command);
      this.lastSelectedCell = {};
    }

    this.undoStack.push({state:state,rowLen:this.rowLen,colLen:this.colLen});
    this.redoStack = [];

  }
  sortZ = (colPos, isRemote)=> {
    if(_.isEmpty(this.lastSelectedCell) === true && isRemote === false) {
      return;
    }
    var currentCol;
    if(isRemote === false) {
      currentCol = this.lastSelectedCell.col;
    }
    else {
      currentCol = colPos;
    }
    const state = _.assign({}, this.state);
    for(let i = 1; i < this.rowLen + 1; i++) {
      let key = String.fromCharCode(64+parseInt(currentCol)).concat(i.toString());
      if(state[key]["value"] === "") {
        continue;
      }
      let k = i;
      for(let j = k + 1; j < this.rowLen + 1; j++) {
        let key1 = String.fromCharCode(64+parseInt(currentCol)).concat(k.toString());
        let key2 = String.fromCharCode(64+parseInt(currentCol)).concat(j.toString());
        // console.log(key1);
        // console.log(key2);
        // console.log(state[key1]);
        // console.log(state[key2]);
        //console.log(state[key2]["value"]);
        if(state[key2]["value"] === "") {
          continue;
        }
        else if(parseInt(state[key1]["value"]) < parseInt(state[key2]["value"])) {
          k = j;
        }
      }
      if(k !== i) {
        let key3 = String.fromCharCode(64+parseInt(currentCol)).concat(k.toString());
        let key4 = String.fromCharCode(64+parseInt(currentCol)).concat(i.toString());
        let temp = state[key3];
          state[key3]=state[key4];
          state[key3]["key"] = key3;
          state[key4] = temp;
          state[key4]["key"] = key4;
      }
    }
    this.setState(state);

    if(isRemote === false) {
      let command = {
        'evt': 'sortColZA',
        'col': currentCol,
      }
      this.MessageHandler.send(command);
      this.lastSelectedCell = {};
    }

    this.undoStack.push({state:state,rowLen:this.rowLen,colLen:this.colLen});
    this.redoStack = [];
  }

  //按照某一列从小到大排序
  sortByThisColA = (colPos, isRemote)=> {
    if(_.isEmpty(this.lastSelectedCell) === true && isRemote === false) {
      return;
    }
    var currentCol;
    if(isRemote === false) {
      currentCol = this.lastSelectedCell.col;
    }
    else {
      currentCol = colPos;
    }
    const state = _.assign({}, this.state);
    //console.log(state);
    for(let i = 1; i < this.rowLen + 1; i++) {
      let k = i;
      let key = String.fromCharCode(64+parseInt(currentCol)).concat(i.toString());
      if(state[key]["value"] === "") {
        continue;
      }
      for(let j = k + 1; j < this.rowLen + 1; j++) {
        let key1 = String.fromCharCode(64+parseInt(currentCol)).concat(k.toString());
        let key2 = String.fromCharCode(64+parseInt(currentCol)).concat(j.toString());
        if(state[key2]["value"] === "") {
          continue;
        }
        else if(parseInt(state[key1]["value"]) > parseInt(state[key2]["value"])) {
          k = j;
        }
      }
      if(k !== i) {
        //将这两行所有的单元格都要交换位置
        for(let x = 1; x < this.colLen + 1; x++) {
          let key3 = String.fromCharCode(64+parseInt(x)).concat(k.toString());
          let key4 = String.fromCharCode(64+parseInt(x)).concat(i.toString());
          let temp = state[key3];
            state[key3]=state[key4];
            state[key3]["key"] = key3;
            state[key4] = temp;
            state[key4]["key"] = key4;
        } 
      }
    }
    this.setState(state);

    if(isRemote === false) {
      let command = {
        'evt': 'sortTheSheetAZByCol',
        'col': currentCol,
      }
      this.MessageHandler.send(command);
      this.lastSelectedCell = {};
    }

    this.undoStack.push({state:state,rowLen:this.rowLen,colLen:this.colLen});
    this.redoStack = [];

  }
  //按照某一列将表格从大到小排序
  sortByThisColZ = (colPos, isRemote)=> {
    if(_.isEmpty(this.lastSelectedCell) === true && isRemote === false) {
      return;
    }
    var currentCol;
    if(isRemote === false) {
      currentCol = this.lastSelectedCell.col;
    }
    else {
      currentCol = colPos;
    }
    const state = _.assign({}, this.state);
    //console.log(state);
    for(let i = 1; i < this.rowLen + 1; i++) {
      let k = i;
      let key = String.fromCharCode(64+parseInt(currentCol)).concat(i.toString());
      if(state[key]["value"] === "") {
        continue;
      }
      for(let j = k + 1; j < this.rowLen + 1; j++) {
        let key1 = String.fromCharCode(64+parseInt(currentCol)).concat(k.toString());
        let key2 = String.fromCharCode(64+parseInt(currentCol)).concat(j.toString());
        if(state[key2]["value"] === "") {
          continue;
        }
        else if(parseInt(state[key1]["value"]) < parseInt(state[key2]["value"])) {
          k = j;
        }
      }
      if(k !== i) {
        //将这两行所有的单元格都要交换位置
        for(let x = 1; x < this.colLen + 1; x++) {
          let key3 = String.fromCharCode(64+parseInt(x)).concat(k.toString());
          let key4 = String.fromCharCode(64+parseInt(x)).concat(i.toString());
          let temp = state[key3];
            state[key3]=state[key4];
            state[key3]["key"] = key3;
            state[key4] = temp;
            state[key4]["key"] = key4;
        } 
      }
    }
    this.setState(state);

    if(isRemote === false) {
      let command = {
        'evt': 'sortTheSheetZAByCol',
        'col': currentCol,
      }
      this.MessageHandler.send(command);
      this.lastSelectedCell = {};
    }

    this.undoStack.push({state:state,rowLen:this.rowLen,colLen:this.colLen});
    this.redoStack = [];
  }
  //清空一个单元格
  clearCell = (row,col,cell,isRemote)=> {
    if(_.isEmpty(this.lastSelectedCell) === true && isRemote === false) {
      return;
    }
    var currentRow;
    var currentCol;
    if(isRemote === false) {
      currentRow = this.lastSelectedCell.row;
      currentCol = this.lastSelectedCell.col;
    }
    else {
      currentRow = row;
      currentCol = col;
    }
    const state = _.assign({},this.state);
    let key = String.fromCharCode(64+parseInt(currentCol)).concat(currentRow.toString());
    state[key] = {'key': key, 'value': '', 'expr': '','editing': false};

    this.undoStack.push({state:state,rowLen:this.rowLen,colLen:this.colLen});
    console.log(this.undoStack);
    this.redoStack = [];

    this.setState(state);

    if(isRemote === false) {
      let command = {
        "evt": "clearCellAt",
        "row": currentRow,
        "col": currentCol,
      }
      this.MessageHandler.send(command);
      this.lastSelectedCell = {};
    }

  }
  //清空表格
  clearSheet = (isRemote)=> {
    const state = _.assign({},this.state);
    for(let i = 0;i < this.rowLen + 1;i++) {
      for(let j = 0;j < this.colLen + 1;j++) {
        let key = String.fromCharCode(64+parseInt(j)).concat(i.toString());
        state[key] = {'key': key, 'value': '', 'expr': '','editing': false};
      }
    }
    this.setState(state);

    if(isRemote === false) {
      let command = {
        "evt": "clearTheSheet",
      };
      this.MessageHandler.send(command);
      this.lastSelectedCell = {};
    }

    this.undoStack.push({state:state,rowLen:this.rowLen,colLen:this.colLen});
    this.redoStack = [];

  }
  //交换选中的两行（没有实现选中视觉效果）
  exchangeRows = (row1, row2, isRemote)=> {
    //console.log(this.lastSelectedCell);
    //console.log(this.previousSelectedCell);
    if(isRemote === false) {
      if(_.isEmpty(this.lastSelectedCell) === true || _.isEmpty(this.previousSelectedCell) === true) {
        return;
      }
    }
    if(this.lastSelectedCell.row === 0 || this.previousSelectedCell.row === 0) {
      console.log("不能与标题行进行交换");
      return;
    }
    //console.log(this.lastSelectedCell);
    //console.log(this.previousSelectedCell);
    var currentRow1;
    var currentRow2;
    if(isRemote === false) {
      currentRow1 = this.lastSelectedCell.row;
      currentRow2 = this.previousSelectedCell.row;
    } else {
      currentRow1 = row1;
      currentRow2 = row2;
    }
    const state = _.assign({}, this.state);
    for(let j = 1; j < this.colLen + 1; j++) {
      let key1 = String.fromCharCode(64+parseInt(j)).concat(currentRow1.toString());
      let key2 = String.fromCharCode(64+parseInt(j)).concat(currentRow2.toString());
      let temp = state[key1];
            state[key1]=state[key2];
            state[key1]["key"] = key1;
            state[key2] = temp;
            state[key2]["key"] = key2;
    }
    this.setState(state);

    if(isRemote === false) {
      let command = {
        'evt': 'exchangeTwoRows',
        'row1': currentRow1,
        'row2': currentRow2,
      }
      this.MessageHandler.send(command);
      this.lastSelectedCell = {};
      this.previousSelectedCell = {};
    }

    this.undoStack.push({state:state,rowLen:this.rowLen,colLen:this.colLen});
    this.redoStack = [];

  }
  //交换选中的两列（没有实现选中视觉效果）
  exchangeCols = (col1, col2, isRemote)=> {
    //console.log(this.lastSelectedCell);
    //console.log(this.previousSelectedCell);
    if(isRemote === false) {
      if(_.isEmpty(this.lastSelectedCell) === true || _.isEmpty(this.previousSelectedCell) === true) {
        return;
      }
    }
    if(this.lastSelectedCell.col === 0 || this.previousSelectedCell.col === 0) {
      console.log("不能与标题列进行交换");
      return;
    }
    //console.log(this.lastSelectedCell);
    //console.log(this.previousSelectedCell);
    var currentCol1;
    var currentCol2;
    if(isRemote === false) {
      currentCol1 = this.lastSelectedCell.col;
      currentCol2 = this.previousSelectedCell.col;
    } else {
      currentCol1 = col1;
      currentCol2 = col2;
    }
    const state = _.assign({}, this.state);
    for(let i = 1; i < this.rowLen + 1; i++) {
      let key1 = String.fromCharCode(64+parseInt(currentCol1)).concat(i.toString());
      let key2 = String.fromCharCode(64+parseInt(currentCol2)).concat(i.toString());
      let temp = state[key1];
            state[key1]=state[key2];
            state[key1]["key"] = key1;
            state[key2] = temp;
            state[key2]["key"] = key2;
    }
    this.setState(state);

    if(isRemote === false) {
      let command = {
        'evt': 'exchangeTwoCols',
        'col1': currentCol1,
        'col2': currentCol2,
      }
      this.MessageHandler.send(command);
      this.lastSelectedCell = {};
      this.previousSelectedCell = {};
    }

    this.undoStack.push({state:state,rowLen:this.rowLen,colLen:this.colLen});
    this.redoStack = [];
  }
  // sqr = (row, col, isRemote)=> {
  //   let currentRow = this.lastSelectedCell.row;
  //   let currentCol = this.lastSelectedCell.col;
  //   let key = String.fromCharCode(64+parseInt(currentCol)).concat(currentRow.toString());
  //   const state = _.assign({}, this.state);
  //   let value = state[key]['value'];
  //   state[key]['value'] = Math.sqrt(value);
  //   this.setState(state);
  // }

  render() {
    let br = <br/>;
    return (
      <div>
      <Button onClick={()=> this.undo(false)}> undo </Button>
      <Button onClick={()=> this.redo(false)}> redo </Button>
      <Button onClick={()=> this.deleteRow(-1,false)}> 删除此行 </Button>
      <Button onClick={()=> this.addRow(-1,false)}> 添加一行 </Button>
      <Button onClick={()=> this.addCol(-1,false)}> 添加一列 </Button>
      <Button onClick={()=> this.deleteCol(-1,false)}> 删除此列 </Button>
      {br}
      <Button onClick={()=> this.deleteCellLeft(-1,-1,false)}> 删除单元格左移 </Button>
      <Button onClick={()=> this.addCellDown(-1,-1,false)}> 添加单元格下移 </Button>
      <Button onClick={()=> this.addCellRight(-1,-1,false)}> 添加单元格右移 </Button>
      <Button onClick={()=> this.deleteCellUp(-1,-1,false)}> 删除单元格上移 </Button>
      {br}
      <Button onClick={()=> this.sortA(-1,false)}> 从小到大排序此列 </Button>
      <Button onClick={()=> this.sortZ(-1,false)}> 从大到小排序此列 </Button>
      <Button onClick={()=> this.sortByThisColA(-1,false)}> 按此列从小到大排序表格 </Button>
      <Button onClick={()=> this.sortByThisColZ(-1,false)}> 按此列从大到小排序表格 </Button>
      {br}
      <Button onClick={()=> this.exchangeRows(-1,-1,false)}> 交换两行 </Button>
      <Button onClick={()=> this.exchangeCols(-1,-1,false)}> 交换两列 </Button>
      <Button onClick={()=> this.clearCell(-1,-1,-1,false)}> 清除单元格内容 </Button>
      <Button onClick={()=> this.clearSheet(false)}> 清除表格内容 </Button>
      {/* <select> 
        <option onClick={()=> this.sqr(-1,-1,false)}> 计算平方根 </option>
      </select> */}
      <Datasheet
        data={this.generateGrid()}
        valueRenderer={(cell) => cell.value}
        dataRenderer={(cell) => cell.expr}
        onCellsChanged={this.onCellsChanged}
        onCellClick={this.onCellClick}
        onDoubleClick={this.onDoubleClick}
        ref="datasheet"
      > </Datasheet>
      </div>
    )
  }
    
}

export default Sheet;