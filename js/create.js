let stepItems = [];

function renderRecipe(step) {
  localStorage.setItem('stepItems', JSON.stringify(stepItems));

  const list = document.querySelector('.js-step-list');
  const item = document.querySelector(`[data-key='${step.id}']`);

  if (step.deleted) {
    item.remove();
    if (stepItems.length === 0) list.innerHTML = '';
    return;
  }

  const isChecked = step.checked ? 'done' : '';
  const node = document.createElement('li');
  node.setAttribute('class', `step-item ${isChecked}`);
  node.setAttribute('data-key', step.id);
  node.innerHTML = `
    <label for="${step.id}" class="tick js-tick"></label>
    <span>${step.text}</span>
    <button class="delete-step js-delete-step">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

function addStep(text) {
  const step = {
    text,
    checked: false,
    id: Date.now(),
  };

  stepItems.push(step);
  renderRecipe(step);
}

function deleteStep(key) {
  const index = stepItems.findIndex((item) => item.id === Number(key));
  const step = {
    deleted: true,
    ...stepItems[index],
  };
  stepItems = stepItems.filter((item) => item.id !== Number(key));
  renderRecipe(step);
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('.js-step-input');

  const text = input.value.trim();
  if (text !== '') {
    addStep(text);
    input.value = '';
    input.focus();
  }
});

const list = document.querySelector('.js-step-list');
list.addEventListener('click', (event) => {
  if (event.target.classList.contains('js-delete-step')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteStep(itemKey);
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
