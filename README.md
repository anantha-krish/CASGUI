# CAS GUI POC

## Installation 
Packages needed to be installed

```json
  // Production dependencies
   "axios": "^0.20.0",

   "primeicons": "^4.0.0",

   "primereact": "^5.0.1",

    "primeflex": "^2.0.0",
    
    // required package for data table
    "react-transition-group": "^4.4.1"

   // As we are using SASS(CSS Pre processor)
     "node-sass": "^4.14.1",

   // Routing different components
   "react-router-dom": "^5.2.0",

  // for dynamic rendering of classnames
   "classnames": "^2.2.6",



   // Dev depedencies for unit testing
    "enzyme": "^3.11.0",

    "enzyme-adapter-react-16": "^1.15.5",

    "react-test-renderer": "^16.13.1"

```

## List of CAS Components
### CasDataTable
Component helps you to display data in table format with sort, filter features.

 Props | Type | Description | Required 
 ------ | ------ | ----------- | -------- 
 `data`  | array | array contains the information to display | Required 
 `columns`  | array | array contains the list of field & header to display Ex:{ field: "id", header: "User Id" }| Required 
`selection`  | object | save the row selection to an object | Optional
`onSelectionChange`  | func | function to invoke on selection change |Optional
 `globalFilter`  | string | filter the results based on the search string |Optional
`rows` |number| Number of rows to display in first page | Optional (10)

Example Syntax 
```jsx
<CasDataTable
  data={this.state.userList}
  selection={this.state.selectedUser}
  onSelectionChange={this.handleUserSelection}
  rows={5}
  globalFilter={this.state.globalFilter}
  columns={renderColumns}
/>
```