
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.responseType = "json";
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};

var addDatalist = function(search) {
    var datalist = document.getElementById("search-datalist");

    search.forEach(function(value) {
        var option = document.createElement("option");
        option.setAttribute("value", value.title);
        datalist.appendChild(option);
    });
    var input = document.getElementById("search-input");
    input.setAttribute("list", "search-datalist");
    input.addEventListener("input", function(e) {
        var option = datalist.querySelector("[value='" +
                                            input.value.toString() + "']");
        if (option) {
            window.location.pathname = input.value;
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    var search = JSON.parse(localStorage.getItem("dylaniki_search"));
    var age = parseInt(localStorage.getItem("dylaniki_date"));
    if (!search || Date.now() - age > 172800000) {
        getJSON("/search.json", function(error, data) {
            if (error)
                return;
            console.log("data", data);
            localStorage.setItem("dylaniki_search",
                                 JSON.stringify(data));
            addDatalist(search);
        });
    } else {
        addDatalist(search);
    }

    var input = document.getElementById("search-input");
    input.addEventListener("keyup", function(e) {
        e = e || window.event;
        if (e.keyCode == 13) {
            var input = e.srcElement || e.target;
            window.location.pathname = input.value;
        }
    }, true)
}, false);
