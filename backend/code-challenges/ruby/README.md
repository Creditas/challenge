# Configuration & Installation

## Prerequisites
You must have ruby version `3.0.2` installed.

We recommend the usage of a version manager. The most popular ones are:
- [rvm](https://rvm.io/) 
- [rbenv](https://github.com/rbenv/rbenv)
- [asdf](https://github.com/asdf-vm/asdf)


## Install dependencies

We use bundler as the ruby package manager

```sh
gem install bundler
```

To install the packages (only rspec for tests)

```sh
bundle install
```

## Running Project and test

We are using rspec for the unit testing

```sh
rspec
```

You should expect a failing test
