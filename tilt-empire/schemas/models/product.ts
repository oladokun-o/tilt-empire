
export default {
  title: 'Product',
    name: 'product',
    type: 'document',
    fields: [
      {
        title: 'Name',
        name: 'name',
        type: 'string',
        required: true
      },
      {
        title: 'Description',
        name: 'description',
        type: 'string'
      },
      {
        title: 'Price',
        name: 'price',
        type: 'number'
      },
      {
        title: 'Image',
        name: 'image',
        type: 'image'
      }
    ]
}
