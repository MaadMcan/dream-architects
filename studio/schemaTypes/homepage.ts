export default {
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    fields: [
      {
        name: 'dreamStatement',
        title: 'Dream Statement Section',
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
            name: 'projectImages',
            title: 'Project Images',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                  },
                  {
                    name: 'category',
                    title: 'Category',
                    type: 'string',
                  },
                  {
                    name: 'image',
                    title: 'Image',
                    type: 'image',
                    options: { hotspot: true },
                  },
                ],
              },
            ],
            validation: (Rule: any) => Rule.required().min(1),
          },
        ],
      },
      {
        name: 'quote',
        title: 'Quote Section',
        type: 'object',
        fields: [
          {
            name: 'text',
            title: 'Quote Text',
            type: 'text',
            validation: (Rule: any) => Rule.required(),
          },
        ],
      },
      {
        name: 'designPhilosophy',
        title: 'Design Philosophy Section',
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'text',
            validation: (Rule: any) => Rule.required(),
          },
        ],
      },
      {
        name: 'servicesSection',
        title: 'Services Section',
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
        ],
      },
    ],
  };