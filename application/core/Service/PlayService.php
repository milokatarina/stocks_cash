<?php

require_once APPPATH.'core/Factory/PlayFactory.php';
require_once APPPATH.'core/Repository/PlayRepository.php';

class PlayService
{
    private static $instance = null;

    /** @var PlayFactory */
    public $playFactory;
    /** @var PlayRepository */
    public $playRepository;

    /**
     * PlayService constructor.
     * @param PlayFactory $playFactory
     * @param PlayRepository $playRepository
     */
    public function __construct(PlayFactory $playFactory, PlayRepository $playRepository)
    {
        $this->playFactory = $playFactory;
        $this->playRepository = $playRepository;
    }

    /**
     * @return static
     */
    public static function getInstance(): self
    {
        if (empty(static::$instance)) {
            static::$instance = new static(
                PlayFactory::getInstance(), PlayRepository::getInstance()
            );
        }

        return static::$instance;
    }

    public function update($playId, $totalBalance)
    {
        $this->playRepository->update($playId, $totalBalance);
    }

    public function insert($userId): int
    {
        return $this->playRepository->insert($userId);
    }

}