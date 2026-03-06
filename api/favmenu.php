<?php
/**
 * FavoriteMenuMock.php
 * Temporary mock for UI viewing. No DB or persistence.
 */

header('Content-Type: application/json');

// Get the JSON input from ontoy.js
$input = json_decode(file_get_contents('php://input'), true);
$accion = $input['accion'] ?? '';

// Initial sample data for the UI
$mockData = [
  [
    "id" => 1,
    "name" => "Google",
    "url" => "https://google.com",
    "icon" => "🔍",
    "color" => "#4285F4",
    "bold" => "1",
    "orden" => 0
  ],
  [
    "id" => 2,
    "name" => "onToy Docs",
    "url" => "/docs",
    "icon" => "📄",
    "color" => "#2c3e50",
    "bold" => "0",
    "orden" => 1
  ]
];

$response = [
  "success" => true,
  "ok" => true,
  "code" => 200,
  "message" => "",
  "data" => []
];

switch ($accion) {
    case 'list':
        $response['data'] = $mockData;
        break;

    case 'create':
        // Return the item exactly as sent, but with a mock ID
        $newItem = [
          "id" => rand(100, 999),
          "name" => $input['name'] ?? 'Nuevo Favorito',
          "url" => $input['url'] ?? '#',
          "icon" => $input['icon'] ?? '',
          "color" => $input['color'] ?? '#000000',
          "bold" => $input['bold'] ?? '0',
          "orden" => 99 // Mock order
        ];
        $response['data'] = $newItem;
        break;

    case 'update_all':
        // Simply return the array of items sent by the UI to confirm "save"
        $response['data'] = $input['items'] ?? [];
        break;

    default:
        $response['success'] = false;
        $response['ok'] = false;
        $response['code'] = 400;
        $response['message'] = "Acción no reconocida: " . $accion;
        break;
}

echo json_encode($response);
