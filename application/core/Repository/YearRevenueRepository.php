<?php

class YearRevenueRepository
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
     * @return YearRevenue[]
     */
    public function getAll(): array
    {
        $query = $this->db->query('SELECT * FROM year_revenue');

        $result = [];
        foreach ($query->result() as $row) {
            $result[] = new YearRevenue(
                $row->year,
                $row->stocks_revenue,
                $row->deposit_revenue,
                $row->floating_avg_stock_price,
                $row->stock_price,
                $row->expected_rate_stocks_revenue,
                $row->standard_deviation
            );
        }

        return $result;
    }

}