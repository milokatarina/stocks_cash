<?php

class YearRevenueRepository
{
    public $db;

    public function __construct($db)
    {
        $this->db = $db;
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