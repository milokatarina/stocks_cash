<?php

class InvestmentRepository
{
    public $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

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