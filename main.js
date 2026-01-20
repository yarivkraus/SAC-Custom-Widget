(function () {
  try {
    console.log("SAC Simple Widget - Execution Started (v2.0.0)");
    let template = document.createElement("template");
    template.innerHTML = `
    <style>
      :host {
        display: block;
        font-family: Arial, sans-serif;
        padding: 10px;
        height: 100%;
        overflow: hidden;
      }
      .container {
        display: flex;
        flex-direction: column;
        height: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: white;
      }
      .header {
        padding: 10px;
        background: #f8f9fa;
        border-bottom: 2px solid #0854a0;
        font-weight: bold;
        color: #0854a0;
      }
      .table-wrapper {
        flex: 1;
        overflow: auto;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th {
        position: sticky;
        top: 0;
        background: #eee;
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }
      td {
        padding: 8px;
        border-bottom: 1px solid #eee;
      }
      tr:hover {
        background: #f0f7ff;
      }
      .no-data {
        text-align: center;
        padding: 20px;
        color: #999;
      }
    </style>
    <div class="container">
      <div class="header" id="title">Simple Data Table (v2.0.0)</div>
      <div class="table-wrapper">
        <table id="table">
          <thead id="thead"></thead>
          <tbody id="tbody">
            <tr><td class="no-data">Loading data...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

    class SimpleTable extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._props = { title: "Simple Data Table", primaryColor: "#0854a0" };
        this._data = [];
        this._metadata = null;
      }

      onCustomWidgetAfterUpdate(changedProperties) {
        if ("tableData" in changedProperties) {
          this._processData(changedProperties["tableData"]);
        }
        if ("title" in changedProperties) this.title = changedProperties.title;
        if ("primaryColor" in changedProperties) this.primaryColor = changedProperties.primaryColor;
      }

      _processData(tableData) {
        console.log("SAC Simple Widget - Data received:", tableData);
        if (!tableData || !tableData.data) {
          this._renderEmpty();
          return;
        }
        this._data = tableData.data;
        this._metadata = tableData.metadata;
        this._renderTable();
      }

      _renderEmpty() {
        const tbody = this.shadowRoot.getElementById("tbody");
        tbody.innerHTML = '<tr><td class="no-data">No data bound.</td></tr>';
      }

      _renderTable() {
        const thead = this.shadowRoot.getElementById("thead");
        const tbody = this.shadowRoot.getElementById("tbody");
        thead.innerHTML = "";
        tbody.innerHTML = "";

        if (!this._data || this._data.length === 0) {
          this._renderEmpty();
          return;
        }

        // Create Headers
        const headerRow = document.createElement("tr");
        const keys = Object.keys(this._data[0]).filter(k => k !== "@measureDimension");
        keys.forEach(key => {
          const th = document.createElement("th");
          th.textContent = key;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Create Rows
        this._data.forEach(item => {
          const tr = document.createElement("tr");
          keys.forEach(key => {
            const td = document.createElement("td");
            const val = item[key];
            td.textContent = (val && typeof val === "object") ? (val.description || val.id || JSON.stringify(val)) : val;
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
      }

      set title(value) {
        this._props.title = value;
        this.shadowRoot.getElementById("title").textContent = value + " (v2.0.0)";
      }

      set primaryColor(value) {
        this._props.primaryColor = value;
        this.shadowRoot.getElementById("title").style.borderBottomColor = value;
        this.shadowRoot.getElementById("title").style.color = value;
      }
    }

    // Dual-Tag strategy for reliability
    if (!customElements.get("com-yarivkraus-simpletable")) {
      customElements.define("com-yarivkraus-simpletable", SimpleTable);
    }
    if (!customElements.get("com-yarivkraus-tablewidget")) {
      customElements.define("com-yarivkraus-tablewidget", SimpleTable);
    }
    console.log("SAC Simple Widget - Defined successfully");
  } catch (e) {
    console.error("SAC Simple Widget - Fatal Error:", e);
  }
})();
