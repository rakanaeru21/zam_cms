import {defineType, defineField} from 'sanity'

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Daftar Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Menu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Foto Menu',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'price',
      title: 'Harga (Rupiah)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{type: 'menuCategory'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Menu Signature / Unggulan',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isAvailable',
      title: 'Menu Tersedia',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampilan',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'category.title',
    },
  },
})