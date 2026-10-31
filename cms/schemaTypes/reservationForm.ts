
import {defineType, defineField} from 'sanity'

export const reservationForm = defineType({
  name: 'reservationForm',
  title: 'Pengaturan Form Reservasi',
  type: 'document',

  fields: [
    defineField({
      name: 'formTitle',
      title: 'Judul Form',
      type: 'string',
      initialValue: 'Book Your Experience',
    }),

    defineField({
      name: 'formDescription',
      title: 'Deskripsi Form',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'nameLabel',
      title: 'Label Nama',
      type: 'string',
    }),

    defineField({
      name: 'namePlaceholder',
      title: 'Placeholder Nama',
      type: 'string',
    }),

    defineField({
      name: 'phoneLabel',
      title: 'Label Nomor Telepon',
      type: 'string',
    }),

    defineField({
      name: 'phonePlaceholder',
      title: 'Placeholder Nomor Telepon',
      type: 'string',
    }),

    defineField({
      name: 'dateLabel',
      title: 'Label Tanggal',
      type: 'string',
    }),

    defineField({
      name: 'timeLabel',
      title: 'Label Waktu',
      type: 'string',
    }),

    defineField({
      name: 'guestLabel',
      title: 'Label Jumlah Tamu',
      type: 'string',
    }),

    defineField({
      name: 'guestOptions',
      title: 'Pilihan Jumlah Tamu',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'typeLabel',
      title: 'Label Jenis Reservasi',
      type: 'string',
    }),

    defineField({
      name: 'reservationTypes',
      title: 'Pilihan Jenis Reservasi',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'messageLabel',
      title: 'Label Pesan Tambahan',
      type: 'string',
    }),

    defineField({
      name: 'messagePlaceholder',
      title: 'Placeholder Pesan Tambahan',
      type: 'string',
    }),

    defineField({
      name: 'submitText',
      title: 'Teks Tombol Submit',
      type: 'string',
      initialValue: 'BOOK NOW',
    }),
  ],
})
