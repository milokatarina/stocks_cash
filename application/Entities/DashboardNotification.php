<?php

namespace Katarinamilosavljevic\EvApp1;

class DashboardNotification
{
    private $dashboard_notification_content_id;
    private $recipient_id;
    private $read_at;
    private $status;
    private $dashboard_notification_content;
    private $recipient;

    /**
     * DashboardNotification constructor.
     * @param $dashboard_notification_content_id
     * @param $recipient_id
     * @param $read_at
     * @param $status
     * @param $dashboard_notification_content
     * @param $recipient
     */
    public function __construct(
        $dashboard_notification_content_id,
        $recipient_id,
        $read_at,
        $status,
        $dashboard_notification_content,
        $recipient
    ) {
        $this->dashboard_notification_content_id = $dashboard_notification_content_id;
        $this->recipient_id = $recipient_id;
        $this->read_at = $read_at;
        $this->status = $status;
        $this->dashboard_notification_content = $dashboard_notification_content;
        $this->recipient = $recipient;
    }

    /**
     * @return mixed
     */
    public function getDashboardNotificationContentId()
    {
        return $this->dashboard_notification_content_id;
    }

    /**
     * @param mixed $dashboard_notification_content_id
     */
    public function setDashboardNotificationContentId($dashboard_notification_content_id)
    {
        $this->dashboard_notification_content_id = $dashboard_notification_content_id;
    }

    /**
     * @return mixed
     */
    public function getRecipientId()
    {
        return $this->recipient_id;
    }

    /**
     * @param mixed $recipient_id
     */
    public function setRecipientId($recipient_id)
    {
        $this->recipient_id = $recipient_id;
    }

    /**
     * @return mixed
     */
    public function getReadAt()
    {
        return $this->read_at;
    }

    /**
     * @param mixed $read_at
     */
    public function setReadAt($read_at)
    {
        $this->read_at = $read_at;
    }

    /**
     * @return mixed
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param mixed $status
     */
    public function setStatus($status)
    {
        $this->status = $status;
    }

    /**
     * @return mixed
     */
    public function getDashboardNotificationContent()
    {
        return $this->dashboard_notification_content;
    }

    /**
     * @param mixed $dashboard_notification_content
     */
    public function setDashboardNotificationContent($dashboard_notification_content)
    {
        $this->dashboard_notification_content = $dashboard_notification_content;
    }

    /**
     * @return mixed
     */
    public function getRecipient()
    {
        return $this->recipient;
    }

    /**
     * @param mixed $recipient
     */
    public function setRecipient($recipient)
    {
        $this->recipient = $recipient;
    }
}
