<?php

include APPPATH.'core/Repository/UserRepository.php';
include APPPATH.'core/Repository/YearRevenueRepository.php';
include APPPATH.'core/Repository/PlayRepository.php';
include APPPATH.'core/Entity/User.php';
include APPPATH.'core/Entity/YearRevenue.php';

class Stocks extends MY_Controller
{
    /** @var UserRepository */
    public $userRepository;
    /** @var YearRevenueRepository */
    public $yearRevenueRepository;
    /** @var PlayRepository */
    public $playRepository;

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->userRepository = new UserRepository($this->db);
        $this->yearRevenueRepository = new YearRevenueRepository($this->db);
        $this->playRepository = new PlayRepository($this->db);
    }

    public function index()
    {
        $data['yearsRevenue'] = $this->yearRevenueRepository->getAll();
        $this->load->view("stocks/index");
        $this->load->view("templates/footer/index");
        $this->load->view("stocks/index_scripts", $data);
    }

    public function logInvestment()
    {
        $data = $this->receiveJSON()->params;
    }

    public function initGame()
    {
        $data = $this->receiveJSON()->params;
        $newUser = new User($data->name, $data->email, $data->gender, $data->age);

        try {
            $userId = $this->userRepository->insert($newUser);
        } catch (\Exception $ex) {
            return $this->ajaxResponse(
                [],
                "User with this email already played the game!"
            );
        }

        $playId = $this->playRepository->insert($userId);

        return $this->ajaxResponse(
            [
                'user_id' => $userId,
                'play_id' => $playId,
            ]
        );
    }
}
