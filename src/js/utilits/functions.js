export default function createElementDOM(
  element,
  classElement,
  textContent = false,
  styleElement = false,
) {
  const newElement = document.createElement(element);
  newElement.className = classElement;
  if (textContent !== false) {
    newElement.textContent = textContent;
  }
  if (styleElement !== false) {
    newElement.style = styleElement;
  }
  return newElement;
}
