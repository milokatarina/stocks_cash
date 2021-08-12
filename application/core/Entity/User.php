<?php

class User
{
    public $ds1;
    public $ds2;
    public $ds3;
    public $ds4;
    public $ds5;
    public $ds6;
    public $ds7;
    public $ds8;
    public $ds9;
    public $ds10;

    /**
     * User constructor.
     * @param $ds1
     * @param $ds2
     * @param $ds3
     * @param $ds4
     * @param $ds5
     * @param $ds6
     * @param $ds7
     * @param $ds8
     * @param $ds9
     * @param $ds10
     */
    public function __construct($ds1, $ds2, $ds3, $ds4, $ds5, $ds6, $ds7, $ds8, $ds9, $ds10)
    {
        $this->ds1 = $ds1;
        $this->ds2 = $ds2;
        $this->ds3 = $ds3;
        $this->ds4 = $ds4;
        $this->ds5 = $ds5;
        $this->ds6 = $ds6;
        $this->ds7 = $ds7;
        $this->ds8 = $ds8;
        $this->ds9 = $ds9;
        $this->ds10 = $ds10;
    }


    /**
     * @return mixed
     */
    public function getDs1()
    {
        return $this->ds1;
    }

    /**
     * @param mixed $ds1
     */
    public function setDs1($ds1)
    {
        $this->ds1 = $ds1;
    }

    /**
     * @return mixed
     */
    public function getDs2()
    {
        return $this->ds2;
    }

    /**
     * @param mixed $ds2
     */
    public function setDs2($ds2)
    {
        $this->ds2 = $ds2;
    }

    /**
     * @return mixed
     */
    public function getDs3()
    {
        return $this->ds3;
    }

    /**
     * @param mixed $ds3
     */
    public function setDs3($ds3)
    {
        $this->ds3 = $ds3;
    }

    /**
     * @return mixed
     */
    public function getDs4()
    {
        return $this->ds4;
    }

    /**
     * @param mixed $ds4
     */
    public function setDs4($ds4)
    {
        $this->ds4 = $ds4;
    }

    /**
     * @return mixed
     */
    public function getDs5()
    {
        return $this->ds5;
    }

    /**
     * @param mixed $ds5
     */
    public function setDs5($ds5)
    {
        $this->ds5 = $ds5;
    }

    /**
     * @return mixed
     */
    public function getDs6()
    {
        return $this->ds6;
    }

    /**
     * @param mixed $ds6
     */
    public function setDs6($ds6)
    {
        $this->ds6 = $ds6;
    }

    /**
     * @return mixed
     */
    public function getDs7()
    {
        return $this->ds7;
    }

    /**
     * @param mixed $ds7
     */
    public function setDs7($ds7)
    {
        $this->ds7 = $ds7;
    }

    /**
     * @return mixed
     */
    public function getDs8()
    {
        return $this->ds8;
    }

    /**
     * @param mixed $ds8
     */
    public function setDs8($ds8)
    {
        $this->ds8 = $ds8;
    }

    /**
     * @return mixed
     */
    public function getDs9()
    {
        return $this->ds9;
    }

    /**
     * @param mixed $ds9
     */
    public function setDs9($ds9)
    {
        $this->ds9 = $ds9;
    }

    /**
     * @return mixed
     */
    public function getDs10()
    {
        return $this->ds10;
    }

    /**
     * @param mixed $ds10
     */
    public function setDs10($ds10)
    {
        $this->ds10 = $ds10;
    }


}