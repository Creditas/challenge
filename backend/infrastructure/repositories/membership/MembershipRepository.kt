package challenge.infrastructure.repositories.membership

abstract class MembershipRepository {
    abstract fun activate(name: String)
}