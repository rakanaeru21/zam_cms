
import {defineType, defineField} from 'sanity'

export const tennisSection = defineType({
  name: 'tennisSection',
  title: 'Tennis Court',
  type: 'document',

  fields: [
    defineField({
      name: 'label',
      title: 'Label Section',
      type: 'string',
      initialValue: 'TENNIS COURT',
    }),

    defineField({
      name: 'heading',
      title: 'Judul Tennis Court',
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
      title: 'Gambar Tennis Court',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'facilities',
      title: 'Informasi Tennis Court',
      type: 'array',
      of: [
        defineType({
          name: 'tennisInfo',
          title: 'Informasi',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Nama Informasi',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Isi Informasi',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
})
