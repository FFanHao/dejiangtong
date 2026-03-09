import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'engineer',
  title: 'Engineer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'object',
      fields: [
        { name: 'de', title: 'German', type: 'string' },
        { name: 'zh', title: 'Chinese', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'specialization',
      title: 'Specialization',
      type: 'object',
      fields: [
        { name: 'de', title: 'German', type: 'string' },
        { name: 'zh', title: 'Chinese', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'experience',
      title: 'Years of Experience',
      type: 'number',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'object',
      fields: [
        { name: 'de', title: 'German', type: 'text' },
        { name: 'zh', title: 'Chinese', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'chinaInterest',
      title: 'Interest in Working in China',
      type: 'string',
      options: {
        list: [
          { title: 'Very Interested', value: 'very_interested' },
          { title: 'Interested', value: 'interested' },
          { title: 'Neutral', value: 'neutral' },
          { title: 'Not Interested', value: 'not_interested' },
        ],
      },
    }),
    defineField({
      name: 'workExperience',
      title: 'Work Experience',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'company', title: 'Company', type: 'string' },
            { name: 'position', title: 'Position', type: 'string' },
            { name: 'duration', title: 'Duration', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'school', title: 'School', type: 'string' },
            { name: 'degree', title: 'Degree', type: 'string' },
            { name: 'year', title: 'Year', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn Profile',
      type: 'url',
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
      subtitle: 'title.de',
    },
  },
})
