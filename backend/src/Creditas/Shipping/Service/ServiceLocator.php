<?php

namespace Creditas\Shipping\Service;

class ServiceLocator
{
    static $instances = [];

    // @TODO: high coupling, must be refactored
    public static function get($serviceName)
    {
        $instances = $this->instances;

        if (isset($instances[$serviceName])) {
            return $instances[$serviceName];
        }

        $className = __namespace__ . "\\" . ucfirst($serviceName);

        if (!class_exists($className)) {
            throw new RuntimeException(sprintf('Invalid service name: %s', $serviceName));
        }

        $classInstance = new $className;

        $this->[$serviceName] = $classInstance;

        return $classInstance;
    }
}
