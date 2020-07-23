class ToolTip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = this.getAttribute("tooltip-text");
    this._tooltipType = this.getAttribute("tooltip-type") || "question-circle";
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const tooltipIcon = document.createElement("i");
    tooltipIcon.classList.add("fa");
    tooltipIcon.classList.add(`fa-${this._tooltipType}`);

    tooltipIcon.style.cursor = "pointer";
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));

    this.shadowRoot.appendChild(tooltipIcon);
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this._tooltipContainer.style.backgroundColor = "#fefefe";
    this._tooltipContainer.style.boxShadow = "0 .3rem .8rem rgba(0,0,0,.12)";
    this._tooltipContainer.style.display = "inline";
    this._tooltipContainer.style.padding = "1em";
    this._tooltipContainer.style.width = "auto";

    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("wc-tooltip", ToolTip);
