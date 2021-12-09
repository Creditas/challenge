# Configuration & Installation

## Prerequisites
You must have php version `8.1.0` installed.

We recommend the usage of a version manager. The most popular ones are:
- [phpbrew](https://github.com/phpbrew/phpbrew) 
- [phpenv](https://github.com/CHH/phpenv)
- [phpversion](https://github.com/wilmoore/php-version)

## Install dependencies

We use `composer` as the php package manager.

To install on Mac and Linux:
```sh
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
chmod +x /usr/local/bin/composer
```

To install on Windows:
Download [https://getcomposer.org/Composer-Setup.exe](https://getcomposer.org/Composer-Setup.exe) and follow all steps.


To install the packages:

```sh
composer install
```

## Running tests

We are using phpunit for the unit testing

```sh
vendor/bin/phpunit tests/LoanMatcherTest.php
```

You should expect a failing test
