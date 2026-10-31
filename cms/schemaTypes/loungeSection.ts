
import {defineType, defineField} from 'sanity'

export const loungeSection = defineType({
  name: 'loungeSection',
  title: 'Lounge & Facilities',
  type: 'document',

  fields: [
    defineField({
      name: 'label',
      title: 'Label Section',
      type: 'string',
      initialValue: 'LOUNGE & FACILITIES',
    }),

    defineField({
      name: 'heading',
      title: 'Judul Lounge',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'description',
      title: 'Deskripsi Lounge',
      type: 'text',
      rows: 5,
    }),

    defineField({
      name: 'image',
      title: 'Gambar Utama Lounge',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'facilities',
      title: 'Daftar Fasilitas',
      type: 'array',
      of: [
        defineType({
          name: 'loungeFacility',
          title: 'Fasilitas',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nama Fasilitas',
              type: 'string',
            }),

            defineField({
              name: 'description',
              title: 'Deskripsi Fasilitas',
              type: 'text',
              rows: 3,
            }),
          ],
        }),
      ],
    }),
  ],
})
