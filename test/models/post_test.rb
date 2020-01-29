require 'test_helper'

class PostTest < ActiveSupport::TestCase
  test "2 sample Posts" do
    assert_equal 2, Post.count
  end
end
