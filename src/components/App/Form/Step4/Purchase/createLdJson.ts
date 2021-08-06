import { Ticket } from '../../types/Tickets.types';

export default (ticket: Ticket) => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: ticket.name,
    image: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg',
    ],
    description: ticket.summary,
    brand: {
      '@type': 'Brand',
      name: ticket.operator || 'Transport for West Midlands',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://example.com/anvil',
      priceCurrency: 'GBP',
      price: ticket.ticketCurrentAmount,
    },
  };
};
