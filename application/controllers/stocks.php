<?php

include APPPATH.'core/Repository/UserRepository.php';
include APPPATH.'core/Repository/YearRevenueRepository.php';
include APPPATH.'core/Repository/InvestmentRepository.php';
include APPPATH.'core/Repository/PlayRepository.php';
include APPPATH.'core/Entity/User.php';
include APPPATH.'core/Entity/YearRevenue.php';
include APPPATH.'core/Entity/Investment.php';

class Stocks extends MY_Controller
{
    const MAX_PERIODS = 10;
    /** @var UserRepository */
    public $userRepository;
    /** @var YearRevenueRepository */
    public $yearRevenueRepository;
    /** @var PlayRepository */
    public $playRepository;
    /** @var InvestmentRepository */
    public $investmentRepository;

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->userRepository = new UserRepository($this->db);
        $this->yearRevenueRepository = new YearRevenueRepository($this->db);
        $this->playRepository = new PlayRepository($this->db);
        $this->investmentRepository = new InvestmentRepository($this->db);
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

//        $userId = $data->userId;
        $playId = $data->playId;
        $period = $data->period;
        $depositPercent = $data->depositPercent;
        $stocksPercent = $data->stocksPercent;
        $initCashBalance = $data->initCashBalance;
        $totalCashBalance = $data->totalCashBalance;

        $investment = new Investment(
            $playId,
            $period,
            $initCashBalance,
            $depositPercent,
            $stocksPercent,
            $totalCashBalance
        );
        $investmentId = $this->investmentRepository->insert($investment);
        if ($period === self::MAX_PERIODS) {
            $this->playRepository->update($playId, $totalCashBalance);
        }
    }

    public function sendRSAnswers(){
        $data = $this->receiveJSON()->params;
        var_dump($data);
    }
    public function initGame()
    {
        $data = $this->receiveJSON()->params;
        $newUser = new User($data->gender, $data->age, $data->studies);
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
