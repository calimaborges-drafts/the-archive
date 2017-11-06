require 'test_helper'

class AuthTestControllerTest < ActionController::TestCase
  test "should get teste" do
    get :teste
    assert_response :success
  end

end
