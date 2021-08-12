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
            "INSERT INTO `user` (`ds1`, `ds2`, `ds3`, `ds4`, `ds5`, `ds6`, `ds7`, `ds8`, `ds9`, `ds10`)
                        VALUES(
                                '".$user->getDs1()."', '".$user->getDs2()."',
                                '".$user->getDs3()."', '".$user->getDs4()."', '".$user->getDs5()."',
                                '".$user->getDs6()."', '".$user->getDs7()."', '".$user->getDs8()."',
                                '".$user->getDs9()."', '".$user->getDs10()."'
                                )"
        );

        return $this->db->insert_id();
    }
    public function updateRsAnswers($userId, $data)
    {
        $this->db->query(
            "
            UPDATE user 
            SET rs1 = {$data->rs1},
                rs2 = {$data->rs2},
                rs3 = {$data->rs3},
                rs4 = {$data->rs4},
                rs5 = {$data->rs5},
                rs6 = {$data->rs6},
                rs7 = {$data->rs7}
            WHERE
                id = {$userId};
            "
        );
    }
    public function updateCsAnswers($userId, $data)
    {
        $this->db->query(
            "
            UPDATE user 
            SET cs1 = {$data->cs1},
                cs2 = {$data->cs2},
                cs3 = {$data->cs3},
                cs4 = {$data->cs4},
                cs5 = {$data->cs5}
            WHERE
                id = {$userId};
            "
        );
    }
    public function updateOptAnswers($userId, $data)
    {
        $this->db->query(
            "
            UPDATE user 
            SET os1 = {$data->os1},
                os2 = {$data->os2},
                os3 = {$data->os3},
                os4 = {$data->os4},
                os5 = {$data->os5}
            WHERE
                id = {$userId};
            "
        );
    }
}