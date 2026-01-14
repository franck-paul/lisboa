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

namespace Dotclear\Theme\lisboa;

use ArrayObject;
use Dotclear\App;
use Dotclear\Helper\Html\Html;

class FrontendBehaviors
{
    /**
     * @param      ArrayObject<int, string>  $headers  The headers
     */
    public static function urlHandlerServeDocumentHeaders(ArrayObject $headers): string
    {
        if (App::config()->debugMode() || App::config()->devMode()) {
            return '';
        }

        $xcto = 'X-Content-Type-Options: nosniff';
        $headers->append($xcto);

        $rp = 'referrer-policy: no-referrer-when-downgrade';
        $headers->append($rp);

        return '';
    }

    public static function publicHeadContent(): string
    {
        echo
        Html::jsJson('dotclear_lisboa', [
            'show_menu'  => __('Show menu'),
            'hide_menu'  => __('Hide menu'),
            'navigation' => __('Main menu'),
        ]);

        return '';
    }
}
