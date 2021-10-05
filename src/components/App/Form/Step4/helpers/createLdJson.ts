import { Ticket } from '../../types/Tickets.types';
import getModeThumbnails from './getModeThumbnails';

export default (ticket: Ticket) => {
  const thumbs = getModeThumbnails(ticket);

  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: ticket.name,
    image: thumbs,
    description: ticket.summary,
    brand: {
      '@type': 'Brand',
      name: ticket.operator || 'Transport for West Midlands',
    },
    offers: {
      '@type': 'Offer',
      // url: 'https://example.com/anvil',
      priceCurrency: 'GBP',
      price: ticket.ticketCurrentAmount,
    },
  };
};
