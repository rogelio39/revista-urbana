import { Resend } from 'resend';

export const resend = new Resend('re_3vpW9EMB_2ih4Z1jsGkVcAh2he2BCCta3');



// await resend.emails.send({
//     from: '',
//     to: ['delivered@resend.dev'],
//     subject: 'hello world',
//     text: 'it works!',
//     attachments: [
//         {
//             filename: 'invoice.pdf',
//             content: invoiceBuffer,
//         },
//     ],
//     headers: {
//         'X-Entity-Ref-ID': '123456789',
//     },
//     tags: [
//         {
//             name: 'category',
//             value: 'confirm_email',
//         },
//     ],
// });