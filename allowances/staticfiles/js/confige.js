function fillTanksSelect(siteid){
    const buttons = document.querySelectorAll('.tank-toggle-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById('T_'+siteid).classList.add('active');
    document.getElementById('siteid').value = siteid;
    // console.log(siteid);
    $.ajax({
        url: "/tank/api/tanks/configurations/" + siteid + "/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            tankselect = document.getElementById('tankselect');
            tankselect.value = '';
            t.forEach((element)=>{
                var option = document.createElement('option');
                option.setAttribute('id', element.id);
                option.setAttribute('value', `${element.capacity}:${element.prodvol}:${element.fusiontankid}:${element.id}`);
                option.setAttribute('rate', element.rate);
                option.innerHTML = 'Tank '+ element.fusiontankid;
                tankselect.add(option);
            })
            tankselect.disabled = false;
            tankselect.addEventListener('change', function() {
                var selectedOption = tankselect.options[tankselect.selectedIndex];
                document.getElementById('currentrate').value = selectedOption.getAttribute('rate');

                var capacity = parseInt((this.value).split(':')[0]);
                var volume = parseInt((this.value).split(':')[1]);
                var name = 'Tank ' + (this.value).split(':')[2];
                var precent = (volume*100)/capacity
                var diff = capacity - volume;
                // console.log(capacity, volume, precent);
                document.getElementById('capacity').innerHTML = capacity;
                document.getElementById('tank_name').innerHTML = name;
                document.getElementById('tank_product').style.height = precent + '%';
                document.getElementById('volume').innerHTML = volume;
                document.getElementById('current_volume').innerHTML = volume;
                document.getElementById('capacity').style.transition = 'all 1s';
                document.getElementById('tank_name').style.transition = 'all 1s';
                document.getElementById('tank_product').style.transition = 'all 1s';
                document.getElementById('volume').style.transition = 'all 1s';
            });
        },
    });
    deleteOptionsExceptFirst(document.getElementById('tankselect'));
    document.getElementById('currentrate').value = '0.000';
    document.getElementById('capacity').innerHTML = '00000';
    document.getElementById('tank_name').innerHTML = 'Tank #';
    document.getElementById('tank_product').style.height = '0%';
    document.getElementById('volume').innerHTML = '00000';
    document.getElementById('current_volume').innerHTML = '00000';
}


function deleteOptionsExceptFirst(selectElement) {
    var options = selectElement.getElementsByTagName('option');
    for (var i = options.length - 1; i > 0; i--) {
        selectElement.removeChild(options[i]);
    }
}


// function updateTankRate(){
//     var siteid = document.getElementById('h_siteid').value;
//     var tankid = document.getElementById('h_tankid').value;
//     var newrate = document.getElementById('newrate').value;
//     // const csrfToken = "{{ csrf_token }}";
//     $.ajax({
//         url: "/tank/api/tanks/configurations/update/"+ siteid + '/' + tankid + '/' + newrate + '/',
//         method: "GET",
//         dataType: "json",
//         success: function (t) {
//             console.log(t);
//             document.getElementById('newrate').value = '';
//             document.getElementById('currentrate').value = t.result;
//         },
//     });
// }



$(function () {
    $("#siteTankConfigeSearch").on("keyup", function () {
        var searchTerm = $(this).val().toLowerCase();
        $("#siteTankConfigeResultContainer > button").filter(function () {
            var divText = $(this).text().toLowerCase();
            var isMatch = divText.indexOf(searchTerm) > -1;
            $(this).toggle(isMatch);
            return isMatch;
        });
    });

    $("#updateForm").submit(function(event) {
        event.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            url: $(this).attr('action'),
            type: $(this).attr('method'),
            data: formData,
            dataType: 'json',
            success: function(response) {
                document.getElementById('currentrate').value = response.rate;
                document.getElementById(response.tankid).setAttribute('rate', response.rate);
                document.getElementById('newrate').value = '';
            },
        });
    });
});