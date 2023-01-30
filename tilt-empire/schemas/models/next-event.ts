export default {
  title: 'Next Event',
    name: 'next_event',
    type: 'document',
    fields: [
      {
        title: 'Event Title',
        name: 'title',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        title: 'Description',
        name: 'description',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        title: 'Price',
        name: 'price',
        type: 'number',
        validation: (Rule: any) => Rule.required()
      },
      {
        title: 'Currency',
        name: 'currency',
        type: 'string',
        options: {
          list: ['€', '$']
        },
        validation: (Rule: any) => Rule.required()
      },
      {
        title: 'Image',
        name: 'image',
        type: 'image',
        validation: (Rule: any) => Rule.required()
      },
      {
        title: 'Date & Time',
        name: 'datetime',
        type: 'datetime',
        validation: (Rule: any) => Rule.required()
      },
      {
        title: 'Stock (amount of tickets)',
        name: 'stock',
        type: 'number',
        validation: (Rule: any) => Rule.required()
      },
      {
        title: 'Check out link',
        name: 'checkout_link',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        title: 'Location',
        name: 'location',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        title: 'Tags',
        name: 'tags',
        type: 'array',
        of: [{type: 'string'}],
        validation: (Rule: any) => Rule.required()
      }
    ]
}
