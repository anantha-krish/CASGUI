import React, { Component } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import PropTypes from "prop-types";

class CasDataTable extends Component {
    
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

  render() {
    const {
      data,
      columns,
      selection,
      onSelectionChange,
      rows,
      globalFilter,
    } = this.props;

    return (
      <DataTable
        value={data}
        selectionMode="single"
        selection={selection}
        onSelectionChange={onSelectionChange}
        rows={rows}
        paginator
        paginatorPosition="both"
        responsive
        globalFilter={globalFilter}
      >
        {columns.map((col, index) => (
          <Column
            key={`key${index}`}
            field={col.field}
            header={col.header}
            sortable
          />
        ))}
      </DataTable>
    );
  }
}

export default CasDataTable;
