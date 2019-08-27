package br.com.jsc.challenge.services

import br.com.jsc.challenge.domain.specifications.Specification

class SpecificationService {
    fun <T> getAllSatisfiedBy(target: T, specs: List<Specification<T>>): List<Specification<T>> {
        return specs.filter { it.isSatisfiedBy(target) }
    }
}