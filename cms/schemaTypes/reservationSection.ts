
import {defineType, defineField} from 'sanity'

export const reservationSection = defineType({
  name: 'reservationSection',
  title: 'Reservation',
  type: 'document',

  fields: [
    defineField({
      name: 'label',
      title: 'Label Section',
      type: 'string',
      initialValue: 'RESERVATION',
    }),

    defineField({
      name: 'heading',
      title: 'Judul Reservasi',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'description',
      title: 'Deskripsi Reservasi',
      type: 'text',
      rows: 5,
    }),

    defineField({
      name: 'note',
      title: 'Catatan Reservasi',
      type: 'text',
      rows: 3,
    }),
  ],
})
