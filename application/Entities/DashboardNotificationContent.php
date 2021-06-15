<?php

namespace Katarinamilosavljevic\EvApp1;

class DashboardNotificationContent implements \JsonSerializable
{
    private $type;
    private $title;
    private $message;
    private $cta;
    private $url;
    private $description;
    private $author_id;
    private $parent_id;
    protected $sent_at;
    protected $revoked_at;
    protected $with_push;
    /** @var EVUser|null */
    private $author;
    /** @var DashboardNotificationContent|null */
    private $parent;

    /**
     * DashboardNotificationContent constructor.
     * @param $type
     * @param $title
     * @param $message
     * @param $cta
     * @param $url
     * @param $description
     * @param $author_id
     * @param $parent_id
     * @param $sent_at
     * @param $revoked_at
     * @param $with_push
     * @param EVUser|null $author
     * @param DashboardNotificationContent|null $parent
     */
    public function __construct(
        $type,
        $title,
        $message,
        $cta,
        $url,
        $description,
        $author_id,
        $parent_id,
        $sent_at,
        $revoked_at,
        $with_push
    ) {
        $this->type = $type;
        $this->title = $title;
        $this->message = $message;
        $this->cta = $cta;
        $this->url = $url;
        $this->description = $description;
        $this->author_id = $author_id;
        $this->parent_id = $parent_id;
        $this->sent_at = $sent_at;
        $this->revoked_at = $revoked_at;
        $this->with_push = $with_push;
    }

    /**
     * @return mixed
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param mixed $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return mixed
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * @param mixed $message
     */
    public function setMessage($message)
    {
        $this->message = $message;
    }

    /**
     * @return mixed
     */
    public function getCta()
    {
        return $this->cta;
    }

    /**
     * @param mixed $cta
     */
    public function setCta($cta)
    {
        $this->cta = $cta;
    }

    /**
     * @return mixed
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @param mixed $url
     */
    public function setUrl($url)
    {
        $this->url = $url;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return mixed
     */
    public function getAuthorId()
    {
        return $this->author_id;
    }

    /**
     * @param mixed $author_id
     */
    public function setAuthorId($author_id)
    {
        $this->author_id = $author_id;
    }

    /**
     * @return mixed
     */
    public function getParentId()
    {
        return $this->parent_id;
    }

    /**
     * @param mixed $parent_id
     */
    public function setParentId($parent_id)
    {
        $this->parent_id = $parent_id;
    }

    /**
     * @return mixed
     */
    public function getSentAt()
    {
        return $this->sent_at;
    }

    /**
     * @param mixed $sent_at
     */
    public function setSentAt($sent_at)
    {
        $this->sent_at = $sent_at;
    }

    /**
     * @return mixed
     */
    public function getRevokedAt()
    {
        return $this->revoked_at;
    }

    /**
     * @param mixed $revoked_at
     */
    public function setRevokedAt($revoked_at)
    {
        $this->revoked_at = $revoked_at;
    }

    /**
     * @return mixed
     */
    public function getWithPush()
    {
        return $this->with_push;
    }

    /**
     * @param mixed $with_push
     */
    public function setWithPush($with_push)
    {
        $this->with_push = $with_push;
    }

    /**
     * @return EVUser|null
     */
    public function getAuthor(): EVUser
    {
        return $this->author;
    }

    /**
     * @param EVUser|null $author
     */
    public function setAuthor(EVUser $author)
    {
        $this->author = $author;
    }

    /**
     * @return DashboardNotificationContent|null
     */
    public function getParent(): DashboardNotificationContent
    {
        return $this->parent;
    }

    /**
     * @param DashboardNotificationContent|null $parent
     */
    public function setParent(DashboardNotificationContent $parent)
    {
        $this->parent = $parent;
    }

    public function jsonSerialize()
    {
        // TODO: Implement jsonSerialize() method.
    }
}
