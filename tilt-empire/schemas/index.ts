import countdown from './models/countdown';
import Events from './models/events';
import NextEvent from './models/next-event';
import raffle from './models/raffle';
import reviews from './models/reviews';
import AboutUs from './models/about'
import video from './models/video';

export const schemaTypes = [Events, NextEvent, raffle, reviews, countdown, AboutUs, video];
