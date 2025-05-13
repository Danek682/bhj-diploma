/**
 * Основная функция для совершения запросов
 * на сервер.
 * */


const createRequest = (options = {}) => {
  const {
    method = 'GET',
    url = 'https://example.com',
    data = {},
    callback = () => {}
  } = options;

   function errorXhr () {
      xhr.onerror = function () {
      callback(new Error('Ошибка запроса'), null); // Ошибка сети
    };
   }

  const xhr = new XMLHttpRequest();

  if(method === "GET") {
   const params = new URLSearchParams(data).toString()

   if(params){
      url += '?' + params
   }

   xhr.open("GET", url)
   xhr.responseType = "json"

   xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
         callback(null, xhr.response);
      }  else {
          callback(new Error(`Ошибка: ${xhr.status}`), null)
      }
   }

    errorXhr()

   xhr.send();
  } else {
   const formData = new FormData()

      for (let key in data) {
      formData.append(key, data[key]);
    }

    xhr.open(method, url);
    xhr.responseType = 'json'; // формат, в котором необходимо выдать результат

    xhr.onload = function() {
      if(xhr.status >= 200 && xhr.status < 300) {
         callback(null, xhr.response)
      } else {
         callback(new Error(`Ошибка: ${xhr.status}`), null)
      }
    }

    errorXhr()

    xhr.send(formData)
  }
};