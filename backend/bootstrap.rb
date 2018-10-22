# Load project files
PROJECT_ROOT = File.expand_path(File.dirname(__FILE__))
Dir.glob(File.join(PROJECT_ROOT, "lib", "**", "*.rb")).each { |file| require file }
