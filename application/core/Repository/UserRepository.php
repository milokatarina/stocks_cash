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

    public function sendKSAnswers($userId, $data)
    {
        $this->db->query(
            "
            UPDATE user 
            SET ks1 = {$data->ks1},
                ks2 = {$data->ks2},
                ks3 = {$data->ks3},
                ks4 = {$data->ks4},
                ks5 = {$data->ks5},
                ks6 = {$data->ks6},
                ks7 = {$data->ks7}
            WHERE
                id = {$userId};
            "
        );
    }

    public function updateRsAnswers2($userId, $data)
    {
        $this->db->query(
            "
            UPDATE user 
            SET rs8 = {$data->rs8},
                rs9 = {$data->rs9},
                rs10 = {$data->rs10},
                rs11 = {$data->rs11},
                rs12 = {$data->rs12},
                rs13 = {$data->rs13},
                rs14 = {$data->rs14}
            WHERE
                id = {$userId};
            "
        );
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

    public function updateFSAnswers($userId, $data)
    {
        $this->db->query(
            "
            UPDATE user 
            SET fs1 = {$data->fs1},
                fs2 = {$data->fs2},
                fs3 = {$data->fs3},
                fs4 = {$data->fs4},
                fs5 = {$data->fs5},
                fs6 = {$data->fs6},
                fs7 = {$data->fs7},
                fs8 = {$data->fs8},
                fs9 = {$data->fs9},
                fs10 = {$data->fs10},
                fs11 = {$data->fs11},
                fs12 = {$data->fs12}
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