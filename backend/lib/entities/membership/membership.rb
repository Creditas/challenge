require 'observer'

class Membership
  include Observable

  attr_reader :product, :customer, :invoice, :activated_at, :status

  def initialize(product, customer, invoice)
    @Product = product
    @Customer = customer
    @Invoice = invoice
    @Status = :pending
  end

  def activate(activated_at = Time.now)
    @activated_at = activated_at;

    set_status(:activated)

    notify
  end

private

  def notify()
    changed
    notify_observers(self)
  end

  def set_status(status)
    @status = status
  end
end