<?php

class YearRevenue
{
    public $year;
    public $stocks_revenue;
    public $deposit_revenue;
    public $stock_price;
    public $floating_avg_stock_price;
    public $expected_rate_stocks_revenue;
    public $standard_deviation;


    public function __construct(
        $year,
        $stocks_revenue,
        $deposit_revenue,
        $floating_avg_stock_price,
        $stock_price,
        $expected_rate_stocks_revenue,
        $standard_deviation
    ) {
        $this->year = $year;
        $this->stocks_revenue = $stocks_revenue;
        $this->deposit_revenue = $deposit_revenue;
        $this->floating_avg_stock_price = $floating_avg_stock_price;
        $this->stock_price = $stock_price;
        $this->expected_rate_stocks_revenue = $expected_rate_stocks_revenue;
        $this->standard_deviation = $standard_deviation;
    }

    /**
     * @return mixed
     */
    public function getStockPrice()
    {
        return $this->stock_price;
    }

    /**
     * @param mixed $stock_price
     */
    public function setStockPrice($stock_price)
    {
        $this->stock_price = $stock_price;
    }

    /**
     * @return mixed
     */
    public function getFloatingAvgStockPrice()
    {
        return $this->floating_avg_stock_price;
    }

    /**
     * @param mixed $floating_avg_stock_price
     */
    public function setFloatingAvgStockPrice($floating_avg_stock_price)
    {
        $this->floating_avg_stock_price = $floating_avg_stock_price;
    }

    /**
     * @return mixed
     */
    public function getExpectedRateStocksRevenue()
    {
        return $this->expected_rate_stocks_revenue;
    }

    /**
     * @param mixed $expected_rate_stocks_revenue
     */
    public function setExpectedRateStocksRevenue($expected_rate_stocks_revenue)
    {
        $this->expected_rate_stocks_revenue = $expected_rate_stocks_revenue;
    }

    /**
     * @return mixed
     */
    public function getStandardDeviation()
    {
        return $this->standard_deviation;
    }

    /**
     * @param mixed $standard_deviation
     */
    public function setStandardDeviation($standard_deviation)
    {
        $this->standard_deviation = $standard_deviation;
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
