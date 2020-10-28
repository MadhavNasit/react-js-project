import React, { Component } from 'react';
import axios from 'axios';
import { Input, Card, CardBody } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { trackPromise } from 'react-promise-tracker';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class gridexample extends Component{
    constructor(props) {  
        super(props);  
        this.state = {
            columnDefs: [
              colDefName,
              colDefDuration,
              colDefCost,
              colDefDate
        ],
        rowData: [],
        defaultColDef: {
          sortable: true,
          resizable: true,
          filter: true,
          flex: 1,
          minWidth: 100,
        },
        rowSelection: 'multiple',
        paginationPageSize: 5,
        domLayout:'autoHeight',
        paginationNumberFormatter: function(params) {
          return '[' + params.value.toLocaleString() + ']';
        }
        }
      }

    

    componentDidMount(){
        this.getProjects();
    }

    getProjects() {
      trackPromise(
        axios.get('https://localhost:44306/api/Project')
        .then(res => {
          if(res.data.status !== "failed")
            {
              this.setState({rowData: res.data});
              console.log(this.state.rowData);
            }
            else
            {
              toast.error(res.data.message);
            }
        }).catch((err) => {
          toast.error('Somethig went Wrong!!');
      }));
    }


    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    
        const httpRequest = new XMLHttpRequest();
        const updateData = data => {
          this.setState({ rowData: data });
        };
    
        httpRequest.open(
          'GET',
          'https://localhost:44306/api/Project'
        );
        httpRequest.send();
        httpRequest.onreadystatechange = () => {
          if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            updateData(JSON.parse(httpRequest.responseText));
          }
        };

        document.querySelector('#projectName').checked = true;
        document.querySelector('#duration').checked = true;
        document.querySelector('#cost').checked = true;
        document.querySelector('#date').checked = true;
      };

    onPageSizeChanged = newPageSize => {
        var value = document.getElementById('page-size').value;
        this.gridApi.paginationSetPageSize(Number(value));
    };

    onBtApply = () => {
      var cols = [];
      if (getBooleanValue('#projectName')) {
        cols.push(colDefName);
      }
      if (getBooleanValue('#duration')) {
        cols.push(colDefDuration);
      }
      if (getBooleanValue('#cost')) {
        cols.push(colDefCost);
      }
      if (getBooleanValue('#date')) {
        cols.push(colDefDate);
      }
      this.gridApi.setColumnDefs(cols);
    };

    onBtnExport = () => {
      var params = getParams();
      if (params.suppressQuotes || params.columnSeparator) {
        alert(
          'NOTE: you are downloading a file with non-standard quotes or separators - it may not render correctly in Excel.'
        );
      }
      this.gridApi.exportDataAsCsv(params);
    };
    
    render() {  
        return (  
            <div>
              <h3 align="center" className="mb-4">Grid Contro Example</h3>
              <Card>
                <CardBody className="d-flex flex-row">
                  <div className="flex-fill d-flex flex-column">
                    <div>
                      <label>suppressQuotes &nbsp; =&nbsp;</label>
                      <select id="suppressQuotes">
                        <option value="none">(default)</option>
                        <option value="true">true</option>
                      </select>
                    </div>
                    <div>
                      <label>columnSeparator =&nbsp;</label>
                      <select id="columnSeparator">
                        <option value="none">(default)</option>
                        <option value="tab">tab</option>
                        <option value="|">bar (|)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex-fill d-flex flex-column">
                    <div>
                      <label>customHeader =&nbsp; </label>
                      <select id="customHeader">
                        <option>none</option>
                        <option value="array">ExcelCell[][] (recommended format)</option>
                        <option value="string">string (legacy format)</option>
                      </select>
                    </div>
                    <div>
                      <label>customFooter &nbsp;=&nbsp; </label>
                      <select id="customFooter">
                        <option>none</option>
                        <option value="array">ExcelCell[][] (recommended format)</option>
                        <option value="string">string (legacy format)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex-fill d-flex flex-column">
                    <label><input type="checkbox" id="onlySelected" /> onlySelected = true</label>
                    <button onClick={() => this.onBtnExport()} className="btn btn-primary btn-sm" style={{padding:"1px"}}>
                      Download file (Export Data As Csv)
                    </button>
                  </div>
                </CardBody>
              </Card>
              <div className="d-flex flex-row align-items-streach">
              <div className="flex-fill">
                  <Card style={{height:"100%"}}>
                    <CardBody>
                    Select columns to show then hit 'Apply'<br />
                        <label className="mx-2"><input type="checkbox" id="projectName" className="mx-1"/>Project Name</label>
                        <label className="mx-2"><input type="checkbox" id="duration" className="mx-1"/>Duration</label>
                        <label className="mx-2"><input type="checkbox" id="cost" className="mx-1"/>Cost</label>
                        <label className="mx-2"><input type="checkbox" id="date" className="mx-1"/>Date</label>
                        <button onClick={() => this.onBtApply()} className="btn btn-primary btn-sm mx-2" style={{padding:"1px 10px"}}>Apply</button>
                    </CardBody>
                  </Card>
                </div>
                <div className="flex-fill">
                  <Card style={{height:"100%"}}>
                    <CardBody>
                      <span>Default Record per page is 5.</span>
                      <br/>
                      <span>Page Size:</span>
                      <span><Input type="text" id="page-size" className="ml-2 form-control-sm" style={{display:"inline-block", width:"30%",fontSize:"10px"}}/></span>
                      <span><button type="button" onClick={() => this.onPageSizeChanged()} className="btn btn-primary btn-sm mx-2" style={{padding:"1px 10px"}}>Apply</button></span>
                    </CardBody>
                  </Card>
                </div>
              </div> 
               
            

            <div className="ag-theme-alpine" style={{height: '400px',width: '100%' }}>
                <AgGridReact
                columnDefs={this.state.columnDefs}
                defaultColDef={this.state.defaultColDef}
                rowSelection={this.state.rowSelection}
                pagination={true}
                paginationPageSize={this.state.paginationPageSize}
                paginationNumberFormatter={this.state.paginationNumberFormatter}
                onGridReady={this.onGridReady}
                domLayout={this.state.domLayout}
                rowData={this.state.rowData}
                />
          </div>  
            </div> 
        );  
    }
}

var colDefName = {headerName: 'Project Name', field: 'projectName',hide: false, headerCheckboxSelection: true,
  headerCheckboxSelectionFilteredOnly: true,
  checkboxSelection: true};

var colDefDuration = {headerName: 'Duration', field: 'duration',hide: false, filter: 'agNumberColumnFilter'};
var colDefCost = {headerName: 'Cost', field: 'cost',hide: false,filter: 'agNumberColumnFilter'};
var colDefDate = {headerName: 'Date(mm/dd/yyyy)', field: 'projectDate',hide: false, filter: 'agDateColumnFilter',
cellRenderer: (data) => {
  return data.value ? (new Date(data.value)).toLocaleDateString() : ''
}
};

function getBooleanValue(checkboxSelector) {
  return document.querySelector(checkboxSelector).checked;
}
function getValue(inputSelector) {
  var text = document.querySelector(inputSelector).value;
  switch (text) {
    case 'string':
      return (
        'Here is a comma, and a some "quotes". You can see them using the\n' +
        'api.getDataAsCsv() button but they will not be visible when the downloaded\n' +
        'CSV file is opened in Excel because string content passed to\n' +
        'customHeader and customFooter is not escaped.'
      );
    case 'array':
      return [
        [],
        [
          {
            data: {
              value: 'Here is a comma, and a some "quotes".',
              type: 'String',
            },
          },
        ],
        [
          {
            data: {
              value:
                'They are visible when the downloaded CSV file is opened in Excel because custom content is properly escaped (provided that suppressQuotes is not set to true)',
              type: 'String',
            },
          },
        ],
        [
          {
            data: {
              value: 'this cell:',
              type: 'String',
            },
            mergeAcross: 1,
          },
          {
            data: {
              value: 'is empty because the first cell has mergeAcross=1',
              type: 'String',
            },
          },
        ],
        [],
      ];
    case 'tab':
      return '\t';
    case 'true':
      return true;
    case 'none':
      return;
    default:
      return text;
  }
}
function getParams() {
  return {
    suppressQuotes: getValue('#suppressQuotes'),
    columnSeparator: getValue('#columnSeparator'),
    customHeader: getValue('#customHeader'),
    customFooter: getValue('#customFooter'),
    onlySelected: getBooleanValue('#onlySelected')
  };
}

export default gridexample;