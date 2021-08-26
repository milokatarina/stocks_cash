<?php

require_once APPPATH.'core/Repository/YearRevenueRepository.php';

class YearRevenueService
{
    private static $instance = null;

    /** @var YearRevenueRepository */
    public $yearRevenueRepository;

    /**
     * YearRevenueService constructor.
     * @param YearRevenueRepository $yearRevenueRepository
     */
    public function __construct(YearRevenueRepository $yearRevenueRepository)
    {
        $this->yearRevenueRepository = $yearRevenueRepository;
    }

    /**
     * @return static
     */
    public static function getInstance(): self
    {
        if (empty(static::$instance)) {
            static::$instance = new static(
                YearRevenueRepository::getInstance()
            );
        }

        return static::$instance;
    }

    public function getAll(): array
    {
        return $this->yearRevenueRepository->getAll();
    }


}