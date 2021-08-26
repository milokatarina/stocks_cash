<?php

class EventManager
{
    public static $eventListeners;
    private static $instance = null;

    /**
     * @return static
     */
    public static function getInstance(): self
    {
        if (empty(static::$instance)) {
            static::$eventListeners = [];
            static::$instance = new static();
        }

        return static::$instance;
    }


    public static function subscribe($eventType, $listener)
    {
        $newListener = new stdClass();
        $newListener->eventType = $eventType;
        $newListener->listener = $listener;
        array_push(self::$eventListeners, $newListener);
    }

    public static function unsubscribe($eventType, $listener): array
    {
        self::$eventListeners = array_filter(
            self::$eventListeners,
            function ($a) use ($eventType, $listener) {
                return !($a->eventType == $eventType && $a->listener == $listener);
            }
        );

        return self::$eventListeners;
    }

    public static function notify($eventType, $data)
    {
        foreach (self::$eventListeners as $listener) {
            $listener->listener->update($eventType, $data);
        }
    }
}
