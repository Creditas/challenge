<?php

namespace Creditas\Payment\Validator;

interface ValidatorInterface
{
    public function validate(ValidatorInterface $entity);
}