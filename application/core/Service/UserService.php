<?php

use Assert\Assertion;
use PhpDeal\Annotation as Contract;

require_once APPPATH.'core/Factory/UserFactory.php';
require_once APPPATH.'core/Repository/UserRepository.php';

class UserService
{
    private static $instance = null;

    /** @var UserFactory */
    public $userFactory;
    /** @var UserRepository */
    public $userRepository;

    /**
     * UserService constructor.
     * @param UserRepository $userRepository
     * @param UserFactory $userFactory
     */
    public function __construct(
        UserRepository $userRepository,
        UserFactory $userFactory
    ) {
        $this->userFactory = $userFactory;
        $this->userRepository = $userRepository;
    }


    /**
     * @return static
     */
    public static function getInstance(): self
    {
        if (empty(static::$instance)) {
            static::$instance = new static(
                UserRepository::getInstance(),
                UserFactory::getInstance()
            );
        }

        return static::$instance;
    }

    public function createUser(
        $ds1,
        $ds2,
        $ds3,
        $ds4,
        $ds5,
        $ds6,
        $ds7,
        $ds8,
        $ds9,
        $ds10
    ): int {
        $user = $this->userFactory->create(
            $ds1,
            $ds2,
            $ds3,
            $ds4,
            $ds5,
            $ds6,
            $ds7,
            $ds8,
            $ds9,
            $ds10
        );

        return $this->userRepository->insert($user);
    }

    /**
     * @param int $userId
     * @Contract\Verify("$userId !== null")
     */
    public function updateAnswers($type, $userId, $answers)
    {
        try {
            Assertion::choice($type, ["opt", "cs", "ks", "rs", "rs2", "fs"]);
        } catch (\Assert\AssertionFailedException $e) {
            log_message("error", $e->getMessage());
            throw new Exception("Unknown type of the answer.");
        }

        switch ($type) {
            case "opt":
                $this->userRepository->updateOptAnswers($userId, $answers);
                break;
            case "cs":
                $this->userRepository->updateCsAnswers($userId, $answers);
                break;
            case "ks":
                $this->userRepository->updateKSAnswers($userId, $answers);
                break;
            case "rs":
                $this->userRepository->updateRsAnswers($userId, $answers);
                break;
            case "rs2":
                $this->userRepository->updateRsAnswers2($userId, $answers);
                break;
            case "fs":
                $this->userRepository->updateFSAnswers($userId, $answers);
                break;
        }
    }
}