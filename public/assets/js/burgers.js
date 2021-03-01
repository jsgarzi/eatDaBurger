$(function() {
  $.ajax("/burgers", {
    type: "GET"
  }).then(function(data) {
    var ateElem = $("ateBurgers");
    var notAteElem = $("#notAteBurgers");

    var burgs = data.burgers;
    var len = burgers.length;

    for (var i = 0; i < len; i++) {
      var new_elem =
        "<li>" +
        burgs[i].id + 
        ". "+burgs[i].name +
        "<button class='eat' data-id='" +
        burgs[i].id +
        "' data-nowate='" +
        !burgs[i].ate +
        "'>";

        if (burgs[i].ate) {
        new_elem += "EAT TIME!";
      } else {
        new_elem += "ATE!";
      }

      new_elem += "</button>";

      new_elem +=
        "<button class='delete-burger' data-id='" +
        burgs[i].id +
        "'>ATE!</button></li>";

      if (burgs[i].ate) {
        ateElem.append(new_elem);
      } else {
        NotAteElem.append(new_elem);
      }
    }
  });

  $(document).on("click", ".eat", function(event) {
    var id = $(this).data("id");
    var nowAte = $(this).data("nowate")===true;

    var nowAteState = {
      ate: nowAte
    };

    $.ajax("/burgers/" + id, {
      type: "PUT",
      data: JSON.stringify(nowAteState),
      dataType:'json',
      contentType: 'application/json'
    }).then(function() {
      console.log("changed ate to", nowAte);
      location.reload();
    });
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();

    var newBurg = {
      name: $("#bur")
        .val()
        .trim(),
      ate: $("[name=ate]:checked")
        .val()
        .trim()
    };

    $.ajax("/burgers", {
      type: "POST",
      data: JSON.stringify(newBurg),
      dataType:'json',
      contentType: 'application/json'
    }).then(function() {
      console.log("created new burger");
      location.reload();
    });
  });

  $(document).on("click", ".delete-burger", function(event) {
    var id = $(this).data("id");

    $.ajax("/burgers/" + id, {
      type: "DELETE"
    }).then(function() {
      console.log("deleted burger", id);
      location.reload();
    });
  });
});
