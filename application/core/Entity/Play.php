<?php

class Play
{
    /** @var DateTime */
    protected $date_created;
    /** @var User */
    protected $user;
    protected $total_balance;

    /**
     * Play constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**a
     * @return DateTime
     */
    public function getDateCreated(): DateTime
    {
        return $this->date_created;
    }

    /**
     * @param DateTime $date_created
     */
    public function setDateCreated(DateTime $date_created)
    {
        $this->date_created = $date_created;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * @param User $user
     */
    public function setUser(User $user)
    {
        $this->user = $user;
    }

    /**
     * @return mixed
     */
    public function getTotalBalance()
    {
        return $this->total_balance;
    }

    /**
     * @param mixed $total_balance
     */
    public function setTotalBalance($total_balance)
    {
        $this->total_balance = $total_balance;
    }
}