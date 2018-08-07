Dado("que envio os parâmetros corretos para o endpoint.") do
    
    @body = {
        "title": Faker::Superhero.name,
        "body": Faker::Esport.player,
        "userId": 1
    }.to_json
    @post_api = HTTParty.post 'http://jsonplaceholder.typicode.com/posts',
      :body => @body,
      :headers => {
          "Content-Type" => 'application/json'
      }
end
  
Entao("verifico se o cliente é cadastrado com sucesso na base.") do
    puts @post_api.body
    expect(@post_api.code).to eq 201
end


