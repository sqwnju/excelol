import react, { Component } from 'react';
import SpreadsheetComponent from './spreadsheet';
import './config/excel.css';
import './config/index.css';


class sheet extends Component {


    render() {
        let config =  {
          rows: 16,
          columns:10,
          hasHeadColumn:true,
          isHeadColumnString:true,
          hasHeadRow:true,
          canAddRow:true,
          canAddColumn:true,
          emptyValueSymbol:'',
          hasLetterNumberHeads:true
        };
        return (
          <div className="sheet">
            <SpreadsheetComponent 
                spreadsheetId='1' 
                config={config}
            />
          </div>
        );
      }

}

export default sheet;