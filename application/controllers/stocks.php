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

    public function sendFSAnswers()
    {
        $data = $this->receiveJSON()->params;
        $this->userRepository->updateFSAnswers($data->user_id, $data);
    }

    public function sendRSAnswers2()
    {
        $data = $this->receiveJSON()->params;
        $this->userRepository->updateRsAnswers2($data->user_id, $data);
    }

    public function sendKSAnswers()
    {
        $data = $this->receiveJSON()->params;
        $this->userRepository->sendKSAnswers($data->user_id, $data);
    }

    public function sendCSAnswers()
    {
        $data = $this->receiveJSON()->params;
        $this->userRepository->updateCsAnswers($data->user_id, $data);
    }

    public function sendOptAnswers()
    {
        $data = $this->receiveJSON()->params;
        $this->userRepository->updateOptAnswers($data->user_id, $data);
    }

    public function initGame()
    {
        $data = $this->receiveJSON()->params;
        $newUser = new User(
            $data->ds1, $data->ds2, $data->ds3, $data->ds4, $data->ds5, $data->ds61, $data->ds62, $data->ds7, $data->ds8,
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
           select u.id, ds1, ds2, ds3, ds4, ds5, ds61, ds62, ds7, ds8, ds9, ds10, rs1, rs2, rs3, rs4, rs5, rs6, rs7, GROUP_CONCAT(i.stocks_percent) stocksP, GROUP_CONCAT(i.rp) riskP, cs1, cs2, cs3, cs4, cs5, os1, os2, os3,  os4, os5, rs8, rs9, rs10, rs11, rs12, rs13, rs14, ks1, ks2, ks3, ks4, ks5, ks6, ks7, fs1, fs2, fs3, fs4, fs5, fs6, fs7, fs8, fs9, fs10, fs11, fs12
            from user u
            left join play p on p.user_id = u.id
            left join investment i on i.play_id = p.id
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
                "P61 Dopunsko finansiranje",
                "P62 Dopunsko finansiranje",
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
                "RPr P3",
                "RPr P4",
                "RPr P5",
                "RPr P6",
                "RPr P7",
                "RPr P8",
                "RPr P9",
                "RPr P10",
                "RPr P11",
                "RPr P12",
                "RPr P13",
                "RPr P14",
                "RPr P15",
                "RP01",
                "RP02",
                "RP03",
                "RP04",
                "RP05",
                "RP06",
                "RP07",
                "RP08",
                "RP09",
                "RP10",
                "RP11",
                "RP12",
                "RP13",
                "RP14",
                "RP15",
                "Samopouzdanje 1",
                "Samopouzdanje 2",
                "Samopouzdanje 3",
                "Samopouzdanje 4",
                "Samopouzdanje 5",
                "Optimizam 1",
                "Optimizam 2",
                "Optimizam 3",
                "Optimizam 4",
                "Optimizam 5",
                "RS II/1",
                "RS II/2",
                "RS II/3",
                "RS II/4",
                "RS II/5",
                "RS II/6",
                "RS II/7",
                "Sklonost kajanju 1",
                "Sklonost kajanju 2",
                "Sklonost kajanju 3",
                "Sklonost kajanju 4",
                "Sklonost kajanju 5",
                "Sklonost kajanju 6",
                "Sklonost kajanju 7",
                "Finansijska pismenost 1",
                "Finansijska pismenost 2",
                "Finansijska pismenost 3",
                "Finansijska pismenost 4",
                "Finansijska pismenost 5",
                "Finansijska pismenost 6",
                "Finansijska pismenost 7",
                "Finansijska pismenost 8",
                "Finansijska pismenost 9",
                "Finansijska pismenost 10",
                "Finansijska pismenost 11",
                "Finansijska pismenost 12",
            ]
        );

        if ($query->num_rows() > 0) {
            foreach ($query->result_array() as $row) {
                $modifiedRow = $row;
                $startSlice = array_values(array_slice($modifiedRow, 0, 19));
                $endSlice = array_values(array_slice($modifiedRow, 21, count($modifiedRow)));
                $preparedStocksP = array_values(explode(",", $modifiedRow['stocksP']));
                $preparedRisksP = array_values(explode(",", $modifiedRow['riskP']));
                $prepended = array_merge($startSlice, $preparedStocksP, $preparedRisksP, $endSlice);
                fputcsv($f, $prepended);
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
