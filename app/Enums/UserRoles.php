<?php

namespace App\Enums;

class UserRoles
{
    const USER_ROLE = 'user';
    const ADMIN_ROLE = 'admin';


    private static $values = null;
    public static function values(): array
    {
        if (is_null(self::$values)) {
            $refl = new \ReflectionClass(UserRoles::class);
            self::$values = $refl->getConstants();
        }
        return self::$values;
    }
}
