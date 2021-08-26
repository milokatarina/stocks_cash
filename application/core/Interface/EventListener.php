<?php

interface EventListener
{
    public function update($eventType, $data);
}