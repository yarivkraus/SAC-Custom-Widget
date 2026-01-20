(function () {
  try {
    console.log("SAC Simple Widget Styling - Execution Started (v2.0.0)");
    let template = document.createElement("template");
    template.innerHTML = `
    <style>
      .panel { font-family: Arial, sans-serif; padding: 15px; }
      .section { margin-bottom: 15px; }
      label { display: block; font-weight: bold; margin-bottom: 5px; }
      input { width: 100%; padding: 5px; box-sizing: border-box; }
    </style>
    <div class="panel">
      <div style="font-size: 10px; color: #999;">Simple Styling v2.0.0</div>
      <div class="section">
        <label>Widget Title</label>
        <input type="text" id="titleInput">
      </div>
      <div class="section">
        <label>Primary Color</label>
        <input type="color" id="colorInput">
      </div>
    </div>
  `;

    class SimpleTableStyling extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._initializeElements();
      }

      _initializeElements() {
        this._title = this.shadowRoot.getElementById("titleInput");
        this._color = this.shadowRoot.getElementById("colorInput");

        this._title.addEventListener("input", () => this._fireChange("title", this._title.value));
        this._color.addEventListener("input", () => this._fireChange("primaryColor", this._color.value));
      }

      _fireChange(prop, val) {
        this.dispatchEvent(new CustomEvent("propertiesChanged", {
          detail: { properties: { [prop]: val } }
        }));
      }
    }

    if (!customElements.get("com-yarivkraus-simpletable-styling")) {
      customElements.define("com-yarivkraus-simpletable-styling", SimpleTableStyling);
    }
    if (!customElements.get("com-yarivkraus-tablewidget-styling")) {
      customElements.define("com-yarivkraus-tablewidget-styling", SimpleTableStyling);
    }
    console.log("SAC Simple Widget Styling - Defined successfully");
  } catch (e) {
    console.error("SAC Simple Widget Styling - Fatal Error:", e);
  }
})();
