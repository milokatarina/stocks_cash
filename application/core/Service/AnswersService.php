<?php

require_once APPPATH.'core/Service/UserService.php';

class AnswersService
{
    private static $instance = null;

    /** @var UserService */
    public $userService;

    /**
     * AnswersService constructor.
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }


    /**
     * @return static
     */
    public static function getInstance(): self
    {
        if (empty(static::$instance)) {
            static::$instance = new static(
                UserService::getInstance()
            );
        }

        return static::$instance;
    }

}