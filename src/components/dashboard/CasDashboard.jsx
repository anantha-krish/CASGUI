import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { UserService } from '../../service/services';

function CasDashboard() {
  const [userList, setuserList] = useState([]);
  const [selectedUser, setselectedUser] = useState("");
  const [globalFilter, setglobalFilter] = useState("");

  function setUserDetailsCallBack(data){
    setuserList(data);
  }

  useEffect(() => {
   UserService.getUsers(setUserDetailsCallBack);
  }, []);

  return (
    <div className="p-grid">
      <div className="p-col-12">
        <div className="card card-w-title">
          <div className="p-grid">
            <div className="p-col-9">
              {" "}
              <h1>
                {selectedUser
                  ? "User -> " + selectedUser.name
                  : "No User selected"}
              </h1>
            </div>
            <div className="p-col">
              <span className="p-input-icon-right">
                <i className="pi pi-search" />
                <InputText
                  type="search"
                  onInput={(e) => setglobalFilter(e.target.value)}
                  placeholder="Search"
                  size="30"
                />
              </span>
            </div>
          </div>

          <DataTable
            value={userList}
            selectionMode="single"
            selection={selectedUser}
            onSelectionChange={(event) => setselectedUser(event.value)}
            paginator
            rows={5}
            paginatorPosition="both"
            responsive
            globalFilter={globalFilter}
          >
            <Column field="id" header="User Id" sortable />
            <Column field="username" header="User Name" sortable />
            <Column field="name" header="Full Name" sortable />
            <Column field="email" header="Email Id" sortable />
            <Column field="address.street" header="Street" sortable />
            <Column field="company.name" header="Company" sortable />
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default CasDashboard;
