<?php

require_once APPPATH.'core/Observer/EventManager.php';
require_once APPPATH.'core/Entity/PopoTestObserver.php';

class SubscriberTest extends \PHPUnit\Framework\TestCase
{

    public function testObserver()
    {
        $eventManager = EventManager::getInstance();
        $eventListener = new PopoTestObserver();
        $eventManager::subscribe("test_started", $eventListener);
        $this->assertTrue(count($eventManager::$eventListeners) > 0);
        $eventManager::notify("test_done", $eventListener);
        $eventManager::unsubscribe("test_started", $eventListener);
        $this->assertTrue(count($eventManager::$eventListeners) == 0);
    }

}