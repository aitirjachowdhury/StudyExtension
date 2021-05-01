$('#sw-go').click(function(){
    $(this).find('i').toggleClass('fa-play fa-pause')
});
$('#sw-rst').click(function(){
    $('#sw-go').find('i').removeClass('fa-pause').addClass('fa-play')
});
var resting = 1;

var sw = {
    etime: null,
    erst: null,
    ego: null,
    timer: null,
    now: 0,
    init : function(){
        sw.etime = document.getElementById("sw-time");
        sw.erst = document.getElementById("sw-rst");
        sw.ego = document.getElementById("sw-go");

        sw.erst.addEventListener("click", sw.reset);
        sw.erst.disabled = false;
        sw.ego.addEventListener("click", sw.start);
        sw.ego.disabled = false;
    },
    tick: function(){
        sw.now++;
        var remain = sw.now;
        var hours = Math.floor(remain / 3600);
        remain -= hours * 3600;
        var mins = Math.floor(remain / 60);
        remain -= mins * 60;
        var secs = remain;

        if(hours < 10) {
            if(hours == resting){    
                document.getElementById('xyz').play();
                alert("You have been productive for an hour! Pause the timer and reward yourself!"); 
                resting++;}
            hours = "0" + hours;
        }
        if(mins < 10) {mins = "0" + mins;}
        if(secs < 10) {secs = "0" + secs; }
        sw.etime.innerHTML = hours + ":" + mins + ":" + secs;
    },

    start: function(){
        sw.timer = setInterval(sw.tick, 1000);
        sw.ego.removeEventListener("click", sw.start);
        sw.ego.addEventListener("click", sw.stop);
    },

    stop: function(){
        clearInterval(sw.timer);
        sw.timer = null;
        sw.ego.removeEventListener("click", sw.stop);
        sw.ego.addEventListener("click", sw.start);
    },

    reset: function(){
        if (sw.timer != null){ sw.stop();}

        sw.now = -1;
        sw.tick();
    }
};

window.addEventListener("load", sw.init);




