import countdown from './models/countdown';
import Events from './models/events';
import NextEvent from './models/next-event';
import raffle from './models/raffle';
import reviews from './models/reviews';

export const schemaTypes = [Events, NextEvent, raffle, reviews, countdown];
