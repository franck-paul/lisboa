/*global dotclear */
'use strict';

dotclear.ready(() => {
  const dotclear_lisboa = dotclear.getData('dotclear_lisboa');

  const html = document.querySelector('html');
  html.classList.add('js');

  // Theme switcher (inspired by https://css-tricks.com/come-to-the-light-dark-side/)
  const switcher = document.getElementById('themeSwitch');
  if (switcher) {
    const auto = document.getElementById('autoSwitch');
    const light = document.getElementById('lightSwitch');
    const dark = document.getElementById('darkSwitch');
    // Display switcher
    switcher.style.display = 'flex';
    switcher.style.visibility = 'visible';
    // Scheme mode switcher
    const switchMode = (mode) => {
      const setmode = mode ?? 'auto';
      html.style.setProperty('color-scheme', setmode === 'auto' ? 'light dark' : setmode);
      if (setmode === 'auto') {
        localStorage.removeItem('mode');
        html.classList.remove('light', 'dark');
        auto?.classList.add('active');
        light?.classList.remove('active');
        dark?.classList.remove('active');
        return;
      }
      localStorage.setItem('mode', setmode);
      html.classList.add(setmode);
      html.classList.remove(setmode === 'light' ? 'dark' : 'light');
      auto?.classList.remove('active');
      if (setmode === 'light') {
        light?.classList.add('active');
        dark?.classList.remove('active');
      } else {
        light?.classList.remove('active');
        dark?.classList.add('active');
      }
    };
    // Restore previours choice if any
    switchMode(localStorage.getItem('mode'));
    // Add buttons event listener
    auto?.addEventListener('click', (event) => {
      event.preventDefault();
      switchMode('auto');
    });
    light?.addEventListener('click', (event) => {
      event.preventDefault();
      switchMode('light');
    });
    dark?.addEventListener('click', (event) => {
      event.preventDefault();
      switchMode('dark');
    });
  }

  // Show/Hide main menu
  const headerNav = document.querySelector('.header__nav');
  if (headerNav) {
    // Create button
    const button = document.createElement('button');
    button.setAttribute('id', 'hamburger');
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', dotclear_lisboa.navigation);
    button.setAttribute('aria-expanded', 'false');
    headerNav.before(button);
    // Helpers
    const doNav = (element, close) => {
      element.setAttribute('aria-expanded', close ? 'false' : 'true');
      if (close) element.classList.remove('open');
      else element.classList.add('open');
      headerNav.style.display = close ? 'none' : 'flex';
    };
    const doButton = (element, small) => {
      // Don't display on/off button on large screens
      element.style.display = small ? 'block' : 'none';
    };
    // Init
    const width = window.matchMedia('(width <= 60em)');
    doNav(button, width.matches); // Keep navigation opened on large screens
    doButton(button, width.matches);
    // Cope with match media change
    width.addEventListener('change', (event) => {
      doNav(button, event.matches);
      doButton(button, event.matches);
    });
    // Cope with button click
    button.addEventListener('click', (event) => {
      doNav(event.target, event.target.getAttribute('aria-expanded') === 'true');
      if (button.classList.contains('open')) document.querySelector('.header__nav li a')?.focus();
    });
  }

  // Show/Hide sidebar on small screens
  const offCanvasMain = document.createElement('button');
  offCanvasMain.innerHTML = `<span class="visually-hidden">${dotclear_lisboa.show_menu}</span>`;
  offCanvasMain.setAttribute('id', 'offcanvas-on');
  offCanvasMain.setAttribute('type', 'button');
  const offCanvasSidebar = document.createElement('button');
  offCanvasSidebar.innerHTML = `<span class="visually-hidden">${dotclear_lisboa.hide_menu}</span>`;
  offCanvasSidebar.setAttribute('id', 'offcanvas-off');
  offCanvasSidebar.setAttribute('type', 'button');
  document.getElementById('main')?.prepend(offCanvasMain);
  offCanvasMain.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('wrapper')?.classList.add('off-canvas');
    document.getElementById('footer')?.classList.add('off-canvas');
    const button = offCanvasSidebar.cloneNode(true);
    document.getElementById('sidebar')?.prepend(button);
    button.focus({
      preventScroll: true,
    });
    button.addEventListener('click', (eventBis) => {
      document.getElementById('wrapper')?.classList.remove('off-canvas');
      document.getElementById('footer')?.classList.remove('off-canvas');
      eventBis.target.remove();
      offCanvasMain.focus();
      eventBis.preventDefault();
    });
  });

  // totop init
  const buttonGoTop = document.getElementById('gotop');
  const linkGoTop = document.querySelector('#gotop a');
  linkGoTop.setAttribute('title', linkGoTop.textContent);
  linkGoTop.innerHTML =
    '<svg width="24px" height="24px" viewBox="1 -6 524 524" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M460 321L426 355 262 192 98 355 64 321 262 125 460 321Z"></path></svg>';
  buttonGoTop.style.width = '32px';
  buttonGoTop.style.height = '32px';
  buttonGoTop.style.padding = '3px 0';
  // totop scroll
  window.addEventListener('scroll', () => {
    buttonGoTop.style.display = document.querySelector('html').scrollTop > 0 ? 'block' : 'none';
  });
  buttonGoTop.addEventListener('click', (event) => {
    document.querySelector('html').scrollTop = 0;
    event.preventDefault();
  });
  // First pass to display or not the button
  buttonGoTop.style.display = document.querySelector('html').scrollTop > 0 ? 'block' : 'none';

  // scroll comment preview if present
  document.getElementById('pr')?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

  // Add er to every 1 of month (French only)
  for (const element of document.querySelectorAll('time')) {
    if (!element.getAttribute('datetime').includes('-01T')) {
      continue;
    }
    const tmp = element.textContent.split(' ').filter((str) => str !== '');
    const txt = tmp.join(' ');
    const full = /\p{Letter}* \d{1,2} \p{Letter}* \d{4}/u; // ex: lundi 1er juillet 2024
    const short = /\d{1,2} \p{Letter}* \d{4}/u; // ex: 1er mai 1789
    if (tmp.length === 4 && txt.match(full)) element.innerHTML = `${tmp[0]} ${tmp[1]}<sup>er</sup> ${tmp[2]} ${tmp[3]}`;
    else if (tmp.length === 3 && txt.match(short)) {
      element.innerHTML = `${tmp[0]}<sup>er</sup> ${tmp[1]} ${tmp[2]}`;
    }
  }

  // Responsive tables, if any
  const tables = document.querySelectorAll('#content table');
  if (!tables) {
    return;
  }
  /**
   * Add headers on each cells (responsive tables)
   *
   * @param      DOM elt   table         The table
   * @param      string    selector      The selector
   * @param      number    [offset=0]    The offset = number of firsts columns to ignore
   * @param      boolean   [thead=false] True if titles are in thead rather than in the first tr of the body
   */
  const responsiveCellHeaders = (table, selector, offset = 0, thead = false) => {
    try {
      const THarray = [];
      const ths = table.getElementsByTagName('th');
      for (const th of ths) {
        for (let colspan = th.colSpan; colspan > 0; colspan--) {
          THarray.push(th.innerText);
        }
      }
      const tds = table.getElementsByTagName('td');
      for (const td of tds) {
        const div = document.createElement('div');
        div.innerHTML = td.innerHTML;
        td.innerHTML = '';
        td.appendChild(div);
      }
      const styleElm = document.createElement('style');
      let styleSheet;
      document.head.appendChild(styleElm);
      styleSheet = styleElm.sheet;
      for (let i = offset; i < THarray.length; i++) {
        styleSheet.insertRule(
          `${selector} td:nth-child(${i + 1})::before {content:"${THarray[i]} ";}`,
          styleSheet.cssRules.length,
        );
      }
      table.className += `${table.className === '' ? '' : ' '}rch${thead ? ' rch-thead' : ''}`;
    } catch (e) {
      console.log(`responsiveCellHeaders(): ${e}`);
    }
  };

  let index = 1;
  for (const element of tables) {
    const currentClass = `rch-table-${index++}`;
    element.classList.add(currentClass);
    responsiveCellHeaders(element, `#content table.${currentClass}`, 0, element.tHead);
    index++;
  }
});
