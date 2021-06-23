<?php

class InvestmentRepository
{
    public $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function insert(Investment $investment): int
    {
        $this->db->query(
            "INSERT INTO `investment` (`play_id`, `period`, `cash_balance`,
                          `deposit_percent`, `stocks_percent`, `cash_balance_total`)
                        VALUES (
                                '".$investment->getPlayId()."',
                                '".$investment->getPeriod()."',
                                '".$investment->getCashBalance()."',
                                '".$investment->getDepositPercent()."',
                                '".$investment->getStocksPercent()."',
                                '".$investment->getCashBalanceTotal()."'
                                )"
        );

        return $this->db->insert_id();
    }
}