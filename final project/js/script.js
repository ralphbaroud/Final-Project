var tbody = d3.select("tbody");

console.log(data);
data.forEach((asset_row) => {
  var row = tbody.append("tr");
  Object.entries(asset_row).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
  });
});

$(document).ready( function () {
  $('#tableInfo').DataTable();
} );