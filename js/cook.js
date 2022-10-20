let stepItems = [];
const list = document.querySelector('.js-step-list');
function renderRecipe(step) {
  localStorage.setItem('stepItems', JSON.stringify(stepItems));
  const item = document.querySelector(`[data-key='${step.id}']`);
  const isChecked = step.checked ? 'done' : '';
  const node = document.createElement('li');
  node.setAttribute('class', `step-item ${isChecked}`);
  node.setAttribute('data-key', step.id);
  node.innerHTML = `
    <input id="${step.id}" type="checkbox"/>
    <label for="${step.id}" class="tick js-tick"></label>
    <span>${step.text}</span>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

function toggleDone(key) {
  const index = stepItems.findIndex((item) => item.id === Number(key));
  stepItems[index].checked = !stepItems[index].checked;
  renderRecipe(stepItems[index]);
}

list.addEventListener('click', (event) => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('stepItems');
  if (ref) {
    stepItems = JSON.parse(ref);
    stepItems.forEach((t) => {
      renderRecipe(t);
    });
  }
});
