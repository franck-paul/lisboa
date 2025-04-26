/*global dotclear */
'use strict';

dotclear.ready(() => {
  const list = document.querySelector('.arch-tag-list');
  if (!list) {
    return;
  }
  // Stockage des index initiaux des mots-clés (tri par poids)
  Array.from(list.getElementsByTagName('li')).forEach((elt, idx) => {
    if ('idx' in elt.dataset === false) elt.dataset.idx = idx;
  });
  const title = document.querySelector('#arch-by-tag h3');
  if (!title) {
    return;
  }
  // Création bouton de bascule de tri
  const button = document.createElement('button');
  const options = {
    alpha: {
      title: 'Trier par ordre lexicographique',
      svg: '<svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m8.1875 5-.21875.65625-1.9375 5.34375h-.03125v.0625l-.9375 2.59375-.0625.15625v1.1875h2v-.84375l.40625-1.15625h3.1875l.40625 1.15625v.84375h2v-1.1875l-.0625-.15625-.9375-2.59375v-.0625h-.03125l-1.9375-5.34375-.21875-.65625zm13.8125 0v18.6875l-2.59375-2.59375-1.40625 1.40625 4.28125 4.3125.71875.6875.71875-.6875 4.28125-4.3125-1.40625-1.40625-2.59375 2.59375v-18.6875zm-13 3.65625.84375 2.34375h-1.6875zm-4 8.34375v2h5.5625l-5.28125 5.28125-.28125.3125v2.40625h8v-2h-5.5625l5.28125-5.28125.28125-.3125v-2.40625z"/></svg>',
    },
    numeric: {
      title: "Trier par fréquence d'utilisation",
      svg: '<svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m8.59375 5-.15625.78125s-.164062.574219-.5625 1.15625c-.398437.582031-.894531 1.0625-1.875 1.0625v2c1.375 0 2.320313-.675781 3-1.40625v6.40625h2v-10zm13.40625 0v18.6875l-2.59375-2.59375-1.40625 1.40625 4.28125 4.3125.71875.6875.71875-.6875 4.28125-4.3125-1.40625-1.40625-2.59375 2.59375v-18.6875zm-13.5 12c-1.921875 0-3.5 1.578125-3.5 3.5v.5h2v-.5c0-.875.625-1.5 1.5-1.5h1c.875 0 1.5.625 1.5 1.5 0 .457031-.351562.980469-.9375 1.34375-1.234375.757813-2.316406 1.242188-3.21875 1.75-.453125.253906-.867187.496094-1.21875.875-.351562.378906-.625.949219-.625 1.53125v1h8v-2h-4.5625c.734375-.378906 1.582031-.757812 2.6875-1.4375 1.015625-.636719 1.875-1.71875 1.875-3.0625 0-1.921875-1.578125-3.5-3.5-3.5z"/></svg>',
    },
  };
  button.classList.add('arch-by-tag-order');
  button.setAttribute('title', options.alpha.title);
  button.innerHTML = options.alpha.svg;
  title.appendChild(button);
  // Gestion du click
  button.addEventListener('click', () => {
    if (list.classList.contains('alpha')) {
      // La liste est triée lexicalement, on retourne à l'ordre initial
      const table = Array.from(list.getElementsByTagName('li')).sort((a, b) =>
        a.dataset.idx.localeCompare(b.dataset.idx, undefined, { numeric: true }),
      );
      for (const elt of table) list.appendChild(elt);
      button.setAttribute('title', options.alpha.title);
      button.innerHTML = options.alpha.svg;
      list.classList.remove('alpha');
      return;
    }
    // La liste est triée par poids, on change pour un ordre lexical
    const table = Array.from(list.getElementsByTagName('li')).sort((a, b) => a.textContent.localeCompare(b.textContent));
    for (const elt of table) list.appendChild(elt);
    button.setAttribute('title', options.numeric.title);
    button.innerHTML = options.numeric.svg;
    list.classList.add('alpha');
  });
});
