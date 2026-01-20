(function () {
  console.log("SAC Widget Styling - Script Execution Started (v1.0.3)");
  let template = document.createElement("template");
  template.innerHTML = `
    <style>
      /* Styling panel for SAC custom widget */
      .styling-panel {
        font-family: "72", "72full", Arial, Helvetica, sans-serif;
        padding: 16px;
      }
      
      .styling-section {
        margin-bottom: 20px;
      }
      
      .styling-label {
        display: block;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #32363a;
      }
      
      .styling-input {
        width: 100%;
        padding: 8px;
        border: 1px solid #89919a;
        border-radius: 4px;
        font-size: 14px;
      }
      
      .color-picker {
        width: 100%;
        height: 40px;
        border: 1px solid #89919a;
        border-radius: 4px;
        cursor: pointer;
      }
      
      .checkbox-container {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .checkbox {
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
    </style>
    
    <div class="styling-panel">
      <div style="font-size: 10px; color: #999; margin-bottom: 10px;">Styling Panel v1.0.3</div>
      <div class="styling-section">
        <label class="styling-label" for="titleInput">Widget Title</label>
        <input type="text" class="styling-input" id="titleInput" placeholder="Enter widget title">
      </div>
      
      <div class="styling-section">
        <label class="styling-label" for="showInputCheckbox">Show Input Fields</label>
        <div class="checkbox-container">
          <input type="checkbox" class="checkbox" id="showInputCheckbox" checked>
          <label for="showInputCheckbox">Display input section</label>
        </div>
      </div>
      
      <div class="styling-section">
        <label class="styling-label" for="maxRowsInput">Maximum Rows</label>
        <input type="number" class="styling-input" id="maxRowsInput" min="1" max="100" value="10">
      </div>
      
      <div class="styling-section">
        <label class="styling-label" for="primaryColorPicker">Primary Color</label>
        <input type="color" class="color-picker" id="primaryColorPicker" value="#0854a0">
      </div>
    </div>
  `;

  class TableWidgetStyling extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this._initializeElements();
      this._attachEventListeners();
    }

    _initializeElements() {
      this._titleInput = this.shadowRoot.getElementById("titleInput");
      this._showInputCheckbox = this.shadowRoot.getElementById("showInputCheckbox");
      this._maxRowsInput = this.shadowRoot.getElementById("maxRowsInput");
      this._primaryColorPicker = this.shadowRoot.getElementById("primaryColorPicker");
    }

    _attachEventListeners() {
      this._titleInput.addEventListener("input", () => {
        this._firePropertyChange("title", this._titleInput.value);
      });

      this._showInputCheckbox.addEventListener("change", () => {
        this._firePropertyChange("showInputFields", this._showInputCheckbox.checked);
      });

      this._maxRowsInput.addEventListener("input", () => {
        this._firePropertyChange("maxRows", parseInt(this._maxRowsInput.value));
      });

      this._primaryColorPicker.addEventListener("input", () => {
        this._firePropertyChange("primaryColor", this._primaryColorPicker.value);
      });
    }

    _firePropertyChange(propertyName, value) {
      this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: {
          properties: {
            [propertyName]: value
          }
        }
      }));
    }
  }
  console.log("SAC Widget Styling - Script loaded");
  try {
    customElements.define("com-yarivkraus-tablewidget-styling", TableWidgetStyling);
    console.log("SAC Widget Styling - Custom Element defined");
  } catch (e) {
    console.warn("SAC Widget Styling - Custom Element might already be defined:", e);
  }
})();
