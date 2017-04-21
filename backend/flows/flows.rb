module Flows
  Dir['./flows/types/*'].each do |type|
    require type
    include eval(type.split('/').last[0..-4].split('_').map {|w| w.capitalize}.join)
  end
end