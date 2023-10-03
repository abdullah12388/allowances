var task_select = document.getElementById('task_select');
task_select.addEventListener('change', function(){
    console.log(this.options[this.selectedIndex].value);
    get_selects_data(this.options[this.selectedIndex].id);
    if(this.options[this.selectedIndex].value == 7){
        document.getElementById('ticket_row').classList.remove('d-none');
    }else{
        document.getElementById('ticket_row').classList.add('d-none');
    }
})

function get_selects_data(type){
    $.ajax({
        url: "/system/Task/api/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            // console.log(data);
            var userid = document.getElementById('userid').value;
            // Get a reference to the SelectPicker element
            var eng_selectPicker = $('#eng_select');
            var tech_selectPicker = $('#tech_select');
            var station_selectPicker = $('#station_select');
            // var task_selectPicker = $('#task_select');

            // reset before assign
            var eng_defaultOption = eng_selectPicker.find('option[value=""]')[0].outerHTML;
            var tech_defaultOption = tech_selectPicker.find('option[value=""]')[0].outerHTML;
            var station_defaultOption = station_selectPicker.find('option[value=""]')[0].outerHTML;
            // var task_defaultOption = task_selectPicker.find('option[value=""]')[0].outerHTML;
            eng_selectPicker.empty('');
            tech_selectPicker.empty('');
            station_selectPicker.empty('');
            // task_selectPicker.empty('');
            eng_selectPicker.append(eng_defaultOption);
            tech_selectPicker.append(tech_defaultOption);
            station_selectPicker.append(station_defaultOption);
            // task_selectPicker.append(task_defaultOption);
            eng_selectPicker.selectpicker("refresh");
            tech_selectPicker.selectpicker("refresh");
            station_selectPicker.selectpicker("refresh");
            // task_selectPicker.selectpicker("refresh");
            // Loop through the data and add options to the SelectPicker
            data.eng_list.forEach(function(item) {
                eng_selectPicker.append($('<option>', {
                    value: item.id,
                    text: `${item.first_name} ${item.last_name}`
                }));
            });
            data.tech_list.forEach(function(item) {
                tech_selectPicker.append($('<option>', {
                    value: item.id,
                    text: `${item.first_name} ${item.last_name}`
                }));
            });
            data.station_list.forEach(function(item) {
                station_selectPicker.append($('<option>', {
                    value: item.id,
                    text: item.station_id
                }));
            });
            // data.task_list.forEach(function(item) {
            //     task_selectPicker.append($('<option>', {
            //         value: item.id,
            //         text: item.name
            //     }));
            // });

            // Initialize the SelectPicker
            eng_selectPicker.selectpicker("refresh");
            eng_selectPicker.val(userid);
            eng_selectPicker.selectpicker("refresh");
            tech_selectPicker.selectpicker("refresh");
            station_selectPicker.selectpicker("refresh");
            // task_selectPicker.selectpicker("refresh");
            if(type == 'single'){
                document.getElementById('eng_row').classList.remove('d-none');
                document.getElementById('tech_row').classList.add('d-none');
                document.getElementById('eng_rep_row').classList.add('d-none');
            }else if(type == 'multi'){
                document.getElementById('eng_row').classList.add('d-none');
                document.getElementById('tech_row').classList.remove('d-none');
                document.getElementById('eng_rep_row').classList.remove('d-none');
            }else{
                document.getElementById('eng_row').classList.add('d-none');
                document.getElementById('tech_row').classList.remove('d-none');
                document.getElementById('eng_rep_row').classList.add('d-none');
            }
        },
    });
}