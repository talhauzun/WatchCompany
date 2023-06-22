//This is the data of table

var data=[{
        "id": 0,
        "name": "device1",
        "devicestatus": "",
        "power": "5555",
        "time":"updatetime"
    },
    {
        "id": 1,
        "name": "device2",
        "devicestatus": "",
        "power": "6666",
        "time":"updatetime1"
    }];

//This is the title of table
var columns = [
  [{"field":"status",
    "checkbox":true,
    "colspan": 1,
    "rowspan": 2,
    "align":"center",
    "valign":"middle"
  },{
    "field": "id",
    "title": "78965",
    "colspan": 1,
    "rowspan": 2,
    "align":"center",
    "valign":"middle"
  }, {
    "title": "equipment 1",
    "colspan": 4,
    "rowspan": 1,
    "align":"center",
    "valign":"middle"
  }], 
  [{
    "field": "name",
    "title": "device1",
    "colspan": 1,
    "rowspan": 1,
    "align":"center",
    "valign":"middle"
  }, {
    "field": "devicestatus",
    "title": "okey",
    "class":"statusbtn",
    "colspan": 1,
    "rowspan": 1,
    "align":"center",
    "valign":"middle"
  }, {
    "field": "power",
    "class":"powerrate",
    "title": "Cumulative Electricity",
    "colspan": 1,
    "rowspan": 1,
    "align":"center",
    "valign":"middle"
  }, {
    "field": "time",
    "class":"updatetime",
    "title": "2023-06-22 10:30:00",
    "colspan": 1,
    "rowspan": 1,
    "align":"center",
    "valign":"middle"
  }]
];


$(function() {
  $('#table').bootstrapTable({
    data:data,
    columns: columns,
    clickToSelect: true
  });
});

var statusbtn='<div class="btn-group" data-toggle="buttons-radio">'+
        '<button id="btnopen"  class="btn btn-primary">Open</button>'+
        '<button id="btnclose" class="btn">Close</a>'+
        '</div>';


$(function(){
$('.statusbtn:gt(0)').append(statusbtn);
});

$(function(){
$('#btnopen').click(function(){
  $.get("http://192.168.1.8:1984/led/open");
});
$('#btnclose').click(function(){
  $.get("http://192.168.1.8:1984/led/close");
});
});

var $table = $('#table'),
    $button = $('#remove');
  $(function () {
        $button.click(function () {
            var ids = $.map($table.bootstrapTable('getSelections'), function (row) {
                return row.id;
            });
            $table.bootstrapTable('remove', {
                field: 'id',
                values: ids
            });
            $(function(){
            $('.statusbtn:gt(0)').append(statusbtn);
            $('#btnopen').click(function(){
                $.get("http://192.168.1.8:1984/led/open");
            });
            $('#btnclose').click(function(){
                $.get("http://192.168.1.8:1984/led/close");
            });
            });
        });
    });


