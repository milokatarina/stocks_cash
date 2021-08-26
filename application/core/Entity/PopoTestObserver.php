<?php

require_once APPPATH.'core/Interface/EventListener.php';

class PopoTestObserver implements EventListener
{

    public function update($eventType, $data)
    {
        return 1;
    }
}