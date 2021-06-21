<?php

//include APPPATH.'Entities/EVUser.php';

class Stocks extends MY_Controller
{
    public function index()
    {
//        $this->load->model('user');
//        $this->load->database();
//        $credo = new Rougin\Credo\Credo($this->db);
//        $repository = $credo->getRepository('User');
//
//        $user = $repository->findBy([]);

        $this->load->database();
        $query = $this->db->query('SELECT * FROM year_revenue');

        $yearsRevenue = [];
        foreach ($query->result() as $row) {
            $yearsRevenue[] = $row;
        }

        $data['yearsRevenue'] = $yearsRevenue;
        $this->load->view("stocks/index");
        $this->load->view("templates/footer/index");
        $this->load->view("stocks/index_scripts", $data);
    }

    public function logInvestment()
    {
        //upisi u bazu za jednoj usera i jedan period sta je uradio
    }


    //kada popuni odgovore na sva demografska pitanja
    public function validateUser()
    {
        $data = $this->receiveJSON()->params;
//        $this->load->model('user');
        $this->load->database();
//
//        $credo = new Rougin\Credo\Credo($this->db);
//
//        $repository = $credo->getRepository('User');
//
//        $user = $repository->findBy(['email' => $data->email]);
//        if (!empty($user)) {
//            return $this->ajaxResponse([], "User with given email already exists.", 400);
//        }
        $this->db->query(
            "INSERT INTO `user` (`name`, `gender`, `age`, `email`)
                        VALUES (
                                '".$data->name."', '".$data->gender."', '".$data->age."',
                                '".$data->email."'
                                )"
        );

//        return $this->ajaxResponse([$user->getId()]);

    }

    //npr 10 pitanja
    public function logAnswers()
    {
    }
}
