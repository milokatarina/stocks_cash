<?php

class UserRepository
{
    public $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function insert(User $user): int
    {
        $this->db->query(
            "INSERT INTO `user` (`gender`, `age`, `studies`)
                        VALUES (
                                '".$user->getGender()."', '".$user->getAge()."',
                                '".$user->getStudies()."'
                                )"
        );

        return $this->db->insert_id();
    }
}