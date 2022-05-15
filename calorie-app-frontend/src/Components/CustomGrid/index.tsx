
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./styles.scss";

export function CustomGrid({ rowData, columnDefs, filers } : any) {
  return (
    <div
      className="ag-theme-alpine custom-grid"
      style={{ height: 300, width: "auto", marginTop: 20, marginBottom: 20 }}
    >
      <AgGridReact
        defaultColDef={{
          resizable: true,
          filter: filers && "agMultiColumnFilter",
          floatingFilter: filers,
          headerCheckboxSelectionFilteredOnly: true,
          editable: false,
          sortable: true,
        }}
        enableCellChangeFlash={true}
        rowSelection="multiple"
        rowData={rowData}
        columnDefs={columnDefs}
      ></AgGridReact>
    </div>
  );
}
