import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'job',
  title: 'Job',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
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
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{ type: 'company' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'jobType',
      title: 'Job Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full_time' },
          { title: 'Part-time', value: 'part_time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
        ],
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        { name: 'de', title: 'German', type: 'string' },
        { name: 'zh', title: 'Chinese', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'salaryRange',
      title: 'Salary Range',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Job Description',
      type: 'object',
      fields: [
        { name: 'de', title: 'German', type: 'array', of: [{ type: 'block' }] },
        { name: 'zh', title: 'Chinese', type: 'array', of: [{ type: 'block' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
      ],
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'object',
      fields: [
        { name: 'de', title: 'German', type: 'array', of: [{ type: 'block' }] },
        { name: 'zh', title: 'Chinese', type: 'array', of: [{ type: 'block' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
      ],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'object',
      fields: [
        { name: 'de', title: 'German', type: 'array', of: [{ type: 'block' }] },
        { name: 'zh', title: 'Chinese', type: 'array', of: [{ type: 'block' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
      ],
    }),
    defineField({
      name: 'experienceLevel',
      title: 'Experience Level',
      type: 'string',
      options: {
        list: [
          { title: 'Entry Level', value: 'entry' },
          { title: 'Mid Level', value: 'mid' },
          { title: 'Senior Level', value: 'senior' },
          { title: 'Executive', value: 'executive' },
        ],
      },
    }),
    defineField({
      name: 'educationLevel',
      title: 'Education Level',
      type: 'string',
      options: {
        list: [
          { title: 'High School', value: 'high_school' },
          { title: 'Bachelor', value: 'bachelor' },
          { title: 'Master', value: 'master' },
          { title: 'PhD', value: 'phd' },
        ],
      },
    }),
    defineField({
      name: 'languageRequirements',
      title: 'Language Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'German (Native)', value: 'german_native' },
          { title: 'German (Fluent)', value: 'german_fluent' },
          { title: 'German (Basic)', value: 'german_basic' },
          { title: 'English (Fluent)', value: 'english_fluent' },
          { title: 'English (Basic)', value: 'english_basic' },
          { title: 'Chinese (Fluent)', value: 'chinese_fluent' },
          { title: 'Chinese (Basic)', value: 'chinese_basic' },
        ],
        layout: 'list',
      },
    }),
    defineField({
      name: 'applicationEmail',
      title: 'Application Email',
      type: 'email',
    }),
    defineField({
      name: 'applicationUrl',
      title: 'Application URL',
      type: 'url',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title.de',
      subtitle: 'company.name.de',
    },
  },
})
