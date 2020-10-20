import React, { Component } from "react";
import { ObjectUtil } from "../../lib/libs";
import { UserService } from "../../service/services";
import CasDataTable from "../common/datatable/CasDataTable";
import CasInputText from "../common/formfields/CasInputText";

class CasUserList extends Component {
  constructor() {
    super();

    this.state = {
      userList: [],
      selectedUser: {},
      globalFilter: "",
    };
    this.setUserDetailsCallBack = this.setUserDetailsCallBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUserSelection = this.handleUserSelection.bind(this);
  }

  setUserDetailsCallBack(userListJson) {
    this.setState({
      userList: userListJson,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleUserSelection(event) {
    this.setState({ selectedUser: event.value });
  }

  componentDidMount() {
    UserService.getUsers(this.setUserDetailsCallBack);
  }

  render() {
    let renderColumns = [
      { field: "id", header: "User Id" },
      { field: "username", header: "User Name" },
      { field: "name", header: "Full Name" },
      { field: "email", header: "Email Id" },
    ];
    return (
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card card-w-title">
            <div className="p-grid">
              <div className="p-col-9">
                <h1>
                  { !ObjectUtil.isEmpty(this.state.selectedUser) ? (
                    <>User &rarr;&nbsp;{this.state.selectedUser.name}</>
                  ) : (
                    <>No User selected</>
                  )}
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

            <CasDataTable
              data={this.state.userList}
              selection={this.state.selectedUser}
              onSelectionChange={this.handleUserSelection}
              rows={5}
              globalFilter={this.state.globalFilter}
              columns={renderColumns}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CasUserList;
