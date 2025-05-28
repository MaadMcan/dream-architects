export default {
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
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
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'vision',
      title: 'Vision',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'mission',
      title: 'Mission',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coreValues',
      title: 'Core Values',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'story',
      title: 'Our Story',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'text' }],
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'philosophy',
      title: 'Design Philosophy',
      type: 'object',
      fields: [
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
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'text',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'author',
          title: 'Author',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'role',
          title: 'Role',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
  ],
};