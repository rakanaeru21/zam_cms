import {defineType, defineField} from 'sanity'

export const menuCategory = defineType({
  name: 'menuCategory',
  title: 'Kategori Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Kategori',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Kategori',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'eyebrow',
      title: 'Label Kecil',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampilan',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'isActive',
      title: 'Tampilkan Kategori',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
  },
})