<?php

require_once APPPATH.'core/Entity/Play.php';

class PlayFactory
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
        $userId
    ): Play {
        return new Play($userId);
    }
}