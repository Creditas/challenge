class Mock

  def initialize
    @method_table = {}
  end

  def expect(method_sym, value_or_lambda)
    @method_table[method_sym] = { m: value_or_lambda, count: 0 }
  end

  def assert_called(method_sym)
    @method_table[method_sym][:count] > 0
  end

end
