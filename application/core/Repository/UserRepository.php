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
            "INSERT INTO `user` (`name`, `gender`, `age`, `email`)
                        VALUES (
                                '".$user->getName()."', '".$user->getGender()."', '".$user->getAge()."',
                                '".$user->getEmail()."'
                                )"
        );

        return $this->db->insert_id();
    }
}