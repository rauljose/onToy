<?php
    define("ONTOY_MENU", "ontoyMenu.php");
    define("ONTOY_TOP_BAR", "ontoyTopBar.php");
    define("ONTOY_FEATURE_BAR", "ontoyFeatureBar.php");
    define("ONTOY_FOOTER", "ontoyFooter.php");
?><!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ontoy Layout</title>
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.5.0/css/all.css">
    <link rel="stylesheet" href="ontoy.css">
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="ontoy.js"></script>
    <?php include(ONTOY_MENU); ?>
</head>
<body>
    <div class="ontoy-container">
        <?php include(ONTOY_TOP_BAR); ?>
        <?php include(ONTOY_FEATURE_BAR); ?>

        <main class="ontoy-main">
            <h2>Contenido de Ejemplo</h2>
        </main>

        <?php include(ONTOY_FOOTER); ?>
    </div>
    <script>
        (function() {
            function initFeature() {
                initFeatureHeader({
                    title: "La hoja",
                    help: "Ayuda de la hoja",
                    breadcrumbs: [
                        { label: "🏠", url: "/", help: "Inicio" },
                        { label: "Operaciones", url: "/operations", help: "Módulo operativo" },
                        { label: "La hoja", url: null, help: "Esta hoja" }
                    ],
                    actions: [
                        { label: "Nuevo", id: "btn-new", primary: true, help: "Crear nuevo registro" },
                        { label: "Exportar", id: "btn-export", help: "Exportar datos" }
                    ],
                    toolbar: { buttons: ["copy", "csv", "print"], onClick: "handleExport" }
                });
            }
            if(document.readyState === 'loading')
                document.addEventListener('DOMContentLoaded', initFeatureHeader);
            else
                initFeatureHeader();
        })();
    </script>

</body>
</html>