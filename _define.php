<?php

/**
 * @brief Lisboa, a theme for Dotclear 2
 *
 * @package Dotclear
 * @subpackage Themes
 *
 * @copyright Olivier Meunier & Association Dotclear
 * @copyright GPL-2.0-only
 */
$this->registerModule(
    'Lisboa',
    'Dotclear 2.34 theme',
    'Dotclear Team',
    '2.1',
    [
        'date'     => '2025-06-27T13:19:41+02.1',
        'requires' => [['core', '2.35']],
        'type'     => 'theme',
        'tplset'   => 'dotty',
        'license'  => 'gpl2',
        'overload' => true,

        'details'    => 'https://open-time.net/?q=lisboa',
        'support'    => 'https://github.com/franck-paul/lisboa',
        'repository' => 'https://raw.githubusercontent.com/franck-paul/lisboa/main/dcstore.xml',
    ]
);
