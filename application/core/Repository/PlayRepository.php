<?php

class PlayRepository
{
    public $db;

    public function __construct($db)
    {
        $this->db = $db;
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