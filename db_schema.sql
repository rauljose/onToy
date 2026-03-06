
CREATE TABLE favorite_menu (
    id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id                  VARCHAR(128)                                NOT NULL,
    name                     VARCHAR(64)                                 NOT NULL,
    url                      VARCHAR(1024)                               NOT NULL,
    icon                     VARCHAR(8)                                  NULL,
    color                    CHAR(7)                                     NULL,
    bold                     TINYINT UNSIGNED  DEFAULT '0'               NOT NULL,
    orden                    SMALLINT UNSIGNED DEFAULT '0'               NOT NULL,
    creado_el                DATETIME          DEFAULT CURRENT_TIMESTAMP NULL,
    KEY por_usuario(user_id, orden, name)
);