<?php

//include APPPATH.'Entities/EVUser.php';

class Stocks extends CI_Controller
{
    public function index()
    {
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
}
