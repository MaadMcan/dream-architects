export default {
    name: 'carousel',
    title: 'Homepage Carousel',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'subtitle',
        title: 'Subtitle',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'linkedProject',
        title: 'Linked Project',
        type: 'reference',
        to: [{ type: 'project' }],
        description: 'Select a project to link this carousel item to',
        options: {
          filter: () => {
            return {
              filter: 'defined(slug.current)'
            };
          }
        }
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
      {
        name: 'order',
        title: 'Display Order',
        type: 'number',
        validation: (Rule: any) => Rule.required(),
      },
    ],
    orderings: [
      {
        title: 'Display Order',
        name: 'orderAsc',
        by: [{ field: 'order', direction: 'asc' }],
      },
    ],
  };