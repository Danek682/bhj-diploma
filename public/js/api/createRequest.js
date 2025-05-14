/**
 * Основная функция для совершения запросов
 * на сервер.
 * */


const createRequest = (options = {}) => {
  let {
    method = 'GET',
    url = '',
    data = {},
    callback = () => {}
  } = options;


  const xhr = new XMLHttpRequest();
  let formData = null;

  if(method === "GET") {
   const params = new URLSearchParams(data).toString()

   if(params){
      url += '?' + params
   } } else {

   formData = new FormData()
      for (let key in data) {
      formData.append(key, data[key]);
    }
  }
  
   xhr.open(method, url)
   xhr.responseType = "json"

   xhr.onload = function() {
      callback(null, xhr.response);
   }

    xhr.onerror = function () {
      callback(new Error('Ошибка запроса'), null); // Ошибка сети
    };
    
   xhr.send(formData);
};