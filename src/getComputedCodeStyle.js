var computedCodeStyle;

function getComputedCodeStyle() {
  if (!computedCodeStyle) {
    const div = document.createElement("code");

    div.style.display = "none";
    div.className = "language-xxx";

    document.body.appendChild(div);

    computedCodeStyle = window.getComputedStyle(div);
  }

  return computedCodeStyle;
}

module.exports = getComputedCodeStyle;
