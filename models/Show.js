var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Show = new keystone.List('Show', {
    autokey: { path: 'slug', from: 'eventDate venue location', unique: true },
    map: { name: 'title' },
    defaultSort: 'eventDate'
});

Show.add({
    eventDate: { type: Types.Datetime, default: Date.now, format: "M-DD-YY", index: true },
    venue: { type: String, required: true, default: "Yo Mama's House" },
    location: { type: String, required: true, default: "San Francisco, CA" },
    title: { type: String, required: true },

    ticketLink: String,
    socialLink: String,

    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
    author: { type: Types.Relationship, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    publishedAt: Date,
    image: { type: Types.CloudinaryImage },
    content: {
        extended: { type: Types.Html, wysiwyg: true, height: 400 }
    }
});

Show.defaultColumns = 'eventDate|10%, venue|15%, title|25%, location|15%, state|10%, author|15%, publishedAt|10%';
Show.register();
