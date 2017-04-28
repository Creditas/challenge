module Assert

  class AssertionFailedError < StandardError; end

  def assert(condition, message = "Assertion failed")
    raise AssertionFailedError.new(message) if !condition
    print '.'
  end

end
