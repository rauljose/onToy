<script>
    var mainMenu, favMenu;
    (function() {
        function onToyInitTopBar() {
            // Initialize Main Hierarchical Menu
            mainMenu = new MainMenu({
                menuData: [
                    {
                        id: 'operations',
                        label: 'Operaciones',
                        icon: '⚙️',
                        children: [
                            {id: 'dashboard', label: 'i', icon: '📊', url: '/dashboard'},
                            {id: 'pos', label: 'Punto de Venta', icon: '🧾', url: '/pos'},
                            {id: 'invoices', label: 'Facturación', icon: '📄', url: '/invoices'}
                        ]
                    },
                    {
                        id: 'catalogs',
                        label: 'Catálogos',
                        icon: '📁',
                        children: [
                            {id: 'products', label: 'Productos', icon: '🏷️', url: '/products'},
                            {id: 'customers', label: 'Clientes', icon: '👥', url: '/customers'},
                            {id: 'suppliers', label: 'Proveedores', icon: '🚚', url: '/suppliers'}
                        ]
                    },
                    {
                        id: 'reports',
                        label: 'Reportes',
                        icon: '📈',
                        children: [
                            {id: 'sales-rep', label: 'Ventas', icon: '💰', url: '/reports/sales'},
                            {id: 'inv-rep', label: 'Inventario', icon: '📦', url: '/reports/inventory'},
                            {id: 'fin-rep', label: 'Financieros', icon: '💹', url: '/reports/financial'}
                        ]
                    },
                    {id: 'sep1', type: 'separator'},
                    {id: 'tools', label: 'Herramientas', icon: '🛠️', url: 'tools.html', type: 'link'},
                    {id: 'help', label: 'Ayuda', icon: '❓', url: '/help', type: 'link'}
                ]
            });
            // Initialize favorites menu
            favMenu = new FavoritesMenu({
                apiUrl: 'api/favmenu.php',
                systemLinks: [
                    {name: '🏠 Inicio', url: '/'},
                    {name: '⚙️ Configuración', url: '/settings'},
                    {name: '⏻ Cerrar Sesión', url: '/logout'}
                ]
            });

        }

        if(document.readyState === 'loading')
            document.addEventListener('DOMContentLoaded', onToyInitTopBar);
        else
            onToyInitTopBar();
    })();
</script>

