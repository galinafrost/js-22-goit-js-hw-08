import Player from '@vimeo/player';
import localstorageApi from "./localstorage"
import throttle from 'lodash.throttle';

const KEY_TIME_LOCAL_STORAGE = 'videoplayer-current-time'
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
    
const onTime = function(event) {
    const seconds = event.seconds
    localstorageApi.save(KEY_TIME_LOCAL_STORAGE, seconds)
}

player.on('timeupdate', throttle(onTime, 1000));

if (localstorageApi.load(KEY_TIME_LOCAL_STORAGE)) {
    player.setCurrentTime(localstorageApi.load(KEY_TIME_LOCAL_STORAGE))
}
