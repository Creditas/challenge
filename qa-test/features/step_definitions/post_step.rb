Dado('que eu envie os parametros corretos para a API JsonPlaceHolder') do
  @body = {
    "userId": 14,
    "title": Faker::Pokemon.name,
    "body": Faker::StarWars.planet,
  }.to_json
  @post_api = HTTParty.post 'http://jsonplaceholder.typicode.com/posts',
    :body => @body,
    :headers => {
        "Content-Type" => 'application/json'
    }
  end
  
  Entao('o Post foi feito com sucesso') do
    puts @post_api.body
    expect(@post_api.code).to eq 201
    puts @post_api.code
  end
  