import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  // singletons: {
  //   home: singleton({
  //     label: 'Home',
  //     path: 'content/home',
  //     schema: {
  //       heroTitle: fields.text({
  //         label: 'Hero title',
  //         description: 'Main headline (e.g., “Let’s travel the world”)',
  //         validation: { isRequired: true },
  //       }),
  //       heroEmphasis: fields.text({
  //         label: 'Emphasis word',
  //         description: 'Word to underline/accent in the headline (e.g., “travel”)',
  //       }),
  //       heroSubcopy: fields.text({
  //         label: 'Hero subcopy',
  //         multiline: true,
  //       }),
  //       heroImages: fields.array(
  //         fields.image({
  //           label: 'Hero image',
  //           directory: 'public/images/hero',
  //           publicPath: '/images/hero/',
  //         }),
  //         {
  //           label: 'Hero images (1–3)',
  //           itemLabel: props => props.value?.filename || 'image',
  //           validation: { length: { min: 1, max: 3 } },
  //         }
  //       ),
  //       featuredPackages: fields.array(
  //         fields.relationship({
  //           label: 'Featured packages',
  //           collection: 'packages',
  //           description: 'Pick packages to show on the home page',
  //         }),
  //         {
  //           label: 'Featured packages',
  //           itemLabel: props => props.value ?? '(no label)',
  //         }
  //       ),
  //     },
  //   }),
  // },
  collections: {
    packages: collection({
      label: 'Packages',
      path: './src/content/packages/*',
      slugField: 'name',
      format: {
      contentField: 'summary',
      },
      schema: {
        name: fields.slug({ name: {label: "Title"}}),
        destination: fields.text({ label: 'Destination' }),
        durationDays: fields.integer({ label: 'Duration (days)', defaultValue: 5 }),
        priceFrom: fields.integer({ label: 'Price (from)' }),
        coverImage: fields.image({
          label: 'Cover image',
          directory: 'public/images/packages',
          publicPath: '/images/packages/',
        }),
        itinerary: fields.array(
          fields.object({
            day: fields.text({ label: 'Day' }),
            title: fields.text({label: "Title"}),
            description: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'Itinerary' }
        ),
        highlights: fields.array(fields.text({ label: 'Highlight' }), {
          label: 'Highlights',
          itemLabel: ({ value }) => value || 'highlight',
        }),
         summary: fields.markdoc({
        label: 'Short summary',
      }),
      },
    }),
  },
});
