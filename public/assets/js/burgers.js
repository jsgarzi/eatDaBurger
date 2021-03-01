$(function () {
  $.ajax("/burgers", {
    type: "GET"
  }).then(function (data) {
    var ateElem = $("#ateBurgers");
    var notAteElem = $("#notAteBurgers");

    var burgs = data.burgers;
    var len = burgs.length;

    for (var i = 0; i < len; i++) {
      var new_elem =
        "<li>" +
        burgs[i].id +
        ". " + burgs[i].name 


      if (burgs[i].ate) {
        new_elem +=
          " <button class='delete-burger btn btn-danger' data-id='" +
          burgs[i].id +
          "'>Delete Time!</button></li>";
        ateElem.append(new_elem);
      } else {
        new_elem +=
        " <button class='eat btn btn-warning' data-id='" +
          burgs[i].id +
          "' data-nowate='" +
          !burgs[i].ate +
          "'>";
        new_elem += "EAT TIME!";
        new_elem += "</button></li>";
        notAteElem.append(new_elem);
      }
    }
  });

  $(document).on("click", ".eat", function (event) {
    var id = $(this).data("id");
    var nowAte = $(this).data("nowate") === true;

    var nowAteState = {
      ate: nowAte
    };

    $.ajax("/burgers/" + id, {
      type: "PUT",
      data: JSON.stringify(nowAteState),
      dataType: 'json',
      contentType: 'application/json'
    }).then(function () {
      console.log("changed ate to", nowAte);
      location.reload();
    });
  });

  $(".create-form").on("submit", function (event) {
    event.preventDefault();

    var newBurg = {
      name: $("#bur")
        .val()
        .trim(),
      ate: 0
    };

    $.ajax("/burgers", {
      type: "POST",
      data: JSON.stringify(newBurg),
      dataType: 'json',
      contentType: 'application/json'
    }).then(function () {
      console.log("created new burger");
      location.reload();
    });
  });

  $(document).on("click", ".delete-burger", function (event) {
    var id = $(this).data("id");

    $.ajax("/burgers/" + id, {
      type: "DELETE"
    }).then(function () {
      console.log("deleted burger", id);
      location.reload();
    });
  });
});
