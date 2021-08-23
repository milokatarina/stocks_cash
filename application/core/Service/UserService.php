<?php

require_once APPPATH.'core/Factory/UserFactory.php';

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
}