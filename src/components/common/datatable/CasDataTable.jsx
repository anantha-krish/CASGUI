import React, { Component } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import PropTypes from "prop-types";

class CasDataTable extends Component {

  constructor() {
    super();
    this.renderColumns = this.renderColumns.bind(this);
    this.renderSelectionColumn = this.renderSelectionColumn.bind(this);
    this.setReference = this.setReference.bind(this);
  }
    
  static propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    selection: PropTypes.object,
    onSelectionChange: PropTypes.func,
    rows: PropTypes.number,
    globalFilter: PropTypes.string,
    dataKey: PropTypes.string,
    selectionMode:PropTypes.string,
    showSelection:PropTypes.bool,
    rowHover:PropTypes.bool,
    editMode:PropTypes.string,
    className:PropTypes.string,
    rowClassName:PropTypes.string,
    referenceFun:PropTypes.func,
    exportFilename :PropTypes.string,
    exportFunction:PropTypes.string
  };

  static defaultProps = {
    data: [],
    columns: [],
    selection: {},
    rows: 10,
    globalFilter: "",
    onSelectionChange: () => {},
    referenceFun:() => {},
    exportFilename:"Table Data",
    exportFunction:(obj)=>{return String(obj.cellData).replace(/"/g, '""');}
  };

  setReference(el){
    if(this.props.referenceFun){
      this.props.referenceFun(el);
    }
  }

  renderSelectionColumn(){
    if(this.props.showSelection){
      return(<Column className="cas-data-table-header" selectionMode={this.props.selectionMode} headerStyle={{width: '3em'}}></Column>);
    } 
  }

  renderColumns(columns){
    let headerClassName;
    let columList =[];
    columns.map((col, index) => {
      headerClassName = "cas-data-table-header ";
      if(col.headerClassName){
        headerClassName = headerClassName+col.headerClassName;
      }
      columList.push(<Column
        key={`key${index}`}
        field={col.field}
        header={col.header}
        sortable={col.sortable}
        className={col.className}
        headerClassName={headerClassName}
        body={col.body}
        editor={col.editor}
      />);
      });
    return columList;
 }

  render() {
    const {
      data,
      columns,
      selection,
      onSelectionChange,
      rows,
      globalFilter,
      dataKey,
      selectionMode,
      rowHover,
      editMode,
      className,
      rowClassName,
      exportFilename ,
      exportFunction
      
      
    } = this.props;

    return (
      <DataTable
        value={data}
        selectionMode={selectionMode}
        selection={selection}
        onSelectionChange={onSelectionChange}
        rows={rows}
        paginator
        paginatorPosition="bottom"
        responsive
        globalFilter={globalFilter}
        dataKey={dataKey}
        rowHover={rowHover}
        editMode={editMode}
        className={className}
        rowClassName={rowClassName}
        ref={(el) => { this.setReference(el) }}
        exportFilename ={exportFilename }
        exportFunction={exportFunction}
      >
      {this.renderSelectionColumn()}
      {this.renderColumns(columns)}
      </DataTable>
    );
  }
}

export default CasDataTable;
