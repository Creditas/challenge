@extends('layout')
@section('content')
    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form class="space-y-6" action="#" method="POST">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
                        <div class="mt-1">
                             <input id="name" name="customer[name]" type="email"  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                    </div>

                    <div>
                        <label for="cpf" class="block text-sm font-medium text-gray-700">CPF</label>
                        <div class="mt-1">
                            <input id="cpf" name="customer[cpf]" type="text"  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                    </div>

                    <div>
                        <label for="age" class="block text-sm font-medium text-gray-700">Idade</label>
                        <div class="mt-1">
                            <input id="age" name="customer[]" type="text"  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                    </div>

                    <div>
                        <label for="location" class="block text-sm font-medium text-gray-700">Estado</label>
                        <div class="mt-1">
                            <input id="location" name="customer[]" type="text"  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                    </div>

                    <div>
                        <label for="income" class="block text-sm font-medium text-gray-700">Renda</label>
                        <div class="mt-1">
                            <input id="income" name="customer[]" type="text"  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
