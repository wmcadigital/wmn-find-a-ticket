import bus16x9 from 'assets/images/thumbnails/bus-16x9.png';
import bus4x3 from 'assets/images/thumbnails/bus-4x3.png';
import bus1x1 from 'assets/images/thumbnails/bus-1x1.png';
import busTrain16x9 from 'assets/images/thumbnails/bus-train-16x9.png';
import busTrain4x3 from 'assets/images/thumbnails/bus-train-4x3.png';
import busTrain1x1 from 'assets/images/thumbnails/bus-train-1x1.png';
import busTram16x9 from 'assets/images/thumbnails/bus-tram-16x9.png';
import busTram4x3 from 'assets/images/thumbnails/bus-tram-4x3.png';
import busTram1x1 from 'assets/images/thumbnails/bus-tram-1x1.png';
import busTrainTram16x9 from 'assets/images/thumbnails/bus-train-tram-16x9.png';
import busTrainTram4x3 from 'assets/images/thumbnails/bus-train-tram-4x3.png';
import busTrainTram1x1 from 'assets/images/thumbnails/bus-train-tram-1x1.png';
import tram16x9 from 'assets/images/thumbnails/tram-16x9.png';
import tram4x3 from 'assets/images/thumbnails/tram-4x3.png';
import tram1x1 from 'assets/images/thumbnails/tram-1x1.png';
import train16x9 from 'assets/images/thumbnails/train-16x9.png';
import train4x3 from 'assets/images/thumbnails/train-4x3.png';
import train1x1 from 'assets/images/thumbnails/train-1x1.png';

const getModeThumbnails = (ticket) => {
  const modes = `${ticket.allowBus ? 'bus' : ''}${ticket.allowTrain ? 'train' : ''}${
    ticket.allowMetro ? 'tram' : ''
  }`;

  const thumbs = {
    bus: [bus16x9, bus4x3, bus1x1],
    bustrain: [busTrain16x9, busTrain4x3, busTrain1x1],
    bustram: [busTram16x9, busTram4x3, busTram1x1],
    bustrainTram: [busTrainTram16x9, busTrainTram4x3, busTrainTram1x1],
    train: [train16x9, train4x3, train1x1],
    tram: [tram16x9, tram4x3, tram1x1],
  };

  return thumbs[modes];
};

export default getModeThumbnails;
