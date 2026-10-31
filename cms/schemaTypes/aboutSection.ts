import {defineType, defineField} from 'sanity'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'Tentang Kami',
  type: 'document',

  fields: [
    defineField({
      name: 'label',
      title: 'Label Section',
      type: 'string',
      initialValue: 'ABOUT US',
    }),

    defineField({
      name: 'heading',
      title: 'Judul Tentang',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      rows: 5,
    }),

    defineField({
      name: 'image',
      title: 'Gambar Tentang',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'estYear',
      title: 'Tahun Berdiri',
      type: 'string',
    }),

    defineField({
      name: 'estText',
      title: 'Keterangan Tahun Berdiri',
      type: 'string',
    }),
  ],
})