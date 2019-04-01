import React, {Component} from 'react';
import _ from 'lodash'
import mathjs from 'mathjs'
import ReactDataSheet from 'react-datasheet'
import Datasheet from 'react-datasheet/lib/DataSheet'
import 'react-datasheet/lib/react-datasheet.css';

import './config/index.css'
import './config/datasheet.css'

import webeditor from './webeditor';


// generateState() {
//   return 0;
// }


//TODO1:新建同一id表格时索要当前版本（与汤聪协调）
//TODO2:实现undo/redo
//TODO3:改良表格格式
//TODO4:测试表格数过多时是否仍然支持公式运算
//TODO5:冲突处理，当前就有:如果远程改动的单元格本地当前正在编辑，会被忽略，并且将改动覆盖发送给远程
//TODO:以谁的单元格为准（两个单元格的值，加锁，查看相应的论文理论）（急！）（ethercalc的理念或者？冲突时让用户自己选择？）
//TODO:考虑其他东西

//当前：普通表格，公式运算

class Sheet extends Component {

  constructor(props) {
    super(props)
    this.onCellsChanged = this.onCellsChanged.bind(this);
    this.state = {
      'A1': {key: 'A1', value: '', expr: '',width: "10px"},
      'A2': {key: 'A2', value: '', expr: ''},
      'A3': {key: 'A3', value: '', expr: ''},
      'A4': {key: 'A4', value: '', expr: ''},
      'A5': {key: 'A5', value: '', expr: ''},
      'A6': {key: 'A6', value: '', expr: ''},
      'A7': {key: 'A7', value: '', expr: ''},
      'A8': {key: 'A8', value: '', expr: ''},
      'A9': {key: 'A9', value: '', expr: ''},
      'B1': {key: 'B1', value: '', expr: ''},
      'B2': {key: 'B2', value: '', expr: ''},
      'B3': {key: 'B3', value: '', expr: ''},
      'B4': {key: 'B4', value: '', expr: ''},
      'B5': {key: 'B5', value: '', expr: ''},
      'B6': {key: 'B6', value: '', expr: ''},
      'B7': {key: 'B7', value: '', expr: ''},
      'B8': {key: 'B8', value: '', expr: ''},
      'B9': {key: 'B9', value: '', expr: ''},
      'C1': {key: 'C1', value: '', expr: ''},
      'C2': {key: 'C2', value: '', expr: ''},
      'C3': {key: 'C3', value: '', expr: ''},
      'C4': {key: 'C4', value: '', expr: ''},
      'C5': {key: 'C5', value: '', expr: ''},
      'C6': {key: 'C6', value: '', expr: ''},
      'C7': {key: 'C7', value: '', expr: ''},
      'C8': {key: 'C8', value: '', expr: ''},
      'C9': {key: 'C9', value: '', expr: ''},
      'D1': {key: 'D1', value: '', expr: ''},
      'D2': {key: 'D2', value: '', expr: ''},
      'D3': {key: 'D3', value: '', expr: ''},
      'D4': {key: 'D4', value: '', expr: ''},
      'D5': {key: 'D5', value: '', expr: ''},
      'D6': {key: 'D6', value: '', expr: ''},
      'D7': {key: 'D7', value: '', expr: ''},
      'D8': {key: 'D8', value: '', expr: ''},
      'D9': {key: 'D9', value: '', expr: ''},
      'E1': {key: 'E1', value: '', expr: ''},
      'E2': {key: 'E2', value: '', expr: ''},
      'E3': {key: 'E3', value: '', expr: ''},
      'E4': {key: 'E4', value: '', expr: ''},
      'E5': {key: 'E5', value: '', expr: ''},
      'E6': {key: 'E6', value: '', expr: ''},
      'E7': {key: 'E7', value: '', expr: ''},
      'E8': {key: 'E8', value: '', expr: ''},
      'E9': {key: 'E9', value: '', expr: ''},
      'F1': {key: 'F1', value: '', expr: ''},
      'F2': {key: 'F2', value: '', expr: ''},
      'F3': {key: 'F3', value: '', expr: ''},
      'F4': {key: 'F4', value: '', expr: ''},
      'F5': {key: 'F5', value: '', expr: ''},
      'F6': {key: 'F6', value: '', expr: ''},
      'F7': {key: 'F7', value: '', expr: ''},
      'F8': {key: 'F8', value: '', expr: ''},
      'F9': {key: 'F9', value: '', expr: ''},

    }

    this.handleMessage = this.handleMessage.bind(this);
    var path = this.props.location['pathname'];
    var paths = path.toString().split('/');
    this.userId = paths[2];
    this.fileId = paths[3];
    this.ws = webeditor.createWebsocket(this.userId,this.fileId,this.handleMessage);
  }


  generateGrid() {
    return [0, 1,2,3,4,5,6,7,8,9].map((row, i) => 
      ['', 'A', 'B', 'C', 'D','E','F'].map((col, j) => {
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

  validateExp(trailKeys, expr) {
    let valid = true;
    const matches = expr.match(/[A-Z][1-9]+/g) || [];
    matches.map(match => {
      if(trailKeys.indexOf(match) > -1) {
        valid = false
      } else {
        valid = this.validateExp([...trailKeys, match], this.state[match].expr)
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

      if(value !== null && this.validateExp([key], expr)) {
        return {className: 'equation', value, expr}
      } else {
        return {className: 'error', value: 'error', expr: ''}
      }
    }
  }

  cellUpdate(state, changeCell, expr) {
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


  //TODO:在这里添加发送指令
  onCellsChanged(changes) {
    const state = _.assign({}, this.state)
    changes.forEach(({cell, value}) => {
      this.cellUpdate(state, cell, value)
    })
    this.setState(state);

    var sendData = new Object();
    sendData.fileType = "sheet";
    sendData.fileId = this.fileId;
    sendData.userId = this.userId;
    sendData.eve = "CellsValueChange";
    sendData.cells = changes;
    var sendObj = JSON.stringify(sendData);
    this.ws.send(sendObj);
    console.log('sending...');
  }


  //处理消息
  handleMessage(evt) {
    var message = JSON.parse(evt.data);
    if(message['userId'] === this.userId) {
      return;
    }
    //console.log(message);
    const state = _.assign({}, this.state);
    var changes = JSON.parse(message['cells']);
    changes.forEach(({cell, value}) => {
      this.cellUpdate(state, cell, value)
    })
    this.setState(state);
  }

  render() {

    return (
      <Datasheet
        data={this.generateGrid()}
        valueRenderer={(cell) => cell.value}
        dataRenderer={(cell) => cell.expr}
        onCellsChanged={this.onCellsChanged}
      />
    )
  }
    
}

export default Sheet;