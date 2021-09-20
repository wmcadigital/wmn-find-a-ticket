const getModeThumbnails = (ticket) => {
  const modes = `${ticket.allowBus ? 'bus' : ''}${ticket.allowTrain ? 'train' : ''}${
    ticket.allowMetro ? 'tram' : ''
  }`;

  const imagePath = process.env.PUBLIC_URL;
  console.log(imagePath);

  const thumbs = {
    bus: [
      `${imagePath}/thumbnails/bus-16x9.png`,
      `${imagePath}/thumbnails/bus-4x3.png`,
      `${imagePath}/thumbnails/bus-1x1.png`,
    ],
    bustrain: [
      `${imagePath}/thumbnails/bus-train-16x9.png`,
      `${imagePath}/thumbnails/bus-train-4x3.png`,
      `${imagePath}/thumbnails/bus-train-1x1.png`,
    ],
    bustram: [
      `${imagePath}/thumbnails/bus-tram-16x9.png`,
      `${imagePath}/thumbnails/bus-tram-4x3.png`,
      `${imagePath}/thumbnails/bus-tram-1x1.png`,
    ],
    bustrainTram: [
      `${imagePath}/thumbnails/bus-train-tram-16x9.png`,
      `${imagePath}/thumbnails/bus-train-tram-4x3.png`,
      `${imagePath}/thumbnails/bus-train-tram-1x1.png`,
    ],
    train: [
      `${imagePath}/thumbnails/train-16x9.png`,
      `${imagePath}/thumbnails/train-4x3.png`,
      `${imagePath}/thumbnails/train-1x1.png`,
    ],
    tram: [
      `${imagePath}/thumbnails/tram-16x9.png`,
      `${imagePath}/thumbnails/tram-4x3.png`,
      `${imagePath}/thumbnails/tram-1x1.png`,
    ],
  };

  return thumbs[modes];
};

export default getModeThumbnails;
