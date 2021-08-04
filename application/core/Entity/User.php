<?php

class User
{
    public $gender;
    public $age;
    public $studies;

    /**
     * User constructor.
     * @param $gender
     * @param $age
     * @param $studies
     */
    public function __construct($gender, $age, $studies)
    {
        $this->gender = $gender;
        $this->age = $age;
        $this->studies = $studies;
    }


    /**
     * @return mixed
     */
    public function getStudies()
    {
        return $this->studies;
    }

    /**
     * @param mixed $studies
     */
    public function setStudies($studies)
    {
        $this->studies = $studies;
    }


    /**
     * @return mixed
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * @param mixed $gender
     */
    public function setGender($gender)
    {
        $this->gender = $gender;
    }

    /**
     * @return mixed
     */
    public function getAge()
    {
        return $this->age;
    }

    /**
     * @param mixed $age
     */
    public function setAge($age)
    {
        $this->age = $age;
    }
}