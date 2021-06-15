<?php

//include APPPATH.'Entities/EVUser.php';

class Stocks extends CI_Controller
{
    public function index()
    {
        $this->load->view("stocks/index");
        $this->load->view("templates/footer/index");
        $this->load->view("stocks/index_scripts");
    }
}
