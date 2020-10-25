import React, { Component } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import PropTypes from "prop-types";

class CasDataTable extends Component {

  constructor() {
    super();
    this.renderColumns = this.renderColumns.bind(this);
  }
    
  static propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    selection: PropTypes.object,
    onSelectionChange: PropTypes.func,
    rows: PropTypes.number,
    globalFilter: PropTypes.string,
  };

  static defaultProps = {
    data: [],
    columns: [],
    selection: {},
    rows: 10,
    globalFilter: "",
    onSelectionChange: () => {},
  };

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
    } = this.props;

    let headerClassName

    return (
      <DataTable
        value={data}
        selectionMode="single"
        selection={selection}
        onSelectionChange={onSelectionChange}
        rows={rows}
        paginator
        paginatorPosition="bottom"
        responsive
        globalFilter={globalFilter}
      >
      {this.renderColumns(columns)}
      </DataTable>
    );
  }
}

export default CasDataTable;
