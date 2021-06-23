<?php

class YearRevenue
{
    public $year;
    public $stocks_revenue;
    public $deposit_revenue;

    /**
     * YearRevenue constructor.
     * @param $year
     * @param $stocks_revenue
     * @param $deposit_revenue
     */
    public function __construct($year, $stocks_revenue, $deposit_revenue)
    {
        $this->year = $year;
        $this->stocks_revenue = $stocks_revenue;
        $this->deposit_revenue = $deposit_revenue;
    }

    /**
     * @return mixed
     */
    public function getYear()
    {
        return $this->year;
    }

    /**
     * @param mixed $year
     */
    public function setYear($year)
    {
        $this->year = $year;
    }

    /**
     * @return mixed
     */
    public function getStocksRevenue()
    {
        return $this->stocks_revenue;
    }

    /**
     * @param mixed $stocks_revenue
     */
    public function setStocksRevenue($stocks_revenue)
    {
        $this->stocks_revenue = $stocks_revenue;
    }

    /**
     * @return mixed
     */
    public function getDepositRevenue()
    {
        return $this->deposit_revenue;
    }

    /**
     * @param mixed $deposit_revenue
     */
    public function setDepositRevenue($deposit_revenue)
    {
        $this->deposit_revenue = $deposit_revenue;
    }
}
