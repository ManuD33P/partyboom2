

function EffectSonic(listeners){
    this.listeners = listeners
    this.reloj = "https://cdn.pixabay.com/download/audio/2022/08/24/audio_c578ff4d11.mp3?filename=clock-ticking-60-second-countdown-118231.mp3";
    this.bomb  = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c2e92f2929.mp3?filename=explosion-80108.mp3"
}

EffectSonic.prototype.sendEffect = function(){
    var reloj = this.reloj
    this.listeners.forEach(function(listener){
            if(user(listener.name).canHTML){
                user(listener.name).sendHTML('<div id="topiccont"><embed height="0.0000000000001" width="0.0000000000001" autostart="true" src="'+reloj+'"></div>')
            }
        })
}

EffectSonic.prototype.sendBomb = function(){
    var bomb = this.bomb
    this.listeners.forEach(function(listener){
        if(user(listener.name).canHTML){
            user(listener.name).sendHTML('<div id="topiccont"><embed height="0.0000000000001" width="0.0000000000001" autostart="true" src="'+bomb+'"></div>')
        }
    })
}