<?php

require_once APPPATH.'core/Factory/PlayFactory.php';
require_once APPPATH.'core/Repository/PlayRepository.php';

use PhpDeal\Annotation as Contract;

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

    /**
     * @param int $playId
     * @param int $totalBalance
     * @Contract\Verify("$playId > 0 && $totalBalance!==null")
     */
    public function update($playId, $totalBalance)
    {
        $this->playRepository->update($playId, $totalBalance);
    }

    /**
     * @param int $userId
     * @Contract\Verify("$userId >0")
     */
    public function create($userId): int
    {
        $play = $this->playFactory->create($userId);
        return $this->playRepository->insert($play);
    }

}