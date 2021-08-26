<?php

class PlayRepository
{
    public $db;
    private static $instance = null;

    public function __construct()
    {
        $this->db = &get_instance()->db;
    }

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


    public function insert($user_id): int
    {
        $this->db->query(
            "INSERT INTO `play` (`user_id`)
                        VALUES ($user_id)"
        );

        return $this->db->insert_id();
    }

    public function update($play_id, $total_balance)
    {
        $this->db->query(
            "UPDATE play SET total_balance={$total_balance} where id={$play_id}"
        );
    }
}