<?php

class Investment
{
    protected $playId;
    protected $period;
    protected $cash_balance;
    protected $deposit_percent;
    protected $stocks_percent;
    protected $cash_balance_total;

    /**
     * Investment constructor.
     * @param $playId
     * @param $period
     * @param $cash_balance
     * @param $deposit_percent
     * @param $stocks_percent
     * @param $cash_balance_total
     */
    public function __construct($playId, $period, $cash_balance, $deposit_percent, $stocks_percent, $cash_balance_total)
    {
        $this->playId = $playId;
        $this->period = $period;
        $this->cash_balance = $cash_balance;
        $this->deposit_percent = $deposit_percent;
        $this->stocks_percent = $stocks_percent;
        $this->cash_balance_total = $cash_balance_total;
    }

    /**
     * @return mixed
     */
    public function getPlayId()
    {
        return $this->playId;
    }

    /**
     * @param mixed $playId
     */
    public function setPlayId($playId)
    {
        $this->playId = $playId;
    }

    /**
     * @return mixed
     */
    public function getPeriod()
    {
        return $this->period;
    }

    /**
     * @param mixed $period
     */
    public function setPeriod($period)
    {
        $this->period = $period;
    }

    /**
     * @return mixed
     */
    public function getCashBalance()
    {
        return $this->cash_balance;
    }

    /**
     * @param mixed $cash_balance
     */
    public function setCashBalance($cash_balance)
    {
        $this->cash_balance = $cash_balance;
    }

    /**
     * @return mixed
     */
    public function getDepositPercent()
    {
        return $this->deposit_percent;
    }

    /**
     * @param mixed $deposit_percent
     */
    public function setDepositPercent($deposit_percent)
    {
        $this->deposit_percent = $deposit_percent;
    }

    /**
     * @return mixed
     */
    public function getStocksPercent()
    {
        return $this->stocks_percent;
    }

    /**
     * @param mixed $stocks_percent
     */
    public function setStocksPercent($stocks_percent)
    {
        $this->stocks_percent = $stocks_percent;
    }

    /**
     * @return mixed
     */
    public function getCashBalanceTotal()
    {
        return $this->cash_balance_total;
    }

    /**
     * @param mixed $cash_balance_total
     */
    public function setCashBalanceTotal($cash_balance_total)
    {
        $this->cash_balance_total = $cash_balance_total;
    }
}