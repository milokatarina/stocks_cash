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
            $result[] = new YearRevenue($row->year, $row->stocks_revenue, $row->deposit_revenue);
        }

        return $result;
    }

}