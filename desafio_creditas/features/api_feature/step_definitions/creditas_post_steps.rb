Dado("que eu faço um post na api do desafio") do
  @response_body = PostFactory.factory_post
  @response = CreditaPost.new.post(@response_body)
end

Quando("a api responde o status code {string} criado") do |code|
  expect(@response.conde).to eq code
end

Então("eu valido as informações que meu post foi criado") do
  binding.pry
  xpect(@response['title']).to eq @response_body['title']
  xpect(@response['body']).to eq @response_body['body']
  xpect(@response['userId']).to eq @response_body['userId']
end
