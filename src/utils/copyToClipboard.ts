function copyToClipboard(text: string) {
  const input = document.createElement("input");
  input.style.position = "fixed";
  input.style.left = "0";
  input.style.top = "0";
  input.style.opacity = "0";
  input.setAttribute("value", text);
  document.body.appendChild(input);
  input.focus();
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}

export default copyToClipboard;
