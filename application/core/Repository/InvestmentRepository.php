<?php

class InvestmentRepository
{
    public $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function insert(Investment $investment): int
    {
        $this->db->query(
            "INSERT INTO `investment` (`name`, `gender`, `age`, `email`)
                        VALUES (
                                '".$user->getName()."', '".$user->getGender()."', '".$user->getAge()."',
                                '".$user->getEmail()."'
                                )"
        );

        return $this->db->insert_id();
    }
}