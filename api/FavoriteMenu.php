<?php
/** @noinspection PhpUnused */

/** @noinspection PhpRedundantOptionalArgumentInspection */

use Iac\inc\sql\IacSqlBuilder;
global $gSoyWorker; $gSoyWorker = true;
require_once('../../inc/config.php');
session_write_close();

class FavoriteMenu extends AjaxHelper {

    public function __construct() {
        if(empty($_REQUEST)) {
            $_REQUEST = json_decode(file_get_contents('php://input'), true);
        }
        parent::__construct();
    }

    protected function puedeHacerAccion(): bool {return true;}

    protected function list() {

        $method = __METHOD__;
        $menuItems = ia_sqlArrayIndx("SELECT /*$method*/ id, name, url, icon, color, bold
          FROM  favorite_menu
          WHERE user_id = " . strit($_SESSION['usuario_id'] ?? '0') . "
          ORDER BY orden, name");
        $this->response = [
          "success" => is_array($menuItems),
            "ok" => true,
            "code" => 200,
          "message" => is_array($menuItems) ? "" : "No pude leer el menu intente mas tarde",
          "data" => $menuItems
        ];
    }

    protected function update_all() {
        $builder = new IacSqlBuilder();
        $ids = [];
        foreach(($_REQUEST['items'] ?? []) as $orden => $item) {
            $ids[] = $item['id'];
            $item['orden'] = $orden;
            $update = $builder->update("favorite_menu", $item, ["user_id" => $_SESSION['usuario_id'], 'id' => $item['id']], comment: __METHOD__);
            ia_query($update);
        }
        if(!empty($ids)) {
            $method = __METHOD__;
            ia_query("DELETE /*$method*/ FROM favorite_menu WHERE user_id=$_SESSION[usuario_id] AND NOT (" . $builder->where(['id' => $ids]) . ")");
        }
        $this->list();
    }

    protected function create() {
        $item['user_id'] = $_SESSION['usuario_id'];
        $input = $_REQUEST ?? [];
        if(empty($input)) {
            $this->response = [
              "success" => false,
              "message" => "No llegaron los datos, intente mas tarde",
            ];
        }
        $item['name'] = strim($input['name'] ?? '');
        $item['url'] = trim($input['url'] ?? '');
        $item['icon'] = !empty($input['icon']) ? trim($input['icon']) : null;
        $item['color'] = !empty($input['color']) ? trim($input['color']) : null;
        $item['bold'] = ($input['bold'] ?? '0') === '1' ? '1' : '0';
        $builder = new IacSqlBuilder();
        $insert = $builder->insert("favorite_menu", $item, comment: __METHOD__);
        $item['id'] = $id = ia_insertIded($insert);
        unset($item['user_id']);
        $this->response = [
          "success" => !empty($id),
          "ok" => true,
          "code" => 200,
          "message" => is_array($id) ? "" : "No pude guardar, intente mas tarde",
          "data" => $item
        ];
    }

}
new FavoriteMenu();
