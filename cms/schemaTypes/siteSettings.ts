
import {defineType, defineField} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Pengaturan Website',
  type: 'document',

  fields: [
    defineField({
      name: 'siteName',
      title: 'Nama Website',
      type: 'string',
      initialValue: 'Zamzam Cafe & Shisha Lounge',
    }),
    defineField({
      name: 'heroLabel',
      title: 'Label Hero',
      type: 'string',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Judul Hero',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroDescription',
      title: 'Deskripsi Hero',
      type: 'text',
    }),
    defineField({
      name: 'heroImage',
      title: 'Gambar Hero',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroServices',
      title: 'Daftar Layanan Hero',
      type: 'string',
    }),
    defineField({
      name: 'openingHours',
      title: 'Jam Operasional',
      type: 'string',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Nomor WhatsApp Reservasi',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'address',
      title: 'Alamat',
      type: 'text',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
    }),
  ],
})
