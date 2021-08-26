<?php


use Assert\Assert;
use PhpDeal\ContractApplication;

require_once './vendor/autoload.php';

require_once APPPATH.'core/Repository/InvestmentRepository.php';
require_once APPPATH.'core/Entity/YearRevenue.php';
require_once APPPATH.'core/Entity/Investment.php';
require_once APPPATH.'core/Service/UserService.php';
require_once APPPATH.'core/Service/PlayService.php';
require_once APPPATH.'core/Service/YearRevenueService.php';
require_once APPPATH.'core/Observer/EventManager.php';

$instance = ContractApplication::getInstance();

$instance->init(
    array(
        'debug' => true,
        'appDir' => APPPATH,
        'excludePaths' => [
            __DIR__.'/vendor',
        ],
        'includePaths' => [

        ],
        'cacheDir' => __DIR__.'/cache/',
    )
);

class Stocks extends MY_Controller
{

    const MAX_PERIODS = 15;

    /** @var YearRevenueService */
    public $yearRevenueService;
    /** @var PlayService */
    public $playService;
    /** @var InvestmentRepository */
    public $investmentRepository;
    /** @var UserService */
    public $userService;
    /** @var EventManager */
    public $eventManager;

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->yearRevenueService = YearRevenueService::getInstance();
        $this->playService = PlayService::getInstance();
        $this->investmentRepository = InvestmentRepository::getInstance();
        $this->userService = UserService::getInstance();
        $this->eventManager = EventManager::getInstance();
    }

    public function index()
    {
        $data['yearsRevenue'] = $this->yearRevenueService->getAll();
        $this->eventManager::subscribe('playGame', $this->playService);
        $this->load->view("stocks/index");
        $this->load->view("templates/footer/index");
        $this->load->view("stocks/index_scripts", $data);
    }

    public function logInvestment()
    {
        $data = $this->receiveJSON()->params;

        $playId = $data->playId;
        $period = $data->period;
        $depositPercent = $data->depositPercent;
        $stocksPercent = $data->stocksPercent;
        $initCashBalance = $data->initCashBalance;
        $totalCashBalance = $data->totalCashBalance;
        $rpLastPeriod = $data->rpLastPeriod;

        try {
            Assert::lazy()
                ->that($stocksPercent)->tryAll()->integer()->between(0, 100)
                ->that($depositPercent)->tryAll()->integer()->between(0, 100)
                ->that($rpLastPeriod)->tryAll()->integer()->between(1, 5)
                ->verifyNow();
        } catch (Exception $e) {
            log_message("error", $e->getMessage());
        }

        $investment = new Investment(
            $playId,
            $period,
            $initCashBalance,
            $depositPercent,
            $stocksPercent,
            $totalCashBalance,
            $rpLastPeriod
        );

        $this->investmentRepository->insert($investment);
        if ($period === self::MAX_PERIODS) {
            $eventData = new stdClass();
            $eventData->playId = $playId;
            $eventData->totalBalance = $totalCashBalance;
            $this->eventManager::notify('playGame', $eventData);
            $this->playService->update('playFinished', $eventData);
            $this->eventManager::unsubscribe('playGame', $this->playService);
        }
    }

    public function sendRSAnswers()
    {
        $data = $this->receiveJSON()->params;
        try {
            $this->userService->updateAnswers("rs", $data->user_id, $data);
        } catch (Exception $e) {
            log_message("error", $e->getMessage());
        }
    }

    public function sendFSAnswers()
    {
        $data = $this->receiveJSON()->params;
        try {
            $this->userService->updateAnswers("fs", $data->user_id, $data);
        } catch (Exception $e) {
            log_message("error", $e->getMessage());
        }
    }

    public function sendRSAnswers2()
    {
        $data = $this->receiveJSON()->params;
        try {
            $this->userService->updateAnswers("rs2", $data->user_id, $data);
        } catch (Exception $e) {
            log_message("error", $e->getMessage());
        }
    }

    public function sendKSAnswers()
    {
        $data = $this->receiveJSON()->params;
        try {
            $this->userService->updateAnswers("ks", $data->user_id, $data);
        } catch (Exception $e) {
            log_message("error", $e->getMessage());
        }
    }

    public function sendCSAnswers()
    {
        $data = $this->receiveJSON()->params;
        try {
            $this->userService->updateAnswers("cs", $data->user_id, $data);
        } catch (Exception $e) {
            log_message("error", $e->getMessage());
        }
    }

    public function sendOptAnswers()
    {
        $data = $this->receiveJSON()->params;
        try {
            $this->userService->updateAnswers("opt", $data->user_id, $data);
        } catch (Exception $e) {
            log_message("error", $e->getMessage());
        }
    }

    public function initGame()
    {
        $data = $this->receiveJSON()->params;

        try {
            $userId = $this->userService->createUser(
                $data->ds1,
                $data->ds2,
                $data->ds3,
                $data->ds4,
                $data->ds5,
                $data->ds6,
                $data->ds7,
                $data->ds8,
                $data->ds9,
                $data->ds10
            );
        } catch (\Exception $ex) {
            return $this->ajaxResponse(
                [],
                "User with this email already played the game!"
            );
        }

        $playId = $this->playService->create($userId);

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
           select u.id, ds1, ds2, ds3, ds4,ds5, ds6, ds7, ds8, ds9, ds10, rs1, rs2, rs3, rs4, rs5, rs6, rs7, GROUP_CONCAT(i.stocks_percent) stocksP, GROUP_CONCAT(i.rp) riskP, cs1, cs2, cs3, cs4, cs5, os1, os2, os3,  os4, os5, rs8, rs9, rs10, rs11, rs12, rs13, rs14, ks1, ks2, ks3, ks4, ks5, ks6, ks7, fs1, fs2, fs3, fs4, fs5, fs6, fs7, fs8, fs9, fs10, fs11, fs12
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
                "P6 Izdrzavanje",
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
                $startSlice = array_values(array_slice($modifiedRow, 0, 18));
                $endSlice = array_values(array_slice($modifiedRow, 20, count($modifiedRow)));
                $preparedStocksP = array_values(explode(",", $modifiedRow['stocksP']));
                $preparedRisksP = array_values(explode(",", $modifiedRow['riskP']));
                $prepended = array_merge($startSlice, $preparedStocksP, $preparedRisksP, $endSlice);
                fputcsv($f, $prepended);
            }
        }
        fseek($f, 0);
        header('Content-Type: application/csv');
        header('Content-Disposition: attachment; filename="podaci.csv";');
        fpassthru($f);
    }
}
