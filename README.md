Wersja javascriptowa mojego zadania rekrutacyjnego.
Aby je uruchomić należy pobrać repozytorium, zainstalować zależności za pomocą "npm install".
Następnie utworzyć plik .env który ma zawierać:

CONNECTION_URL=
PORT=5000

Port jest dowolny, natomiast jako connection url można podać stworzoną na potrzeby tego zadania bazę mongodb: 
mongodb+srv://marcinherman:H1xExVDvM52XBq6u@marcinherman.0kfrpvw.mongodb.net/?retryWrites=true&w=majority

Całość uruchamiamy komendą "npm start".

Dostępne ścieżki routingu: 

/api/product/:id - metoda GET, w miejsce :id wpisujemy id produktu, np /api/product/636b7df6612ff1da2af6def2
/api/products-list - metoda GET
/api/product-update - metoda PUT, przykładowe body powinno zawierać: { id: 636b7df6612ff1da2af6def2, name: Produkt2, price: 40.00 }
/api/product-delete/:id - metoda DELETE, w miejsce :id wpisujemy id produktu
/api/product-create - metoda POST, przykładowe body powinno zawierać: { name: Produkt3, price: 20.99 }