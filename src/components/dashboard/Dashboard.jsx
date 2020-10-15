import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {InputText} from 'primereact/inputtext';
import data from "./dummyData.json";

function Dashboard() {
  const [userList, setuserList] = useState("");
  const [selectedUser, setselectedUser] = useState("");
  const [globalFilter, setglobalFilter] = useState("")

  useEffect(() => {
    // Todo service API call
    setuserList(data);
  }, []);

  let tableheader = (
     <>
    <div style={{textAlign:'right'}}>
   <span style={{float:'left',fontSize:'25px'}}>List of users</span>
        <InputText type="search" onInput={(e) => setglobalFilter(e.target.value)} placeholder="Global Search" size="30" />
    </div>
    </>
);

  return (
    <div className="p-grid">
      <div className="p-col-10">
        <div className="card card-w-title">
          <h1>
            {selectedUser ? "User: " + selectedUser.name : "No User selected"}
          </h1>
          <DataTable
            value={userList}
            selectionMode="single"
            header={tableheader}
            selection={selectedUser}
            onSelectionChange={(event) => setselectedUser(event.value)}
            paginator
            rows={3}
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

export default Dashboard;
