class ToolTip extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const toolTipIcon = document.createElement("i");
    toolTipIcon.classList.add("fa", "fa-question");
    this.appendChild(toolTipIcon);
  }
}

customElements.define("wc-tooltip", ToolTip);
