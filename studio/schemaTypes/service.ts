export default {
    name: 'service',
    title: 'Services',
    type: 'document',
    fields: [
      {
        name: 'number',
        title: 'Number',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'mainImage',
        title: 'Main Image',
        type: 'image',
        options: {
          hotspot: true,
        },
        validation: (Rule: any) => Rule.required(),
      },
    ],
  };