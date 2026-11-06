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
declare(strict_types=1);

if (isset($this) && is_object($this) && method_exists($this, 'registerModule') && isset($this->id) && is_string($this->id)) {
    $this->registerModule(
        'Lisboa',
        'Dotclear 2.34 theme',
        'Dotclear Team',
        '3.5',
        [
            'date'     => '2026-11-06T10:09:03+0100',
            'requires' => [['core', '2.36']],
            'type'     => 'theme',
            'tplset'   => 'dotty',
            'license'  => 'gpl2',
            'overload' => true,

            'details'    => 'https://open-time.net/?q=lisboa',
            'support'    => 'https://github.com/franck-paul/lisboa',
            'repository' => 'https://raw.githubusercontent.com/franck-paul/lisboa/main/dcstore.xml',
        ]
    );
}
