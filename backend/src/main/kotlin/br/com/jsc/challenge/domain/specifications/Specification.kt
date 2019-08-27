package br.com.jsc.challenge.domain.specifications

abstract class Specification<T> {
    abstract fun isSatisfiedBy(target: T): Boolean
}