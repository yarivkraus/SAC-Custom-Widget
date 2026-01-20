(function () {
  try {
    console.log("SAC Widget - Main Script Execution Started (v1.0.8)");
    let template = document.createElement("template");
    template.innerHTML = `
    <style>
      :host {
        display: block;
        font-family: "72", "72full", Arial, Helvetica, sans-serif;
        padding: 16px;
      }
      
      .widget-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
        height: 100%;
      }
      
      .widget-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 12px;
        border-bottom: 2px solid #0854a0;
      }
      
      .widget-title {
        font-size: 18px;
        font-weight: bold;
        color: #0854a0;
      }
      
      .input-section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
        padding: 12px;
        background-color: #f5f5f5;
        border-radius: 4px;
      }
      
      .input-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      
      .input-label {
        font-size: 12px;
        font-weight: 600;
        color: #32363a;
      }
      
      .input-field {
        padding: 8px;
        border: 1px solid #89919a;
        border-radius: 4px;
        font-size: 14px;
        transition: border-color 0.2s;
      }
      
      .input-field:focus {
        outline: none;
        border-color: #0854a0;
        box-shadow: 0 0 0 1px #0854a0;
      }
      
      .button-group {
        display: flex;
        gap: 8px;
        margin-top: 8px;
      }
      
      .btn {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .btn-primary {
        background-color: #0854a0;
        color: white;
      }
      
      .btn-primary:hover {
        background-color: #0a6ed1;
      }
      
      .btn-secondary {
        background-color: #e5e5e5;
        color: #32363a;
      }
      
      .btn-secondary:hover {
        background-color: #d5d5d5;
      }
      
      .table-container {
        flex: 1;
        overflow: auto;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
        background-color: white;
      }
      
      thead {
        position: sticky;
        top: 0;
        background-color: #f5f5f5;
        z-index: 1;
      }
      
      th {
        padding: 12px;
        text-align: left;
        font-weight: 600;
        color: #32363a;
        border-bottom: 2px solid #0854a0;
        font-size: 14px;
      }
      
      td {
        padding: 10px 12px;
        border-bottom: 1px solid #e5e5e5;
        font-size: 14px;
        color: #32363a;
      }
      
      tbody tr {
        transition: background-color 0.2s;
        cursor: pointer;
      }
      
      tbody tr:hover {
        background-color: #f0f7ff;
      }
      
      tbody tr.selected {
        background-color: #e3f2fd;
      }
      
      .no-data {
        text-align: center;
        padding: 40px;
        color: #89919a;
        font-style: italic;
      }
      
      .actions-cell {
        display: flex;
        gap: 8px;
      }
      
      .action-btn {
        padding: 4px 8px;
        font-size: 12px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .edit-btn {
        background-color: #0854a0;
        color: white;
      }
      
      .edit-btn:hover {
        background-color: #0a6ed1;
      }
      
      .delete-btn {
        background-color: #dc3545;
        color: white;
      }
      
      .delete-btn:hover {
        background-color: #c82333;
      }
    </style>
    
    <div class="widget-container">
      <div class="widget-header">
        <div class="widget-title" id="widgetTitle">Data Table (v1.0.8)</div>
      </div>
      
      <div class="input-section" id="inputSection">
        <div class="input-group">
          <label class="input-label" for="inputName">Name</label>
          <input type="text" class="input-field" id="inputName" placeholder="Enter name" aria-label="Name">
        </div>
        <div class="input-group">
          <label class="input-label" for="inputValue">Value</label>
          <input type="number" class="input-field" id="inputValue" placeholder="Enter value" aria-label="Value">
        </div>
        <div class="input-group">
          <label class="input-label" for="inputCategory">Category</label>
          <select class="input-field" id="inputCategory" aria-label="Category">
            <option value="">Select category</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        <div class="input-group">
          <label class="input-label" for="inputDate">Date</label>
          <input type="date" class="input-field" id="inputDate" aria-label="Date">
        </div>
      </div>
      
      <div class="button-group">
        <button class="btn btn-primary" id="addBtn">Add Row</button>
        <button class="btn btn-secondary" id="clearBtn">Clear Table</button>
        <button class="btn btn-secondary" id="exportBtn">Export Data</button>
      </div>
      
      <div class="table-container">
        <table id="dataTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Value</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="tableBody">
            <tr>
              <td colspan="6" class="no-data">No data available. Add rows using the input fields above.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

    class TableWidget extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._props = {
          title: "Data Table",
          showInputFields: true,
          maxRows: 10
        };

        this._data = [];
        this._sapData = [];
        this._nextId = 1;
        this._selectedRow = null;

        this._initializeElements();
        this._attachEventListeners();
      }

      onCustomWidgetAfterUpdate(changedProperties) {
        try {
          console.log("SAC Widget - onCustomWidgetAfterUpdate called with:", changedProperties);
          if ("tableData" in changedProperties) {
            this._processSapData(changedProperties["tableData"]);
          }

          // Handle property updates defensively
          if (changedProperties.title !== undefined) this.title = changedProperties.title;
          if (changedProperties.showInputFields !== undefined) this.showInputFields = changedProperties.showInputFields;
          if (changedProperties.maxRows !== undefined) this.maxRows = changedProperties.maxRows;
          if (changedProperties.primaryColor !== undefined) this.primaryColor = changedProperties.primaryColor;

        } catch (e) {
          console.error("SAC Widget - Error in onCustomWidgetAfterUpdate:", e);
        }
      }

      _processSapData(tableData) {
        try {
          console.log("SAC Widget - _processSapData received tableData:", tableData);
          if (!tableData || !tableData.data) {
            console.log("SAC Widget - No data or invalid tableData structure received.");
            this._sapData = [];
            this._renderTable();
            return;
          }

          const data = tableData.data;
          const metadata = tableData.metadata;

          // Map SAP data to our internal format
          this._sapData = data.map((record, index) => {
            const row = {
              id: `SAP-${index + 1}`,
              name: "Unknown",
              value: 0,
              category: "N/A",
              date: new Date().toISOString().split('T')[0],
              isSapData: true
            };

            // Extract dimensions and measures based on metadata
            if (metadata && metadata.feeds) {
              const dimFeed = metadata.feeds.dimensions;
              const measFeed = metadata.feeds.measures;

              if (dimFeed && dimFeed.values && dimFeed.values.length > 0) {
                const dimId = dimFeed.values[0];
                const dimVal = record[dimId];
                if (dimVal) {
                  row.name = dimVal.description || dimVal.id || String(dimVal);
                }

                if (dimFeed.values.length > 1) {
                  const catId = dimFeed.values[1];
                  const catVal = record[catId];
                  if (catVal) {
                    row.category = catVal.description || catVal.id || String(catVal);
                  }
                }
              }

              if (measFeed && measFeed.values && measFeed.values.length > 0) {
                const measId = measFeed.values[0];
                const measVal = record[measId];
                if (measVal) {
                  row.value = typeof measVal.rawValue === 'number' ? measVal.rawValue : (parseFloat(measVal.rawValue) || 0);
                }
              }
            }

            return row;
          });

          this._renderTable();
        } catch (e) {
          console.error("Error processing SAC data:", e);
          this._sapData = [];
          this._renderTable();
        }
      }

      _initializeElements() {
        this._titleElement = this.shadowRoot.getElementById("widgetTitle");
        this._inputSection = this.shadowRoot.getElementById("inputSection");
        this._inputName = this.shadowRoot.getElementById("inputName");
        this._inputValue = this.shadowRoot.getElementById("inputValue");
        this._inputCategory = this.shadowRoot.getElementById("inputCategory");
        this._inputDate = this.shadowRoot.getElementById("inputDate");
        this._addBtn = this.shadowRoot.getElementById("addBtn");
        this._clearBtn = this.shadowRoot.getElementById("clearBtn");
        this._exportBtn = this.shadowRoot.getElementById("exportBtn");
        this._tableBody = this.shadowRoot.getElementById("tableBody");
      }

      _attachEventListeners() {
        this._addBtn.addEventListener("click", () => this._addRow());
        this._clearBtn.addEventListener("click", () => this._clearTable());
        this._exportBtn.addEventListener("click", () => this._exportData());

        // Allow Enter key to add row
        [this._inputName, this._inputValue, this._inputCategory, this._inputDate].forEach(input => {
          input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
              this._addRow();
            }
          });
        });
      }

      _addRow() {
        const name = this._inputName.value.trim();
        const value = parseFloat(this._inputValue.value) || 0;
        const category = this._inputCategory.value;
        const date = this._inputDate.value;

        if (!name) {
          alert("Please enter a name");
          return;
        }

        const newRow = {
          id: this._nextId++,
          name: name,
          value: value,
          category: category || "N/A",
          date: date || new Date().toISOString().split('T')[0]
        };

        this._data.push(newRow);
        this._renderTable();
        this._clearInputs();
        this._fireEvent("onDataChange");
      }

      _editRow(id) {
        const row = this._data.find(r => r.id === id);
        if (row) {
          this._inputName.value = row.name;
          this._inputValue.value = row.value;
          this._inputCategory.value = row.category === "N/A" ? "" : row.category;
          this._inputDate.value = row.date;

          // Remove the row so it can be re-added with updated values
          this._deleteRow(id);
        }
      }

      _deleteRow(id) {
        this._data = this._data.filter(r => r.id !== id);
        this._renderTable();
        this._fireEvent("onDataChange");
      }

      _clearTable() {
        if (this._data.length > 0 && !confirm("Are you sure you want to clear all data?")) {
          return;
        }
        this._data = [];
        this._nextId = 1;
        this._renderTable();
        this._fireEvent("onDataChange");
      }

      _clearInputs() {
        this._inputName.value = "";
        this._inputValue.value = "";
        this._inputCategory.value = "";
        this._inputDate.value = "";
        this._inputName.focus();
      }

      _exportData() {
        const dataStr = JSON.stringify(this._data, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "table-data.json";
        link.click();
        URL.revokeObjectURL(url);
      }

      _renderTable() {
        try {
          this._tableBody.innerHTML = "";
          const allData = Array.isArray(this._sapData) && Array.isArray(this._data) ? [...this._sapData, ...this._data] : (Array.isArray(this._data) ? this._data : []);

          if (allData.length === 0) {
            const row = document.createElement("tr");
            row.innerHTML = '<td colspan="6" class="no-data">No data available. Add rows using the input fields above or bind a data source.</td>';
            this._tableBody.appendChild(row);
            return;
          }

          allData.forEach(item => {
            const row = document.createElement("tr");
            row.dataset.id = item.id;
            if (item.isSapData) row.style.borderLeft = "4px solid #0854a0";

            const displayValue = typeof item.value === 'number' ? item.value.toLocaleString() : String(item.value || 0);

            row.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <div class="actions-cell">
              </div>
            </td>
          `;

            const cells = row.querySelectorAll("td");
            cells[0].textContent = item.id;
            cells[1].textContent = item.name || '';
            cells[2].textContent = displayValue;
            cells[3].textContent = item.category || '';
            cells[4].textContent = item.date || '';

            const actionsCell = row.querySelector(".actions-cell");
            if (item.isSapData) {
              const span = document.createElement("span");
              span.style.fontSize = "10px";
              span.style.color = "#666";
              span.textContent = "DS Data";
              actionsCell.appendChild(span);
            } else {
              const editBtn = document.createElement("button");
              editBtn.className = "action-btn edit-btn";
              editBtn.textContent = "Edit";
              editBtn.onclick = (e) => { e.stopPropagation(); this._editRow(item.id); };

              const deleteBtn = document.createElement("button");
              deleteBtn.className = "action-btn delete-btn";
              deleteBtn.textContent = "Delete";
              deleteBtn.onclick = (e) => { e.stopPropagation(); this._deleteRow(item.id); };

              actionsCell.appendChild(editBtn);
              actionsCell.appendChild(deleteBtn);
            }

            row.onclick = (e) => {
              if (!e.target.classList.contains("action-btn")) {
                this._selectRow(row);
              }
            };

            this._tableBody.appendChild(row);
          });
        } catch (e) {
          console.error("Error rendering table:", e);
        }
      }

      _selectRow(row) {
        // Remove previous selection
        const previousSelected = this._tableBody.querySelector(".selected");
        if (previousSelected) {
          previousSelected.classList.remove("selected");
        }

        // Add new selection
        row.classList.add("selected");
        this._selectedRow = parseInt(row.dataset.id);
        this._fireEvent("onRowSelect");
      }

      _fireEvent(eventName) {
        this.dispatchEvent(new CustomEvent(eventName, {
          detail: {
            data: this._data,
            selectedRow: this._selectedRow
          }
        }));
      }

      // Public methods
      addRow() {
        this._addRow();
      }

      clearTable() {
        this._clearTable();
      }

      getData() {
        return JSON.parse(JSON.stringify(this._data));
      }

      // Property setters
      set title(value) {
        this._props.title = value || "Data Table";
        if (this._titleElement) {
          this._titleElement.textContent = this._props.title;
        }
      }

      set showInputFields(value) {
        this._props.showInputFields = !!value;
        if (this._inputSection) {
          this._inputSection.style.display = this._props.showInputFields ? "grid" : "none";
        }
      }

      set maxRows(value) {
        this._props.maxRows = parseInt(value) || 10;
      }

      set primaryColor(value) {
        this._props.primaryColor = value || "#0854a0";
        if (this.shadowRoot) {
          this.shadowRoot.querySelectorAll('.widget-title, th').forEach(el => {
            el.style.color = this._props.primaryColor;
            if (el.tagName === 'TH') el.style.borderBottomColor = this._props.primaryColor;
          });
          const header = this.shadowRoot.querySelector('.widget-header');
          if (header) header.style.borderBottomColor = this._props.primaryColor;
        }
      }
    }

    console.log("SAC Widget - Script logic processed, attempting to define custom element...");
    try {
      // Dual-Tag strategy: Register both new and old tags to be resilient to CDN caching
      if (!customElements.get("com-yarivkraus-tablewidget")) {
        customElements.define("com-yarivkraus-tablewidget", TableWidget);
      }
      if (!customElements.get("com-sap-sample-tablewidget")) {
        customElements.define("com-sap-sample-tablewidget", TableWidget);
      }
      console.log("SAC Widget - Main Widget defined successfully (Dual-Tag)");
    } catch (e) {
      console.error("SAC Widget - Custom Element definition error:", e);
    }
  } catch (e) {
    console.error("SAC Widget - TOP LEVEL CRASH in main.js:", e);
  }
})();
