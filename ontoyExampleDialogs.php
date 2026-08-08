<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diálogos</title>
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.5.0/css/all.css">
    <link rel="stylesheet" href="ontoy.css">
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
    <script src="ontoy.js"></script>

    <style>
        /* Styles for this example page only. Every dialog below is styled by
           ontoy.css (.ontoy-dlg*, .ontoy-input) — nothing is overridden here. */
        .dlgdemo-note {
            display: flex;
            flex-wrap: wrap;
            gap: 6px 16px;
            align-items: center;
            margin: 0 0 16px;
            padding: 10px 12px;
            border: 1px solid var(--ontoy-feature-border);
            border-left: 3px solid var(--ontoy-feature-primary);
            border-radius: 4px;
            background: #f8fafc;
            font-size: 0.82rem;
            color: #475569;
        }
        .dlgdemo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
            gap: 16px;
        }
        .dlgdemo-card {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 14px 16px;
            border: 1px solid var(--ontoy-feature-border);
            border-radius: 6px;
            background: white;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }
        .dlgdemo-card h3 {
            margin: 0;
            font-size: 0.9rem;
            color: #2d3748;
        }
        .dlgdemo-card p {
            margin: 0;
            font-size: 0.82rem;
            line-height: 1.45;
            color: #475569;
        }
        .dlgdemo-row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
            margin-top: auto;
        }
        .dlgdemo-row .ontoy-input { width: auto; flex: 0 1 auto; }
        .dlgdemo-card details { font-size: 0.8rem; color: #475569; }
        .dlgdemo-card summary { cursor: pointer; user-select: none; }
        .dlgdemo-card pre,
        .dlgdemo-log {
            margin: 8px 0 0;
            padding: 10px;
            border-radius: 4px;
            background: #1e293b;
            color: #e2e8f0;
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-size: 0.75rem;
            line-height: 1.5;
            overflow: auto;
        }
        .dlgdemo-log {
            max-height: 220px;
            min-height: 60px;
            white-space: pre-wrap;
            word-break: break-word;
        }
        .dlgdemo-log-head {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            margin: 24px 0 0;
        }
        .dlgdemo-log-head h3 { margin: 0; font-size: 0.9rem; color: #2d3748; }
        .dlgdemo-field { display: flex; flex-direction: column; gap: 4px; }
        .dlgdemo-field label { font-size: 0.8rem; font-weight: 600; color: #475569; }
        .dlgdemo-hint { font-size: 0.75rem; color: #64748b; }
        .dlgdemo-form-row {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .dlgdemo-form-row > * { flex: 1 1 150px; }
        .dlgdemo-check { flex-direction: row; align-items: center; gap: 8px; }
        .dlgdemo-check input { margin: 0; }
        .dlgdemo-check label { font-weight: 400; }
    </style>
</head>
<body>
<div class="ontoy-container">
    <?php include("ontoyTopBar.php"); ?>
    <?php include("ontoyFeatureBar.php"); ?>
    <script>
        FeatureHeader.initOnLoad(() => ({
            title: "Diálogos",
            help: "Ejemplos de diálogos arrastrables y redimensionables de onToy.",
            breadcrumbs: [
                { label: "🏠", url: "ontoyExample.php", help: "Inicio" },
                { label: "Herramientas", url: null, help: "Componentes de la interfaz" },
                { label: "Diálogos", url: null, help: "Muestra como llamar los dialgos" }
            ],
            actions: [
                {
                    label: '<i class="fa-solid fa-plus"></i> Nuevo',
                    id: "btn-new",
                    primary: true,
                    help: "Abrir el formulario en un diálogo",
                    action: runForm
                },
                {
                    label: '<i class="fa-solid fa-pen"></i> Renombrar',
                    id: "btn-rename",
                    help: "Abrir el diálogo de un solo campo",
                    action: runPrompt
                },
                {
                    label: '<i class="fa-solid fa-trash"></i> Eliminar',
                    id: "btn-delete",
                    help: "Abrir el diálogo de confirmación",
                    action: runConfirm
                }
            ],
            toolbar: ["print", "copy"]
        }));
    </script>

    <main class="ontoy-main">


        <section class="dlgdemo-grid">
            <article class="dlgdemo-card">
                <h3>1. Alerta</h3>
                <p>
                    Mensaje informativo con un solo botón <b>Aceptar</b>.
                    <code>DialogUtil.alert()</code> devuelve una promesa que se resuelve
                    al cerrar el diálogo.
                </p>
                <details>
                    <summary>Ver código</summary>
                    <pre>await DialogUtil.alert(
    "Los cambios se guardaron.",
    "Éxito",
    "success" // info | success | warning | error
);</pre>
                </details>
                <div class="dlgdemo-row">
                    <label class="dlgdemo-hint" for="demo-alert-type">Icono</label>
                    <select id="demo-alert-type" class="ontoy-input">
                        <option value="info">info</option>
                        <option value="success" selected>success</option>
                        <option value="warning">warning</option>
                        <option value="error">error</option>
                    </select>
                    <button type="button" id="demo-alert-btn"
                            class="ontoy-dlg-btn ontoy-dlg-btn-primary">Mostrar alerta</button>
                </div>
            </article>

            <article class="dlgdemo-card">
                <h3>2. Confirmación</h3>
                <p>
                    Pregunta con <b>Aceptar</b> / <b>Cancelar</b>.
                    <code>DialogUtil.confirm()</code> resuelve a <code>true</code> o
                    <code>false</code>, así que se puede usar directamente en un <code>if</code>.
                </p>
                <details>
                    <summary>Ver código</summary>
                    <pre>const ok = await DialogUtil.confirm(
    "¿Eliminar este registro?",
    "Confirmar",
    "warning" // question | warning | info
);
if(ok) { /* borrar */ }</pre>
                </details>
                <div class="dlgdemo-row">
                    <label class="dlgdemo-hint" for="demo-confirm-type">Icono</label>
                    <select id="demo-confirm-type" class="ontoy-input">
                        <option value="question">question</option>
                        <option value="warning" selected>warning</option>
                        <option value="info">info</option>
                    </select>
                    <button type="button" id="demo-confirm-btn"
                            class="ontoy-dlg-btn ontoy-dlg-btn-primary">Mostrar confirmación</button>
                </div>
            </article>

            <article class="dlgdemo-card">
                <h3>3. Un campo de entrada</h3>
                <p>
                    Diálogo armado en esta página con el marcado de
                    <code>.ontoy-dlg</code>: un <code>input</code> y botones
                    <b>Aceptar</b> / <b>Cancelar</b>. Resuelve al texto capturado o a
                    <code>null</code> si se cancela.
                </p>
                <details>
                    <summary>Ver código</summary>
                    <pre>const nombre = await demoPrompt({
    title: "Renombrar hoja",
    label: "Nuevo nombre",
    value: document.title,
    required: true
});
if(nombre !== null) { /* usar nombre */ }</pre>
                </details>
                <div class="dlgdemo-row">
                    <button type="button" id="demo-prompt-btn"
                            class="ontoy-dlg-btn ontoy-dlg-btn-primary">Capturar un dato</button>
                </div>
            </article>

            <article class="dlgdemo-card">
                <h3>4. Formulario pequeño</h3>
                <p>
                    Varios campos dentro de <code>.ontoy-dlg-content</code> con
                    validación nativa del navegador. El botón <b>Guardar</b> vive en el
                    pie y se liga al <code>&lt;form&gt;</code> con el atributo
                    <code>form</code>.
                </p>
                <details>
                    <summary>Ver código</summary>
                    <pre>const datos = await demoForm();
if(datos) {
    await DialogUtil.alert(
        `Contacto guardado: ${datos.nombre}`,
        "Guardado", "success"
    );
}</pre>
                </details>
                <div class="dlgdemo-row">
                    <button type="button" id="demo-form-btn"
                            class="ontoy-dlg-btn ontoy-dlg-btn-primary">Nuevo contacto</button>
                </div>
            </article>
        </section>

        <div class="dlgdemo-log-head">
            <h3><i class="fa-solid fa-terminal"></i> Resultado devuelto</h3>
            <button type="button" id="demo-log-clear"
                    class="ontoy-dlg-btn ontoy-dlg-btn-secondary">Borrar consola de resultados</button>
        </div>
        <pre class="dlgdemo-log" id="demo-log">// Abre cualquier diálogo para ver aquí lo que resuelve su promesa.</pre>
    </main>

    <?php include("ontoyFooter.php"); ?>
</div>

<script>
    // (function() {
    let uid = 0;

    // DialogUtil.alert/confirm reciben el mensaje como HTML: escapa lo que venga del usuario.
    const esc = (s) => String(s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    /* ---------- Bitácora de resultados ---------- */
    const logEl = document.getElementById('demo-log');

    function log(label, value) {
        const time = new Date().toLocaleTimeString('es-MX');
        const line = document.createElement('div');
        line.textContent = `[${time}] ${label} → ${JSON.stringify(value)}`;
        if(logEl.dataset.used !== '1') {
            logEl.textContent = '';
            logEl.dataset.used = '1';
        }
        logEl.prepend(line);
    }

    document.getElementById('demo-log-clear').onclick = () => {
        logEl.textContent = '// Abre cualquier diálogo para ver aquí lo que resuelve su promesa.';
        logEl.dataset.used = '0';
    };

    /* ============================================================
       3. DIÁLOGO CON UN CAMPO Y BOTONES ACEPTAR / CANCELAR
       Mismo patrón que DialogUtil.alert/confirm: marcado .ontoy-dlg
       (arrastrable con DialogUtil.dragStart, redimensionable por el
       `resize: both` de ontoy.css) y una promesa como resultado.
       ============================================================ */
    function demoPrompt(options = {}) {
        const {
            title = 'Entrada',
            label = 'Valor',
            value = '',
            placeholder = '',
            help = '',
            type = 'text',
            required = true
        } = options;

        const id = `demo-prompt-input-${++uid}`;
        const dlg = document.createElement('dialog');
        dlg.className = 'ontoy-dlg';
        dlg.innerHTML = `
                    <header class="ontoy-dlg-header">
                        <b>✏️ <span class="dlg-title"></span></b>
                        <button type="button" class="ontoy-dlg-close" aria-label="Cerrar">&times;</button>
                    </header>
                    <div class="ontoy-dlg-content">
                        <div class="dlgdemo-field">
                            <label for="${id}"></label>
                            <input type="${type}" id="${id}" class="ontoy-input">
                        </div>
                        <small class="dlgdemo-hint"></small>
                    </div>
                    <footer class="ontoy-dlg-footer">
                        <button type="button" class="ontoy-dlg-btn ontoy-dlg-btn-secondary btn-cancel">Cancelar</button>
                        <button type="button" class="ontoy-dlg-btn ontoy-dlg-btn-primary btn-ok">Aceptar</button>
                    </footer>`;

        // textContent en lugar de interpolar en el HTML: nada que escapar.
        dlg.querySelector('.dlg-title').textContent = title;
        dlg.querySelector(`label[for="${id}"]`).textContent = label;
        dlg.querySelector('.dlgdemo-hint').textContent = help;
        const input = dlg.querySelector(`#${id}`);
        input.value = value;
        input.placeholder = placeholder;

        document.body.appendChild(dlg);

        return new Promise(resolve => {
            const drag = (e) => DialogUtil.dragStart(e, dlg);
            const finish = (result) => {
                dlg.removeEventListener('pointerdown', drag);
                dlg.close();
                dlg.remove();
                resolve(result);
            };
            const accept = async () => {
                const val = input.value.trim();
                if(required && !val) {
                    await DialogUtil.alert('Captura un valor para continuar.', 'Falta información', 'warning');
                    input.focus();
                    return;
                }
                finish(val);
            };

            dlg.addEventListener('pointerdown', drag);
            dlg.querySelector('.btn-ok').onclick = accept;
            dlg.querySelector('.btn-cancel').onclick = () => finish(null);
            dlg.querySelector('.ontoy-dlg-close').onclick = () => finish(null);
            input.addEventListener('keydown', (e) => {
                if(e.key === 'Enter') {
                    e.preventDefault();
                    accept();
                }
            });
            dlg.addEventListener('cancel', (e) => { e.preventDefault(); finish(null); });

            dlg.showModal();
            input.focus();
            input.select();
        });
    }

    /* ============================================================
       4. FORMULARIO PEQUEÑO EN UN DIÁLOGO
       El <form> vive en el contenido y el botón Guardar en el pie lo
       envía con el atributo form="…", así se aprovecha la validación
       nativa (required, type=email) sin tocar el layout de ontoy.css.
       ============================================================ */
    function demoForm(contact = {}) {
        const fid = `demo-form-${++uid}`;
        const dlg = document.createElement('dialog');
        dlg.className = 'ontoy-dlg';
        dlg.innerHTML = `
                    <header class="ontoy-dlg-header">
                        <b>👤 Nuevo contacto</b>
                        <button type="button" class="ontoy-dlg-close" aria-label="Cerrar">&times;</button>
                    </header>
                    <div class="ontoy-dlg-content">
                        <form id="${fid}" style="display:flex; flex-direction:column; gap:1rem;">
                            <div class="dlgdemo-field">
                                <label for="${fid}-nombre">Nombre <span style="color:#dc2626">*</span></label>
                                <input type="text" id="${fid}-nombre" name="nombre" class="ontoy-input"
                                       required maxlength="80" placeholder="Ana López">
                            </div>
                            <div class="dlgdemo-field">
                                <label for="${fid}-correo">Correo <span style="color:#dc2626">*</span></label>
                                <input type="email" id="${fid}-correo" name="correo" class="ontoy-input"
                                       required placeholder="ana@ejemplo.mx">
                            </div>
                            <div class="dlgdemo-form-row">
                                <div class="dlgdemo-field">
                                    <label for="${fid}-depto">Departamento</label>
                                    <select id="${fid}-depto" name="departamento" class="ontoy-input">
                                        <option value="ventas">Ventas</option>
                                        <option value="compras">Compras</option>
                                        <option value="almacen">Almacén</option>
                                        <option value="sistemas">Sistemas</option>
                                    </select>
                                </div>
                                <div class="dlgdemo-field">
                                    <label for="${fid}-tel">Teléfono</label>
                                    <input type="tel" id="${fid}-tel" name="telefono" class="ontoy-input"
                                           placeholder="55 1234 5678">
                                </div>
                            </div>
                            <div class="dlgdemo-field">
                                <label for="${fid}-notas">Notas</label>
                                <textarea id="${fid}-notas" name="notas" class="ontoy-input" rows="3"
                                          placeholder="Comentarios internos…"></textarea>
                            </div>
                            <div class="dlgdemo-field dlgdemo-check">
                                <input type="checkbox" id="${fid}-activo" name="activo" checked>
                                <label for="${fid}-activo">Contacto activo</label>
                            </div>
                        </form>
                    </div>
                    <footer class="ontoy-dlg-footer">
                        <button type="button" class="ontoy-dlg-btn ontoy-dlg-btn-secondary btn-cancel">Cancelar</button>
                        <button type="submit" form="${fid}" class="ontoy-dlg-btn ontoy-dlg-btn-primary">Guardar</button>
                    </footer>`;

        document.body.appendChild(dlg);

        const form = dlg.querySelector(`#${fid}`);
        // Valores iniciales por propiedad, sin interpolarlos en el HTML.
        Object.entries(contact).forEach(([name, val]) => {
            const field = form.elements[name];
            if(!field) return;
            if(field.type === 'checkbox') field.checked = !!val;
            else field.value = val;
        });

        return new Promise(resolve => {
            const drag = (e) => DialogUtil.dragStart(e, dlg);
            const finish = (result) => {
                dlg.removeEventListener('pointerdown', drag);
                dlg.close();
                dlg.remove();
                resolve(result);
            };

            dlg.addEventListener('pointerdown', drag);
            dlg.querySelector('.btn-cancel').onclick = () => finish(null);
            dlg.querySelector('.ontoy-dlg-close').onclick = () => finish(null);
            dlg.addEventListener('cancel', (e) => { e.preventDefault(); finish(null); });

            form.addEventListener('submit', (e) => {
                e.preventDefault(); // el diálogo se cierra con finish(), no con el envío
                const data = Object.fromEntries(new FormData(form).entries());
                data.activo = form.elements.activo.checked;
                finish(data);
            });

            dlg.showModal();
            form.elements.nombre.focus();
        });
    }

    /* ---------- Demos ---------- */
    async function runAlert() {
        const type = document.getElementById('demo-alert-type').value;
        const messages = {
            info: 'La hoja se actualiza cada 5 minutos.',
            success: 'Los cambios se guardaron correctamente.',
            warning: 'El folio quedó fuera del periodo abierto.',
            error: 'No fue posible conectar con el servidor.'
        };
        const titles = { info: 'Información', success: 'Éxito', warning: 'Atención', error: 'Error' };
        await DialogUtil.alert(messages[type], titles[type], type);
        log(`DialogUtil.alert("${type}")`, undefined);
    }

    async function runConfirm() {
        const type = document.getElementById('demo-confirm-type').value;
        const ok = await DialogUtil.confirm('¿Eliminar el registro seleccionado?', 'Confirmar', type);
        log(`DialogUtil.confirm("${type}")`, ok);
        if(ok) await DialogUtil.alert('Registro eliminado.', 'Listo', 'success');
    }

    async function runPrompt() {
        const nombre = await demoPrompt({
            title: 'Renombrar hoja',
            label: 'Nuevo nombre',
            value: 'La hoja',
            placeholder: 'Escribe el nombre…',
            help: 'Enter acepta, Esc cancela.',
            required: true
        });
        log('demoPrompt()', nombre);
        if(nombre !== null)
            await DialogUtil.alert(`La hoja se llamará <b>${esc(nombre)}</b>.`, 'Renombrada', 'success');
    }



    document.getElementById('demo-alert-btn').onclick = runAlert;
    document.getElementById('demo-confirm-btn').onclick = runConfirm;
    document.getElementById('demo-prompt-btn').onclick = runPrompt;
    document.getElementById('demo-form-btn').onclick = runForm;

    //   })();
    async function runForm() {
        const data = await demoForm();
        log('demoForm()', data);
        if(data)
            await DialogUtil.alert('El contacto se guardó correctamente.', 'Guardado', 'success');
    }
</script>
</body>
</html>