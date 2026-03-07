// noinspection EqualityComparisonWithCoercionJS

/* ============================================================
   GLOBAL ICON PICKER
   ============================================================ */
var DEFAULT_ICONS = DEFAULT_ICONS || [
    '', "🔎", "⌕", "🔍", "ℹ", "ⓘ", "❓", "⚠", "⛔", "🛑", "☣", "☢", "☠", "💀", "🔥", "⚡", "❗", "‼", "❕", "‼️",
    "✔", "✓", "✅", "✘", "✖", "×", "✎", "✏", "🗑", "➕", "＋", "➖", "−", "≡", "☰", "⋮", "…", "🔄", "⟲",
    "⚙", "⚙️", "🛠", "🔧", "🔩", "🧰", "🔬", "🧪", "🧵", "🪙", "📡", "🧠", "🧱", "🧩", "🔑", "🔒", "🔓", "🛡", "⚖", "🧿",
    "📄", "📋", "📝", "📁", "📂", "🗂", "🧾", "📎", "🏷", "🔖", "📑", "🖨", "📤", "📥",
    "⬇", "⇩", "⬆", "⇧", "↕", "⇅", "⬅", "➡", "↔", "↩", "↪", "⤴", "⤵",
    "📊", "📈", "📉", "📅", "⏳", "⌛", "⏱", "⏰",
    "💲", "💶", "💳", "💰", "🛒", "🎁", "📦", "🧴",
    "🏭", "🏬", "🏢", "🏪", "🏦", "🏠",
    "🚗", "🚚", "🚛", "🚐", "🏍", "🚲", "✈", "🚢",
    "👤", "👥", "🧑‍💼", "👷", "🧑‍🔧", "🧑‍🏫",
    "🐱", "🐶", "🐦", "🐟", "☂", "🌧", "☀", "☁", "⛈", "❄", "🌪",
    "⭐", "🌟", "🔔", "📣", "📌", "📍", "🧭", "🗺", "📞", "✉", "📨", "📇"
];

class IconPicker {
    /*
    // Get elements
const hiddenInput = dlg.querySelector('#mnu_add_icon');
const trigger = dlg.querySelector('#mnu_add_icon_trigger');

// Set initial display (empty)
trigger.querySelector('span:first-child').textContent = '';

// Open picker on trigger click
trigger.onclick = (e) => {
    e.stopPropagation();
    // Create a fresh instance and open it
    const picker = new IconPicker(this.MNU_ICONS);
    picker.open(trigger, hiddenInput);
};
     */
    constructor(icons = DEFAULT_ICONS) {
        this.icons = icons;
        this.dialog = document.createElement('dialog');
        this.dialog.className = 'icon-picker-dialog';
        this.dialog.innerHTML = `
            <div class="icon-picker-content">
                <div class="icon-picker-grid"></div>
            </div>
        `;

        // Clean up on outside click
        this.dialog.addEventListener('click', (e) => {
            if (e.target === this.dialog) {
                this.close();
            }
        });

        // Clean up on native Escape key
        this.dialog.addEventListener('cancel', (e) => {
            e.preventDefault();
            this.close();
        });
    }

    open(triggerEl, hiddenInput) {
        // Append to DOM only when opening
        document.body.appendChild(this.dialog);

        const grid = this.dialog.querySelector('.icon-picker-grid');
        grid.innerHTML = ''; // Clear just in case

        this.icons.forEach(iconStr => {
            const btn = document.createElement('div');
            btn.className = 'icon-option';
            btn.textContent = iconStr || '\u200B';
            btn.title = iconStr === '' ? '(vacío)' : iconStr;

            btn.onclick = () => {
                if (hiddenInput) hiddenInput.value = iconStr;
                if (triggerEl) triggerEl.querySelector('span:first-child').textContent = iconStr || '';
                this.close();
            };

            grid.appendChild(btn);
        });

        const rect = triggerEl.getBoundingClientRect();
        this.dialog.style.left = (rect.left + window.scrollX) + 'px';
        this.dialog.style.top = (rect.bottom + window.scrollY + 2) + 'px';
        this.dialog.showModal();
    }

    close() {
        this.dialog.close();
        this.dialog.remove(); // Destroys the DOM element and clears closures
    }
}

function initGlobalIconPicker() {
    let dlg = document.getElementById('globalIconPicker');
    if (!dlg) {
        dlg = document.createElement('dialog');
        dlg.id = 'globalIconPicker';
        dlg.className = 'icon-picker-dialog';
        dlg.innerHTML = `
            <div class="icon-picker-content">
                <div class="icon-picker-grid"></div>
            </div>
        `;
        document.body.appendChild(dlg);

        dlg.addEventListener('click', (e) => {
            if (e.target === dlg) {
                dlg.close();
                window._activeIconPickerInput = null;
            }
        });
    }
}

function openIconPicker(triggerEl, hiddenInput, icons = DEFAULT_ICONS) {
    let dlg = document.getElementById('globalIconPicker');
    if(!dlg) {
        initGlobalIconPicker();
        dlg = document.getElementById('globalIconPicker');
    }
    const grid = dlg.querySelector('.icon-picker-grid');

    grid.innerHTML = '';

    icons.forEach(iconStr => {
        const btn = document.createElement('div');
        btn.className = 'icon-option';
        btn.textContent = iconStr || '\u200B';
        btn.title = iconStr === '' ? '(vacío)' : iconStr;
        btn.onclick = () => {
            hiddenInput.value = iconStr;
            triggerEl.querySelector('span:first-child').textContent = iconStr || '';
            dlg.close();
        };
        grid.appendChild(btn);
    });

    const rect = triggerEl.getBoundingClientRect();
    dlg.style.left = (rect.left + window.scrollX) + 'px';
    dlg.style.top = (rect.bottom + window.scrollY + 2) + 'px';
    dlg.showModal();
}

function openIconPickerOLD(triggerEl, hiddenInput, icons = DEFAULT_ICONS) {
    const dlg = document.getElementById('globalIconPicker');
    const grid = dlg.querySelector('.icon-picker-grid');

    if (!grid.innerHTML) {
        icons.forEach(iconStr => {
            const btn = document.createElement('div');
            btn.className = 'icon-option';
            btn.textContent = iconStr || '\u200B';
            if (iconStr === '') btn.title = '(vacío)';
            btn.onclick = () => {
                hiddenInput.value = iconStr;
                triggerEl.querySelector('span:first-child').textContent = iconStr || '';
                dlg.close();
            };
            grid.appendChild(btn);
        });
    }

    const rect = triggerEl.getBoundingClientRect();
    dlg.style.left = (rect.left + window.scrollX) + 'px';
    dlg.style.top = (rect.bottom + window.scrollY + 2) + 'px';
    dlg.showModal();
}

if(document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', initGlobalIconPicker);
else
    initGlobalIconPicker();

/* ============================================================
   DIALOG UTILITIES
   ============================================================ */
var DialogUtil = {
    dragStart(e, dlg) {
        const header = e.target.closest('.ontoy-dlg-header, .ontoy-dlg-header');
        if (!header || e.target.closest('button, input, select')) return;
        e.preventDefault();
        const rect = dlg.getBoundingClientRect();
        const offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };

        const move = (m) => {
            const x = Math.max(0, Math.min(m.clientX - offset.x, window.innerWidth - rect.width));
            const y = Math.max(0, Math.min(m.clientY - offset.y, window.innerHeight - rect.height));
            dlg.style.left = (x + rect.width / 2) + "px";
            dlg.style.top = (y + rect.height / 2) + "px";
        };

        const stop = () => {
            document.removeEventListener('pointermove', move);
            document.removeEventListener('pointerup', stop);
        };

        document.addEventListener('pointermove', move);
        document.addEventListener('pointerup', stop);
        dlg.addEventListener('close', stop);
    },

    async alert(message, title = "Información", type = "info") {
        const icons = { info: "ℹ️", warning: "⚠️", error: "❌", success: "✅" };
        const dlg = document.createElement('dialog');
        dlg.className = 'ontoy-dlg';
        dlg.innerHTML = `
            <header class="ontoy-dlg-header">
                <b>${title}</b>
                <button type="button" class="ontoy-dlg-close" aria-label="Cerrar">&times;</button>
            </header>
            <div class="ontoy-dlg-content" style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">${icons[type] || icons.info}</div>
                <div>${message}</div>
            </div>
            <footer class="ontoy-dlg-footer">
                <button type="button" class="ontoy-dlg-btn ontoy-dlg-btn-primary btn-ok">Aceptar</button>
            </footer>
        `;
        document.body.appendChild(dlg);

        return new Promise(resolve => {
            const cleanup = () => {
                dlg.removeEventListener('pointerdown', handler);
                dlg.close();
                dlg.remove();
                resolve();
            };
            const handler = (e) => this.dragStart(e, dlg);
            dlg.addEventListener('pointerdown', handler);
            dlg.querySelector('.btn-ok').onclick = cleanup;
            dlg.querySelector('.ontoy-dlg-close').onclick = cleanup;
            dlg.addEventListener('cancel', (e) => { e.preventDefault(); cleanup(); });
            dlg.showModal();
        });
    },

    async confirm(message, title = "Confirmar", type = "question") {
        const icons = { question: "❓", warning: "⚠️", info: "ℹ️" };
        const dlg = document.createElement('dialog');
        dlg.className = 'ontoy-dlg';
        dlg.innerHTML = `
            <header class="ontoy-dlg-header">
                <b>${title}</b>
                <button type="button" class="ontoy-dlg-close" aria-label="Cerrar">&times;</button>
            </header>
            <div class="ontoy-dlg-content" style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">${icons[type] || icons.question}</div>
                <div>${message}</div>
            </div>
            <footer class="ontoy-dlg-footer">
                <button type="button" class="ontoy-dlg-btn ontoy-dlg-btn-secondary btn-no">Cancelar</button>
                <button type="button" class="ontoy-dlg-btn ontoy-dlg-btn-primary btn-yes">Aceptar</button>
            </footer>
        `;
        document.body.appendChild(dlg);

        return new Promise((resolve) => {
            const cleanup = (result) => {
                dlg.removeEventListener('pointerdown', handler);
                dlg.close();
                dlg.remove();
                resolve(result);
            };
            const handler = (e) => this.dragStart(e, dlg);
            dlg.addEventListener('pointerdown', handler);
            dlg.querySelector('.btn-yes').onclick = () => cleanup(true);
            dlg.querySelector('.btn-no').onclick = () => cleanup(false);
            dlg.querySelector('.ontoy-dlg-close').onclick = () => cleanup(false);
            dlg.addEventListener('cancel', (e) => { e.preventDefault(); cleanup(false); });
            dlg.showModal();
        });
    }
};

/* ============================================================
   FAVORITES MENU CLASS
   ============================================================ */
class FavoritesMenu {
    MNU_SYS_LINKS = [
        {name: '🏠 Inicio', url: '/'},
        {name: '⏻ &nbsp;Salir', url: '/logout.php'}
    ];

    MNU_ICONS = DEFAULT_ICONS;
    apiUrl = 'api/favmenu.php';
    _is_dlgOpen = false;

    constructor(apiUrl = "", menuButton = "favMenuTrigger", menuDialog = "favMenuDialog") {
        if(apiUrl.length)
            this.apiUrl = apiUrl;
        this.btn = document.getElementById(menuButton);
        this.drop = document.getElementById(menuDialog);


        this.links = [];
        this.focusedIndex = -1;
        this.init();
    }

    async init() {
        this.btn.onclick = (e) => {
            e.stopPropagation();
            this.toggle();
        };

        /*
        document.addEventListener('click', function() {

            if(this.drop.open && !this._is_dlgOpen) {
                this.drop.close();
            }
        }.bind(this));
        */
        this.handleOutsideClick = this.handleOutsideClick.bind(this);

        this.drop.addEventListener('cancel', () => {
            this.drop.close();
        });
        this.drop.addEventListener('keydown', (e) => this.handleKeyNav(e));
        document.getElementById('favmnu-add-btn').onclick = () => {
            this.addDialog();
        };
        document.getElementById('favmnu-manage-btn').onclick = () => {
            this.manageDialog();
        };
        document.getElementById('favMenuClose').onclick = () => this.closeMenu();
        this.links = await this.list();
        this.render();
    }

    focusItem(index) {
        const total = this.menuItems.length;
        if(total === 0) return;

        // Normalize index
        if(index < 0) index = total - 1;
        else if(index >= total) index = 0;

        this.focusedIndex = index;
        const target = this.menuItems[index];
        if(target) {
            target.focus();
        }
    }

    handleKeyNav(e) {
        const key = e.key;
        const total = this.menuItems.length;

        if(total === 0) return;

        if(['ArrowUp', 'ArrowDown', 'Enter', ' ', 'Escape'].includes(key)) {
            e.preventDefault();
        }

        if(key === 'ArrowDown') {
            this.focusItem(this.focusedIndex + 1);
        } else if(key === 'ArrowUp') {
            this.focusItem(this.focusedIndex - 1);
        } else if(key === 'Enter' || key === ' ') {
            const currentItem = this.menuItems[this.focusedIndex];
            if(!currentItem) return;

            // If it's a link (<a>), navigate
            if(currentItem.tagName === 'A' && currentItem.href) {
                window.location.href = currentItem.href;
            }
            // If it's a button, click it
            else if(currentItem.tagName === 'BUTTON') {
                currentItem.click();
            }
        } else if(key === 'Escape') {
            this.closeMenu();
            this.btn.focus();
        }
        // Tab is intentionally NOT handled — let browser manage natural tab flow
    }

    toggle() {
        if (this.drop.open) {
            this.closeMenu();
        } else {
            const rect = this.btn.getBoundingClientRect();
            this.drop.style.top = (rect.bottom + 5) + "px";
            this.drop.style.left = Math.max(10, rect.right - 220) + "px";
            this.drop.showModal();

            // Add listeners
            document.addEventListener('mousedown', this.handleOutsideClick);
            document.addEventListener('touchstart', this.handleOutsideClick);
        }
    }

    closeMenu() {
        this.drop.close();
        this.focusedIndex = -1;
        // Remove listeners
        document.removeEventListener('mousedown', this.handleOutsideClick);
        document.removeEventListener('touchstart', this.handleOutsideClick);
    }

    handleOutsideClick(e) {
        if (!this.drop || !this.drop.open) return;

        // 1. Check if clicking the trigger button (let toggle() handle that)
        if (this.btn.contains(e.target)) return;

        // 2. Check if click is inside any other open dialog (like Add or Manage)
        const otherOpenDialogs = Array.from(document.querySelectorAll('dialog[open]'))
            .filter(dlg => dlg !== this.drop);
        const isInsideOtherDialog = otherOpenDialogs.some(dlg => dlg.contains(e.target));
        if (isInsideOtherDialog) return;

        // 3. Check if click is inside the favorites menu itself
        const rect = this.drop.getBoundingClientRect();
        const isInMenu = (
            e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom
        );

        if (!isInMenu) {
            this.closeMenu();
        }
    }

    render() {
        const userBox = document.getElementById('favmnu-user-list');
        userBox.innerHTML = this.links.map(l => `
                <li class="favmnu-item">
                    <a href="${l.url}" style="color:${l.color}; ${l.bold == '1' ? 'font-weight:bold' : ''}">
                        <span style="margin-right:8px">${l.icon || ''}</span> ${this.htmlentites(l.name)}
                    </a>
                </li>`).join('');

        document.getElementById('favmnu-sys-list').innerHTML = this.MNU_SYS_LINKS.map(s => `
                <li class="favmnu-item"><a href="${this.quotes(s.url)}">${s.name}</a></li>
                `).join('');

        // Rebuild menu item list for keyboard nav
        const linkElements = Array.from(this.drop.querySelectorAll('.favmnu-item a'));
        const actionButtons = [
            document.getElementById('favmnu-add-btn'),
           // document.getElementById('favmnu-index-btn'),
            document.getElementById('favmnu-manage-btn')
        ];

        this.menuItems = [...linkElements, ...actionButtons];
        this.menuItems.forEach((item) => {
            // Optional: ensure they're not tabbable by default (we control focus)
            item.tabIndex = -1;
        });
    }

    quotes(s) {
        if(typeof s === 'undefined' || s === null)
            return "";
        return s.toString().replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    htmlentites(s) {
        if(typeof s === 'undefined' || s === null)
            return "";
        return s.toString().replace(/"/g, "&quot;").replace(/'/g, "&#039;")
            .replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    addDialog() {
        this._is_dlgOpen = true;
        let me = this;
        const dlg = document.createElement('dialog');
        dlg.className = "ontoy-dlg";
        dlg.innerHTML = `
    <header class="ontoy-dlg-header" style="background-color: lightgray">
      <b>📌 Agregar Página</b>
      <button class="ontoy-dlg-close">&times;</button>
    </header>
    <div class="ontoy-dlg-content" style="min-width:200px;">
      <div>
        <label for="mnu_add_name">Nombre</label><br>
        <input type="text" id="mnu_add_name" value="${document.title}" style="min-width:240px; width:95%">
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:2em;">
        <div>
            <input type="hidden" id="mnu_add_icon" value="">
            <label for="mnu_add_icon_trigger">Icono</label><br><div id="mnu_add_icon_trigger" class="icon-select-trigger"><span></span><span class="icon-caret">▼</span></div>
        </div>
        <div>
          <label for="mnu_add_color">Color</label><br>
          <input type="color" id="mnu_add_color" value="#1a1a2e" class="ontoy-dlg-input-color">
        </div>
        <div>&nbsp;<br><button type="button" id="mnu_add_bold" class="ontoy-dlg-btn">B</button></div>
      </div>
    </div>
    <footer class="ontoy-dlg-footer">
      <button id="mnu_add_cancel">Cancelar</button>
      <button id="mnu_add_save">Guardar</button>
    </footer>`;

        document.body.appendChild(dlg);

        // Get elements
        const hiddenInput = dlg.querySelector('#mnu_add_icon');
        const trigger = dlg.querySelector('#mnu_add_icon_trigger');

        // Set initial display (empty)
        trigger.querySelector('span:first-child').textContent = '';

        // Open picker on trigger click
        trigger.onclick = (e) => {
            e.stopPropagation();
            openIconPicker(trigger, hiddenInput, this.MNU_ICONS);
        };

        // Optional: label click
        dlg.querySelector('label[for="mnu_add_icon_trigger"]').onclick = (e) => {
            e.preventDefault();
            trigger.click();
        };

        const label = dlg.querySelector('label[for="mnu_add_icon_trigger"]');
        if (label && trigger) {
            label.style.cursor = 'pointer';
            label.addEventListener('click', (e) => {
                e.preventDefault();
                trigger.click();
            });
        }

        const boldBtn = dlg.querySelector('#mnu_add_bold');
        boldBtn.onclick = () => boldBtn.classList.toggle('ontoy-dlg-bold-active');

        dlg.querySelector('#mnu_add_save').onclick = async () => {
            const nl = await this.create({
                name: dlg.querySelector('#mnu_add_name').value,
                icon: hiddenInput.value, // ← use the variable
                color: dlg.querySelector('#mnu_add_color').value,
                bold: boldBtn.classList.contains('ontoy-dlg-bold-active') ? '1' : '0',
                url: window.location.pathname + window.location.search
            });
            this.links.push(nl);
            this.render();
            dlg.remove();
            me._is_dlgOpen = false;
        };

        dlg.addEventListener('cancel', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeHandler();
        });
        const closeHandler = () => {
            me._is_dlgOpen = false;
            dlg.close();
            dlg.remove();
        };
        dlg.querySelector('#mnu_add_cancel').onclick = closeHandler;
        dlg.querySelector('.ontoy-dlg-close').onclick = closeHandler;

        dlg.addEventListener('pointerdown', (e) => DialogUtil.dragStart(e, dlg));
        dlg.addEventListener('click', e => e.stopPropagation());
        dlg.showModal();
    }

    manageDialog() {
        this._is_dlgOpen = true;
        let me = this;
        const dlg = document.createElement('dialog');
        dlg.className = 'ontoy-dlg';
        dlg.innerHTML = `
    <header class="ontoy-dlg-header" style="background-color: lightgray"><b>📝 Editar Favoritos</b><button type="button" class="ontoy-dlg-close">&times;</button></header>
    <div class="ontoy-dlg-content"><div id="dlg_sort_list" class="ontoy-dlg-sortable-list"></div></div>
    <footer class="ontoy-dlg-footer">
      <button type="button" id="mng_close">Cerrar</button>
      <button type="button" id="mng_save" style="background:#2563eb;color:white;border:none;">Guardar Todo</button>
    </footer>`;
        document.body.appendChild(dlg);
        const list = dlg.querySelector('#dlg_sort_list');

        const load = () => {
            list.innerHTML = this.links.map(l => {
                const iconInputId = `icon_input_${l.id}`;
                return `
        <div class="ontoy-dlg-sort-row" data-id="${l.id}">
          <div class="ontoy-dlg-sort-handle">☰</div>
          <input type="text" value="${this.htmlentites(l.name)}" class="ontoy-dlg-col-name">

          <input type="hidden"
                 class="ontoy-dlg-col-icon"
                 id="${iconInputId}"
                 value="${this.quotes(l.icon || '')}">

          <div class="icon-select-trigger" data-input-id="${iconInputId}">
            <span>${l.icon || ''}</span>
            <span class="icon-caret">▼</span>
          </div>

          <input type="color" style="cursor:pointer;" value="${l.color}" class="ontoy-dlg-col-color">
          <button type="button" class="ontoy-dlg-btn ontoy-dlg-bold-toggle ${l.bold == '1' ? 'ontoy-dlg-bold-active' : ''}">B</button>
          <button type="button" class="ontoy-dlg-btn ontoy-dlg-btn-del">🗑</button>
        </div>`;
            }).join('');

            list.querySelectorAll('.icon-select-trigger').forEach(trigger => {
                const inputId = trigger.getAttribute('data-input-id');
                const hiddenInput = dlg.querySelector(`#${inputId}`);
                if (!hiddenInput) return;

                trigger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openIconPicker(trigger, hiddenInput, this.MNU_ICONS);
                });
            });
            /* new iconpciker
            list.querySelectorAll('.icon-select-trigger').forEach(trigger => {
    const inputId = trigger.getAttribute('data-input-id');
    const hiddenInput = dlg.querySelector(`#${inputId}`);
    if (!hiddenInput) return;

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        // Create a fresh, isolated instance of the picker
        const picker = new IconPicker(this.MNU_ICONS);
        picker.open(trigger, hiddenInput);
    });
});
             */
        };
        load();

        if (typeof Sortable !== 'undefined') {
            new Sortable(list, { handle: '.ontoy-dlg-sort-handle', animation: 150 });
        } else {
            console.error("SortableJS not loaded");
        }

        list.addEventListener('click', async (e) => {
            const target = e.target instanceof Element ? e.target : e.target.parentElement;
            if (!target) return;

            const boldBtn = target.closest('.ontoy-dlg-bold-toggle');
            if (boldBtn && list.contains(boldBtn)) {
                boldBtn.classList.toggle('ontoy-dlg-bold-active');
                return;
            }

            const delBtn = target.closest('.ontoy-dlg-btn-del');
            if (delBtn && list.contains(delBtn)) {
                const row = delBtn.closest('.ontoy-dlg-sort-row');
                if (!row) return;

                const nameInput = row.querySelector('.ontoy-dlg-col-name');
                const name = nameInput ? nameInput.value : '';
                if (await DialogUtil.confirm(`¿Seguro de borrar la opción del menu "${name}"?`)) {
                    row.remove();
                }
            }
        });

        dlg.querySelector('#mng_save').onclick = async () => {
            const newData = Array.from(list.querySelectorAll('.ontoy-dlg-sort-row')).map((row, i) => {
                const nameInput = row.querySelector('.ontoy-dlg-col-name');
                const iconInput = row.querySelector('.ontoy-dlg-col-icon');
                const colorInput = row.querySelector('.ontoy-dlg-col-color');
                const boldBtn = row.querySelector('.ontoy-dlg-bold-toggle');
                const original = this.links.find(x => x.id == row.dataset.id);

                return {
                    id: row.dataset.id,
                    orden: i,
                    name: nameInput ? nameInput.value : '',
                    icon: iconInput ? iconInput.value : '',
                    color: colorInput ? colorInput.value : '#1a1a2e',
                    bold: boldBtn && boldBtn.classList.contains('ontoy-dlg-bold-active') ? '1' : '0',
                    url: original ? original.url : ''
                };
            });

            this.links = await this.updateAll(newData);
            this.render();
            dlg.remove();
            me._is_dlgOpen = false;
        };
        dlg.addEventListener('cancel', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeHandler();
        });
        const closeHandler = () => {
            me._is_dlgOpen = false;
            dlg.close();
            dlg.remove();
        };
        dlg.querySelector('#mng_close').onclick = closeHandler;
        dlg.querySelector('.ontoy-dlg-close').onclick = closeHandler;

        dlg.addEventListener('pointerdown', (e) => DialogUtil.dragStart(e, dlg));
        dlg.addEventListener('click', e => e.stopPropagation());
        dlg.showModal();
    }

    manageDialogOLD() {
        this._is_dlgOpen = true;
        let me = this;
        const dlg = document.createElement('dialog');
        dlg.className = 'ontoy-dlg';
        dlg.innerHTML = `
    <header class="ontoy-dlg-header" style="background-color: lightgray"><b>📝 Editar Favoritos</b><button class="ontoy-dlg-close">&times;</button></header>
    <div class="ontoy-dlg-content"><div id="dlg_sort_list" class="ontoy-dlg-sortable-list"></div></div>
    <footer class="ontoy-dlg-footer">
      <button id="mng_close">Cerrar</button>
      <button id="mng_save" style="background:#2563eb;color:white;border:none;">Guardar Todo</button>
    </footer>`;
        document.body.appendChild(dlg);
        const list = dlg.querySelector('#dlg_sort_list');

        const load = () => {
            list.innerHTML = this.links.map(l => {
                // Generate a stable ID for the hidden input (optional, but clean)
                const iconInputId = `icon_input_${l.id}`;
                return `
        <div class="ontoy-dlg-sort-row" data-id="${l.id}">
          <div class="ontoy-dlg-sort-handle">☰</div>
          <input type="text" value="${this.htmlentites(l.name)}" class="ontoy-dlg-col-name">
          
          <!-- ✅ Hidden input with SAME CLASS as old <select> -->
          <input type="hidden" 
                 class="ontoy-dlg-col-icon" 
                 id="${iconInputId}" 
                 value="${this.quotes(l.icon || '')}">
          
          <!-- Visual trigger -->
          <div class="icon-select-trigger" data-input-id="${iconInputId}">
            <span>${l.icon || ''}</span>
            <span class="icon-caret">▼</span>
          </div>
          
          <input type="color" style="cursor:pointer;" value="${l.color}" class="ontoy-dlg-col-color">
          <button class="ontoy-dlg-btn ontoy-dlg-bold-toggle ${l.bold == '1' ? 'ontoy-dlg-bold-active' : ''}">B</button>
          <button class="ontoy-dlg-btn ontoy-dlg-btn-del">🗑</button>
        </div>`;
            }).join('');
        };
        load();

        // Initialize icon pickers for each row
        list.querySelectorAll('.icon-select-trigger').forEach(trigger => {
            const inputId = trigger.getAttribute('data-input-id');
            const hiddenInput = dlg.querySelector(`#${inputId}`);

            // Open global picker
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();

                // Position and open global picker
                const rect = trigger.getBoundingClientRect();
                const picker = document.getElementById('globalIconPicker');
                const grid = picker.querySelector('.icon-picker-grid');

                // Store reference to target input
                window._activeIconPickerInput = hiddenInput;
                window._activeIconPickerTrigger = trigger;

                // Build grid
                grid.innerHTML = '';
                this.MNU_ICONS.forEach(iconStr => {
                    const btn = document.createElement('div');
                    btn.className = 'icon-option';
                    btn.textContent = iconStr || '\u200B';
                    if (iconStr === '') btn.title = '(empty)';
                    btn.addEventListener('click', () => {
                        const icon = iconStr;
                        hiddenInput.value = icon; // update hidden input
                        trigger.querySelector('span:first-child').textContent = icon || '';
                        picker.close();
                        window._activeIconPickerInput = null;
                        window._activeIconPickerTrigger = null;
                    });
                    grid.appendChild(btn);
                });

                // Position
                picker.style.left = (rect.left + window.scrollX) + 'px';
                picker.style.top = (rect.bottom + window.scrollY + 2) + 'px';
                picker.showModal();
            });
        });


        if (typeof Sortable !== 'undefined') {
            new Sortable(list, {handle: '.ontoy-dlg-sort-handle', animation: 150});
        } else {
            console.error("SortableJS not loaded");
        }
        list.onclick = async(e) => {
            const row = e.target.closest('.ontoy-dlg-sort-row');
            if(e.target.classList.contains('ontoy-dlg-bold-toggle')) e.target.classList.toggle('ontoy-dlg-bold-active');
            if(e.target.classList.contains('ontoy-dlg-btn-del')) {
                const name = row.querySelector('.ontoy-dlg-col-name').value;
                if(await DialogUtil.confirm(`¿Seguro de borrar la opción del menu "${name}"?`)) row.remove();
            }
        };

        dlg.querySelector('#mng_save').onclick = async() => {
            // ✅ This line stays EXACTLY THE SAME!
            const newData = Array.from(list.children).map((row, i) => ({
                id: row.dataset.id,
                orden: i,
                name: row.querySelector('.ontoy-dlg-col-name').value,
                icon: row.querySelector('.ontoy-dlg-col-icon').value, // ← still works!
                color: row.querySelector('.ontoy-dlg-col-color').value,
                bold: row.querySelector('.ontoy-dlg-bold-toggle').classList.contains('ontoy-dlg-bold-active') ? '1' : '0',
                url: this.links.find(x => x.id == row.dataset.id).url
            }));
            this.links = await this.updateAll(newData);
            this.render();
            dlg.remove();
            me._is_dlgOpen = false;
        };

        const closeHandler = () => {
            me._is_dlgOpen = false;
            dlg.remove();
        };
        dlg.querySelector('#mng_close').onclick = closeHandler;
        dlg.querySelector('.ontoy-dlg-close').onclick = closeHandler;

        dlg.addEventListener('pointerdown', (e) => DialogUtil.dragStart(e, dlg));
        dlg.addEventListener('click', e => e.stopPropagation());
        dlg.showModal();
    }

    /**
     *
     * { "accion": "list" } returns:
     *   {"success":true,"data":[{ "id":101,"name":"Dashboard","url":"/dash","icon":"📊","color":"#1a1a2e","bold":1},...]}
     *
     * {"accion": 'update_all', "payload":[{id:int,name:string,url:string,icon:string?,color:string?,bold:'1'/'0',orden:int},...]}
     *    returns: {"success":true,"data":[{ "id":101,"name":"Dashboard","url":"/dash","icon":"📊","color":"#1a1a2e","bold":1},...]}
     *
     * {"accion": 'create', "payload":{id:int,name:string,url:string,icon:string?,color:string?,bold:'1'/'0'}}
     *    returns: returns: {"success":true,"data":{ "id":101,"name":"Dashboard","url":"/dash","icon":"📊","color":"#1a1a2e","bold":1}}
     *
     *  Any Error return:
     * { "success": false, "message": "No se pudo guardar el enlace. Intente de nuevo." }
     *
     * @param accion
     * @param payload
     * @returns {Promise<*>}
     * @private
     */
    async _call(accion, payload = {}) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({accion, ...payload})
            });
            if (!response.ok)
                throw new Error(`HTTP Error ${response.status}`);
            const result = await response.json();
            if(!result.success) {
                DialogUti.alert(result.message || 'Error al guardar el menú.', 'Error', 'error');
                return [];
            }
            return result.data;
        } catch(er) {
            DialogUtil.alert(`Fallo de conexión: ${err.message}`, 'Error de Red/Server', 'error');
            return [];
        }
    }

    async list() {
        return await this._call('list');
    }

    async create(link) {
        const payload = {
            name: link.name,
            url: link.url,
            icon: link.icon || null,
            color: link.color || null,
            bold: link.bold
        };
        return await this._call('create', payload);
    }

    async updateAll(items) {
        const normalized = items.map(item => ({
            id: item.id,
            name: item.name,
            url: item.url,
            icon: item.icon || null,
            color: item.color || null,
            bold: item.bold,
            orden: item.orden
        }));
        return await this._call('update_all', {items: normalized});
    }

}

/* ============================================================
   MAIN HIERARCHICAL MENU CLASS
   ============================================================ */
class MainMenu {
    constructor(options = {}) {
        this.trigger = document.getElementById(options.triggerId || 'mainMenuTrigger');
        if(!this.trigger)
            return;
        this.dialog = document.getElementById(options.dialogId || 'mainMenuDialog');
        this.closeBtn = document.getElementById(options.closeId || 'mainMenuClose');
        this.listContainer = document.getElementById(options.listId || 'mainmnu-list');

        this.menuData = options.menuData || this.getDefaultMenu();
        this.focusedIndex = -1;
        this.init();
    }

    getDefaultMenu() {
        return [
        ];
    }

    init() {
        this.lastToggleTime = 0;
        this.toggleLockMs = 250;

        this.handleOutsideClick = this.handleOutsideClick.bind(this)

        this.trigger.onclick = (e) => {
            e.stopPropagation();
            this.toggle();
        };

        this.closeBtn.onclick = () => this.close();



        this.dialog.addEventListener('cancel', () => this.close());
        this.dialog.addEventListener('keydown', (e) => this.handleKeyNav(e));

        this.render();
    }

    handleOutsideClick(e) {
        if (!this.dialog.open) return;
        if (this.trigger.contains(e.target)) return;

        const rect = this.dialog.getBoundingClientRect();
        const isInDialog = (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
        );

        if (!isInDialog) {
            this.close();
        }

        const isOutside = !this.dialog.contains(e.target) && !this.trigger.contains(e.target);
        if (isOutside && this.dialog.open) {
            this.close();
        }
    }
    toggle() {
        const now = Date.now();
        if (now - this.lastToggleTime < this.toggleLockMs) return;
        this.lastToggleTime = now;
        if (this.dialog.open) {
            this.close();
        } else {
            const rect = this.trigger.getBoundingClientRect();
            this.dialog.style.top = (rect.bottom + 5) + 'px';
            this.dialog.style.left = Math.max(10, rect.right - 280) + 'px';
            this.dialog.showModal();
            this.focusedIndex = -1;
            document.removeEventListener('mousedown', this.handleOutsideClick);
            document.addEventListener('mousedown', this.handleOutsideClick);
            document.removeEventListener('touchstart', this.handleOutsideClick);
            document.addEventListener('touchstart', this.handleOutsideClick);
        }
    }

    close() {
        this.lastToggleTime = Date.now();
        this.dialog.close();
        document.removeEventListener('mousedown', this.handleOutsideClick);
        document.removeEventListener('touchstart', this.handleOutsideClick);
        // Collapse all expanded items when closing
        this.listContainer.querySelectorAll('.mainmnu-item.expanded').forEach(el => {
            el.classList.remove('expanded');
        });
    }
    buildMenuHTML(items) {
        return items.map(item => {
            if (item.type === 'separator') return '<li class="mainmnu-separator"></li>';
            if (item.type === 'section') return `<li class="mainmnu-section-label">${item.label}</li>`;

            const hasChildren = item.children && item.children.length > 0;
            const chevron = hasChildren ? '<span class="mainmnu-chevron">▶</span>' : '';

            // Use <span> for parents, <a> for actual links
            const tagName = hasChildren ? 'span' : 'a';
            const hrefAttr = hasChildren ? '' : `href="${item.url || ''}"`;

            let html = `
            <li class="mainmnu-item" data-id="${item.id || ''}">
                <${tagName} ${hrefAttr} class="mainmnu-link">
                    <div class="mainmnu-link-content">
                        <span class="mainmnu-icon">${item.icon || ''}</span>
                        <span>${item.label}</span>
                    </div>
                    ${chevron}
                </${tagName}>
        `;

            if (hasChildren) {
                html += `<ul class="mainmnu-submenu">${this.buildMenuHTML(item.children)}</ul>`;
            }

            html += '</li>';
            return html;
        }).join('');
    }

    render() {

        this.listContainer.innerHTML = this.buildMenuHTML(this.menuData);

        this.listContainer.querySelectorAll('SPAN.mainmnu-link').forEach(link => {

            link.addEventListener('click', (e) => {
                e.stopPropagation();
                e.stopImmediatePropagation();
                const item = link.closest('.mainmnu-item');
                const hasSubmenu = item.querySelector('.mainmnu-submenu');
                const href = link.getAttribute('href');
                console.log(`Click detected on: ${link.innerText.trim()}, hasSubmenu: ${!!hasSubmenu}=${hasSubmenu}, href: ${href}`);
                if (hasSubmenu) {
                    e.preventDefault();
                    item.classList.toggle('expanded');
                }
            });
        });

        this.updateFocusableItems();
    }

    updateFocusableItems() {
        this.focusableItems = Array.from(this.listContainer.querySelectorAll('.mainmnu-link'));
        this.focusableItems.forEach((item, idx) => {
            item.tabIndex = -1;
            item.dataset.index = idx;
        });
    }

    handleKeyNav(e) {
        const key = e.key;
        if (!['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Enter', 'Escape'].includes(key)) return;

        e.preventDefault();

        if (key === 'Escape') {
            this.close();
            this.trigger.focus();
            return;
        }

        if (key === 'ArrowDown') {
            this.focusItem(this.focusedIndex + 1);
        } else if (key === 'ArrowUp') {
            this.focusItem(this.focusedIndex - 1);
        } else if (key === 'Enter') {
            const current = this.focusableItems[this.focusedIndex];
            if (current) {
                const item = current.closest('.mainmnu-item');
                const hasSubmenu = item.querySelector('.mainmnu-submenu');

                if (hasSubmenu && !item.classList.contains('expanded')) {
                    item.classList.add('expanded');
                    // Move focus to first child
                    const firstChild = item.querySelector('.mainmnu-submenu .mainmnu-link');
                    if (firstChild) {
                        const idx = parseInt(firstChild.dataset.index);
                        this.focusItem(idx);
                    }
                } else if (hasSubmenu && item.classList.contains('expanded')) {
                    current.click();
                } else {
                    current.click();
                }
            }
        } else if (key === 'ArrowRight') {
            const current = this.focusableItems[this.focusedIndex];
            if (current) {
                const item = current.closest('.mainmnu-item');
                const hasSubmenu = item.querySelector('.mainmnu-submenu');
                if (hasSubmenu && !item.classList.contains('expanded')) {
                    item.classList.add('expanded');
                }
            }
        } else if (key === 'ArrowLeft') {
            const current = this.focusableItems[this.focusedIndex];
            if (current) {
                const submenu = current.closest('.mainmnu-submenu');
                if (submenu) {
                    const parentItem = submenu.closest('.mainmnu-item');
                    parentItem.classList.remove('expanded');
                    const parentLink = parentItem.querySelector(':scope > .mainmnu-link');
                    const idx = parseInt(parentLink.dataset.index);
                    this.focusItem(idx);
                }
            }
        }
    }

    focusItem(index) {
        if (!this.focusableItems || this.focusableItems.length === 0) return;

        if (index < 0) index = this.focusableItems.length - 1;
        else if (index >= this.focusableItems.length) index = 0;

        this.focusedIndex = index;
        this.focusableItems[index].focus();

        // Ensure item is visible in scroll view
        this.focusableItems[index].scrollIntoView({ block: 'nearest' });
    }
}

/* ============================================================
   FEATURE BAR
   FEATURE BAR
   ============================================================ */

const FeatureHeader = {

    init(pageConfig) {
        pageConfig = pageConfig || {};

        // Internal helper to render an item (Action or Toolbar item)
        const renderCommand = (container, item) => {
            if (!item) return;

            const isLink = !!item.href;
            const el = document.createElement(isLink ? 'a' : 'button');


            if (item.id) el.id = item.id;
            el.innerHTML = item.label || '';
            if (item.help) el.setAttribute('data-help', item.help);
            if (item.title) el.title = item.title;

            if (isLink) {
                el.className = `as-button ontoy-feature-btn ${item.primary ? 'ontoy-feature-primary' : ''}`;
                el.href = item.href;
                if (item.target) el.target = item.target;
            } else {
                el.className = `ontoy-feature-btn ${item.primary ? 'ontoy-feature-primary' : ''}`;
                el.type = 'button';
                if (typeof item.action === 'function') {
                    el.onclick = (e) => {
                        if (el.disabled) return;
                        el.disabled = true;
                        item.action(e);
                        setTimeout(() => { el.disabled = false; }, 500);
                    };
                }
            }
            container.appendChild(el);
        };

        // Title
        const titleEl = document.getElementById('ontoy-feature-title');
        if (titleEl) titleEl.textContent = pageConfig.title || '';

// 2. Actions
        const actionContainer = document.getElementById('ontoy-action-container');
        if (actionContainer) {
            actionContainer.innerHTML = '';
            (pageConfig.actions || []).forEach(act => renderCommand(actionContainer, act));
        }

        // 3. Toolbar (Resolved from defaults or custom objects)
        const toolbarDefaults = {
            copy: {
                label: '<i class="fa-solid fa-copy"></i>',
                help: "Copiar al portapapeles",
                title: "Copiar",
                action: (e) => { console.log("Copy triggered"); }
            },
            csv: {
                label: '<i class="fa-solid fa-file-csv"></i>',
                help: "Exportar a CSV",
                title: "CSV",
                action: (e) => { console.log("CSV triggered"); }
            },
            print: {
                label: '<i class="fa-solid fa-print"></i>',
                help: "Imprimir documento",
                title: "Imprimir",
                action: (e) => window.print()
            }
        };
        const toolbarContainer = document.getElementById('ontoy-toolbar-container');
        if (toolbarContainer) {
            toolbarContainer.innerHTML = '';
            (pageConfig.toolbar || []).forEach(tbItem => {
                // If it's a string like "copy", get from defaults; else use the object
                const config = (typeof tbItem === 'string') ? toolbarDefaults[tbItem] : tbItem;
                renderCommand(toolbarContainer, config);
            });
        }

        // 4. Breadcrumbs
        const bcContainer = document.getElementById('ontoy-breadcrumb-container');
        if (bcContainer) {
            bcContainer.innerHTML = '';
            const breadcrumbs = pageConfig.breadcrumbs || [];
            breadcrumbs.forEach((bc, i) => {
                if (!bc) return;
                const el = document.createElement(bc.url ? 'a' : 'span');
                if (bc.url) el.href = bc.url;
                if (bc.help) el.setAttribute('data-help', bc.help);
                el.className = `ontoy-bc-item ${!bc.url ? 'ontoy-current' : ''}`;
                el.textContent = bc.label || '';
                bcContainer.appendChild(el);
                if (i < breadcrumbs.length - 1) {
                    bcContainer.append(' › ');
                }
            });
        }

        const helpDisplay = document.getElementById('ontoy-help-display');
        const headerEl = document.querySelector('.ontoy-feature-header');
        const defaultHelp = pageConfig.help || '...';

        if (helpDisplay && headerEl) {
            helpDisplay.textContent = defaultHelp;
            // Store default help in a data attribute for the named function to access
            headerEl.dataset.defaultHelp = defaultHelp;

            // 6. Manage Event Listeners (Remove then Add)
            headerEl.removeEventListener('mouseover', FeatureHeader._helpMouseOver);
            headerEl.removeEventListener('mouseout', FeatureHeader._helpMouseOut);

            headerEl.addEventListener('mouseover', FeatureHeader._helpMouseOver);
            headerEl.addEventListener('mouseout', FeatureHeader._helpMouseOut);
        }
    },

    _helpMouseOver(e) {
        const helpDisplay = document.getElementById('ontoy-help-display');
        const target = e.target.closest('[data-help]');
        if (target && helpDisplay) {
            helpDisplay.textContent = target.getAttribute('data-help');
        }
    },
    
    _helpMouseOut(e) {
        const helpDisplay = document.getElementById('ontoy-help-display');
        // We retrieve the default help text stored on the container
        const headerEl = document.querySelector('.ontoy-feature-header');
        if(helpDisplay && headerEl) {
            helpDisplay.textContent = headerEl.dataset.defaultHelp || '...';
        }
    }
}
