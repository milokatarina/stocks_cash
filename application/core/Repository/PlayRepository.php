<?php

class PlayRepository
{
    public $db;
    public $user_id;

    public function __construct($db)
    {
        $this->db = $db;
    }

    /**
     * @return mixed
     */
    public function getDb()
    {
        return $this->db;
    }

    /**
     * @param mixed $db
     */
    public function setDb($db)
    {
        $this->db = $db;
    }

    /**
     * @return mixed
     */
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * @param mixed $user_id
     */
    public function setUserId($user_id)
    {
        $this->user_id = $user_id;
    }

    public function insert($user_id): int
    {
        $this->db->query(
            "INSERT INTO `play` (`user_id`)
                        VALUES ($user_id)"
        );

        return $this->db->insert_id();
    }
}