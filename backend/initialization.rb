$stdout.sync = true

Dir[File.dirname(__FILE__) + '/mailers/*.rb'].each {|file| require file }

# Because order matters, we need to require one by one
strategies = File.dirname(__FILE__) + '/strategies/'
require strategies + 'base_strategy'
require strategies + 'physical_strategy'
require strategies + 'book_strategy'
require strategies + 'digital_strategy'
require strategies + 'membership_strategy'

Dir[File.dirname(__FILE__) + '/factories/*.rb'].each {|file| require file }
Dir[File.dirname(__FILE__) + '/models/*.rb'].each {|file| require file }
