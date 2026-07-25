<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ontoy Example Layout</title>
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.5.0/css/all.css">
    <link rel="stylesheet" href="ontoy.css">
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="ontoy.js"></script>
</head>
<body>
    <div class="ontoy-container">
        <?php include("ontoyTopBar.php"); ?>
        <?php include("ontoyFeatureBar.php"); ?>
        <script>
            (function() {
                function initFeature() {
                    FeatureHeader.init({
                        title: "La hoja",
                        help: "Ayuda de la hoja",
                        breadcrumbs: [
                            { label: "🏠", url: "ontoyExample.php", help: "Inicio" },
                            { label: "Ej. Layout", url: null, help: "Esta hoja" },
                            { label: "Ej. Dialogs", url: "ontoyExampleDialogs.php", help: "Uso de dialogos" },
                        ],
                        actions: [
                            { label: "Nuevo", id: "btn-new", primary: true, help: "Crear nuevo registro" },
                            { label: "Exportar", id: "btn-export", help: "Exportar datos" }
                        ],
                        toolbar: ["copy", "csv", "print"]
                    });
                }
                if(document.readyState === 'loading')
                    document.addEventListener('DOMContentLoaded', initFeature);
                else
                    initFeature();
            })();
        </script>

        <main class="ontoy-main">
            <h2>Contenido de Ejemplo</h2>
        </main>

        <?php include("ontoyFooter.php"); ?>
    </div>
</body>
</html>