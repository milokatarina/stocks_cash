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
    const MAX_PERIODS = 15;
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
        $rpLastPeriod = $data->rpLastPeriod;

        $investment = new Investment(
            $playId,
            $period,
            $initCashBalance,
            $depositPercent,
            $stocksPercent,
            $totalCashBalance,
            $rpLastPeriod
        );

        $investmentId = $this->investmentRepository->insert($investment);
        if ($period === self::MAX_PERIODS) {
            $this->playRepository->update($playId, $totalCashBalance);
        }
    }

    public function sendRSAnswers()
    {
        $data = $this->receiveJSON()->params;
        $this->userRepository->updateRsAnswers($data->user_id, $data);
    }

    public function initGame()
    {
        $data = $this->receiveJSON()->params;
        $newUser = new User(
            $data->ds1, $data->ds2, $data->ds3, $data->ds4, $data->ds5, $data->ds6, $data->ds7, $data->ds8,
            $data->ds9, $data->ds10
        );
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

    public function get_data()
    {
        $query = $this->db->query(
            '
           select ds1, ds2, ds3, ds4,ds5, ds6, ds7, ds8, ds9, ds10, rs1, rs2, rs3, rs4, rs5, rs6, rs7, GROUP_CONCAT(i.stocks_percent) stocksP
            from user u
            inner join play p on p.user_id = u.id
            inner join investment i on i.play_id = p.id
            group by u.id;
            '
        );

        $f = fopen('php://memory', 'w');
        fputcsv(
            $f,
            [
                "ispitanici",
                "P1 Pol",
                "P2 Starost",
                "P3 Stepen studija",
                "P4 Smer",
                "P5 Finansiranje",
                "Pitanje6 Izdrzavanje",
                "P7 Prebivaliste",
                "P8 Radno iskustvo",
                "P9",
                "P10",
                "RS I/1",
                "RS I/2",
                "RS I/3",
                "RS I/4",
                "RS I/5",
                "RS I/6",
                "RS I/7",
                "RPr P1",
                "RPr P2",
            ]
        );

        if ($query->num_rows() > 0) {
            foreach ($query->result_array() as $row) {
                fputcsv($f, $row);
            }
        }
        // reset the file pointer to the start of the file
        fseek($f, 0);
        // tell the browser it's going to be a csv file
        header('Content-Type: application/csv');
        // tell the browser we want to save it instead of displaying it
        header('Content-Disposition: attachment; filename="podaci.csv";');
        // make php send the generated csv lines to the browser
        fpassthru($f);
    }
}
