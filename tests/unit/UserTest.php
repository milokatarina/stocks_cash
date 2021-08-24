<?php

require_once APPPATH.'core/Service/UserService.php';
require_once APPPATH.'core/Repository/UserRepository.php';

class UserTest extends \PHPUnit\Framework\TestCase
{

    public function testUserCreate()
    {
        $userFactory = UserFactory::getInstance();
        $user = $userFactory->create(
            1,
            26,
            1,
            2,
            1,
            2,
            1,
            2,
            1,
            2
        );

        $this->assertInstanceOf("User", $user);
    }
}