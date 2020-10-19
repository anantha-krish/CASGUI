import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { UserService } from "../../service/services";
import CasInputText from '../common/formfields/CasInputText';

class CasUserList extends Component {
  constructor() {
    super();

    this.state = {
      userList: [],
      selectedUser: "",
      globalFilter: "",
    };
    this.setUserDetailsCallBack = this.setUserDetailsCallBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  setUserDetailsCallBack(userListJson) {
    this.setState({
      userList: userListJson,
    });
  }

  handleChange(event) {
    console.log("ffffffff",event);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    UserService.getUsers(this.setUserDetailsCallBack);
  }

  render() {
    return (
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card card-w-title">
            <div className="p-grid">
              <div className="p-col-9">
                <h1>
                  {this.state.selectedUser
                    ? "User -> " + this.state.selectedUser.name
                    : "No User selected"}
                </h1>
              </div>
              <div className="p-col">
                <span className="p-input-icon-right">
                  <i className="pi pi-search" />
                  <CasInputText
                    onChange={this.handleChange}
                    name="globalFilter"
                    placeholder="Search"
                    value={this.state.globalFilter}
                    size="30"
                  />
                </span>
              </div>
            </div>

            <DataTable
              value={this.state.userList}
              selectionMode="single"
              selection={this.state.selectedUser}
              onSelectionChange={(event) =>
                this.setState({ selectedUser: event.value })
              }
              paginator
              rows={5}
              paginatorPosition="both"
              responsive
              globalFilter={this.state.globalFilter}
            >
              <Column field="id" header="User Id" sortable />
              <Column field="username" header="User Name" sortable />
              <Column field="name" header="Full Name" sortable />
              <Column field="email" header="Email Id" sortable />
             
            </DataTable>
          </div>
        </div>
      </div>
    );
  }
}

export default CasUserList;
