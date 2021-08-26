<?php

require_once APPPATH.'core/Factory/PlayFactory.php';

class PlayTest extends \PHPUnit\Framework\TestCase
{

    public function testPlayCreate()
    {
        $playFactory = PlayFactory::getInstance();
        $play = $playFactory->create(
            1
        );

        $this->assertInstanceOf("Play", $play);
    }
}