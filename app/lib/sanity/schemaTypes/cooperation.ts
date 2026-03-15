import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cooperation',
  title: 'Cooperation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'de', title: 'German', type: 'string' },
        { name: 'zh', title: 'Chinese', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.de',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Cooperation Type',
      type: 'string',
      options: {
        list: [
          { title: 'Order Cooperation', value: 'order_cooperation' },
          { title: 'Overseas Inspection', value: 'overseas_inspection' },
          { title: 'Resource Matching', value: 'resource_matching' },
          { title: 'Technology Exchange', value: 'technology_exchange' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'de', title: 'German', type: 'text' },
        { name: 'zh', title: 'Chinese', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
      ],
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{ type: 'company' }],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Open', value: 'open' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'open',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title.de',
      subtitle: 'type',
      company: 'company.name.de',
    },
    prepare(selection) {
      const { title, subtitle, company } = selection
      return {
        title: title || 'Untitled',
        subtitle: `${subtitle || ''} - ${company || 'No company'}`,
      }
    },
  },
})
