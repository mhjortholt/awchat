function log(s) {
  console.log(s);
}

function get(url, callback) {
  $.ajax({
    url: url,
    type: 'GET',
    contentType: 'application/json',
    success: function(response) {
      log(response)
      callback(response);
    },
    error: function(e) {
      log(e);
    }
  });
}

function post(url, data, callback) {
  $.ajax({
    url: url,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function(response){
      log(response);
      callback(response);
    },
    error: function(e) {
      log(e);
    }
  })
}

function streamVideo(stream, video) {
  if ('srcObject' in video) {
    video.srcObject = stream;
  } else {
    video.src = window.URL.createObjectURL(stream);
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

var user_id = localStorage.getItem('user_id');
if(!user_id) {
  user_id = uuidv4();
  localStorage.setItem('user_id', user_id);
}







