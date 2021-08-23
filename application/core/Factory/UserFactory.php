<?php

require_once APPPATH.'core/Entity/User.php';

class UserFactory
{
    private static $instance = null;

    /**
     * @return static
     */
    public static function getInstance(): self
    {
        if (empty(static::$instance)) {
            static::$instance = new static();
        }

        return static::$instance;
    }

    public function create(
        $ds1,
        $ds2,
        $ds3,
        $ds4,
        $ds5,
        $ds6,
        $ds7,
        $ds8,
        $ds9,
        $ds10
    ): User {
        $user = new User();
        $user->setDs1($ds1);
        $user->setDs2($ds2);
        $user->setDs3($ds3);
        $user->setDs4($ds4);
        $user->setDs5($ds5);
        $user->setDs6($ds6);
        $user->setDs7($ds7);
        $user->setDs8($ds8);
        $user->setDs9($ds9);
        $user->setDs10($ds10);

        return $user;
    }
}