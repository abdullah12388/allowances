$(function () {
    document.getElementById('tanks_select').addEventListener("change", function () {
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
        document.getElementById('amount').min = 0;
        document.getElementById('amount').max = diff;
        document.getElementById('amount').disabled = false;
    });

    document.getElementById('amount').addEventListener("keyup", function () {
        var capacity = parseInt(document.getElementById('capacity').innerHTML);
        var precent = parseFloat(((this.value)*100)/capacity);
        var current_height = parseFloat(document.getElementById('tank_product').style.height);
        var volume = document.getElementById('current_volume').innerHTML;
        var diff = parseInt(capacity) - parseInt(volume);
        
        if(parseInt(this.value) <= parseInt(diff)){
            document.getElementById('tank_delivery').style.bottom = current_height + '%';
            document.getElementById('tank_delivery').style.height = precent + '%';
            document.getElementById('volume').innerHTML = parseInt(volume) + parseInt(this.value);
            document.getElementById('tank_delivery').style.transition = 'all 1s';
            document.getElementById('volume').style.transition = 'all 1s';
        }
        else{
            document.getElementById('validation').innerHTML = 'Max = ' + diff;
            document.getElementById('validation').style.display = 'block';
            document.getElementById('validation').style.transition = 'all 1s';

        }
    });
})