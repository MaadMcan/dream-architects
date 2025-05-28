export default {
    name: 'about',
    title: 'About',
    type: 'document',
    fields: [
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
    ],
  };