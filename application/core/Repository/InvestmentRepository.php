<?php

use PhpDeal\Annotation as Contract;

class InvestmentRepository
{
    public $db;
    private static $instance = null;

    public function __construct()
    {
        $this->db = &get_instance()->db;
    }

    /**
     * @return static
     */
    public static function getInstance(): self
    {
        if (empty(static::$instance)) {
            static::$instance = new static();
        }

        return static::$instance;
    }

    /**
     * @param int $rp
     * @param int $investmentId
     * @Contract\Verify("$rp>=1 && $rp<=5 && $investmentId > 0")
     */
    public function update($investmentId, $rp)
    {
        $this->db->query(
            "
            UPDATE investment 
            SET rp={$rp}
            WHERE
                id = {$investmentId};
            "
        );
    }


    public function insert(Investment $investment): int
    {
        $this->db->query(
            "INSERT INTO `investment` (`play_id`, `period`, `cash_balance`,
                          `deposit_percent`, `stocks_percent`, `cash_balance_total`, `rp`)
                        VALUES (
                                '".$investment->getPlayId()."',
                                '".$investment->getPeriod()."',
                                '".$investment->getCashBalance()."',
                                '".$investment->getDepositPercent()."',
                                '".$investment->getStocksPercent()."',
                                '".$investment->getCashBalanceTotal()."',
                                 '".$investment->getRp()."'
                                )"
        );

        return $this->db->insert_id();
    }
}