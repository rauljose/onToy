# onToy

A lightweight PHP + vanilla-JavaScript UI layout kit — no framework, no build step.

## Overview

onToy gives you a ready-made application shell (top bar, navigation, feature header, footer) plus a handful of self-contained JavaScript components you configure with plain data. Drop the files into a PHP project, include the layout, and you have a working interface. The UI ships in Spanish (es-MX).

## Features

- **Template layout** — `ontoy.php` assembles the full page: container, top bar, feature bar, main content, and footer via simple PHP includes.
- **Hierarchical main menu** — collapsible, keyboard-accessible navigation menu built from a JSON data structure, with groups, links, icons, and separators.
- **Favorites menu** — pin the current page, reorder favorites by drag-and-drop, and customize each with an emoji icon, color, and bold styling.
- **Feature header** — per-page header with title, icon, breadcrumbs, action buttons, contextual help text, and a toolbar.
- **Built-in toolbar actions** — one-liner Copy, CSV export, and Print controls you enable per page.
- **Icon picker** — inline emoji picker for choosing favorite/menu icons.
- **Draggable dialogs** — reusable utility to make any dialog movable.
- **Favorites REST API** — PHP backend (`api/favmenu.php`) for listing, creating, and bulk-reordering favorites, backed by a MySQL `favorite_menu` table.
- **Zero dependencies to install** — pulls Font Awesome, SortableJS, and html2canvas from CDNs; no npm or Composer packages required.

## Getting Started

1. Serve the project with PHP (e.g. `php -S localhost:8000`).
2. Open `ontoy.php` in your browser.
3. Create the database table from `db_schema.sql` and point `api/favmenu.php` at your DB to enable persistent favorites (a mock API is included for previewing the UI without a database).

## Usage: Draggable Dialogs

`DialogUtil` (in `ontoy.js`) provides modal dialogs that can be dragged around the screen by their header. Two helpers are ready to use out of the box and return a `Promise`, so you can `await` the user's choice:

```js
// A draggable alert — resolves when the user clicks "Aceptar" or closes it
await DialogUtil.alert("Los cambios se guardaron correctamente.", "Éxito", "success");

// A draggable confirm — resolves to true (Aceptar) or false (Cancelar)
const ok = await DialogUtil.confirm("¿Eliminar este registro?", "Confirmar", "warning");
if (ok) {
    // proceed with deletion
}
```

The third argument sets the icon: `alert` accepts `info`, `success`, `warning`, or `error`; `confirm` accepts `question`, `warning`, or `info`.

To make your own dialog draggable, give it an `.ontoy-dlg-header` and wire its `pointerdown` event to `DialogUtil.dragStart`:

```html
<dialog id="myDialog" class="ontoy-dlg">
    <header class="ontoy-dlg-header">
        <b>Mi Diálogo</b>
        <button type="button" class="ontoy-dlg-close" aria-label="Cerrar">&times;</button>
    </header>
    <div class="ontoy-dlg-content">Contenido personalizado…</div>
</dialog>
```

```js
const dlg = document.getElementById('myDialog');
dlg.addEventListener('pointerdown', (e) => DialogUtil.dragStart(e, dlg));
dlg.querySelector('.ontoy-dlg-close').onclick = () => dlg.close();
dlg.showModal();
```

Dragging is ignored when the pointer starts on a `button`, `input`, or `select`, so controls inside the header stay clickable.

## Project Structure

| File | Purpose |
|------|---------|
| `ontoy.php` | Main page that wires the layout together |
| `ontoy.js` | All front-end components (menus, header, dialogs, icon picker) |
| `ontoy.css` | Styles for the shell and components |
| `ontoyTopBar.php` / `ontoyMenu.php` | Top bar markup and menu configuration |
| `ontoyFeatureBar.php` / `ontoyFooter.php` | Feature header and footer markup |
| `api/favmenu.php` | Favorites API endpoint (+ mock for UI-only preview) |
| `db_schema.sql` | `favorite_menu` table definition |
