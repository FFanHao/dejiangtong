import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
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
        source: 'name.de',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
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
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          { title: 'Automotive', value: 'automotive' },
          { title: 'Machinery & Engineering', value: 'machinery' },
          { title: 'Electronics', value: 'electronics' },
          { title: 'Chemicals', value: 'chemicals' },
          { title: 'Medical', value: 'medical' },
          { title: 'Energy', value: 'energy' },
          { title: 'IT & Software', value: 'it' },
          { title: 'Finance', value: 'finance' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'companySize',
      title: 'Company Size',
      type: 'string',
      options: {
        list: [
          { title: '1-50 employees', value: '1-50' },
          { title: '51-200 employees', value: '51-200' },
          { title: '201-500 employees', value: '201-500' },
          { title: '501-1000 employees', value: '501-1000' },
          { title: '1000+ employees', value: '1000+' },
        ],
      },
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'headquarters',
      title: 'Headquarters',
      type: 'object',
      fields: [
        { name: 'de', title: 'German', type: 'string' },
        { name: 'zh', title: 'Chinese', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'chinaPresence',
      title: 'China Presence',
      type: 'object',
      fields: [
        { name: 'hasOffice', title: 'Has Office in China', type: 'boolean' },
        { name: 'officeLocation', title: 'Office Location', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
      ],
    }),
    defineField({
      name: 'contactPerson',
      title: 'Contact Person',
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'email', title: 'Email', type: 'email' },
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'position', title: 'Position', type: 'string' },
      ],
    }),
    defineField({
      name: 'lookingFor',
      title: 'Looking For',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'German Engineers', value: 'german_engineers' },
          { title: 'Chinese Engineers', value: 'chinese_engineers' },
          { title: 'Technical Consultants', value: 'consultants' },
          { title: 'Joint Venture Partners', value: 'jv_partners' },
        ],
        layout: 'list',
      },
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name.de',
      subtitle: 'industry',
    },
  },
})
