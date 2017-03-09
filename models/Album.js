var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Album = new keystone.List('Album', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: 'releaseDate'
});

Album.add({
    title:        { type: String, required: true },
    type:         { type: String, default: "EP" },
    releaseDate:  { type: Types.Datetime, format: "MM-DD-YY", index: true },
    purchaseLink:   String,
    tracks:       { type: Types.TextArray },
    label:        { type: String, required: true, default: "Felte" },

    state:        { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
    author:       { type: Types.Relationship, ref: 'User' },
    createdAt:    { type: Date, default: Date.now },
    publishedAt:    Date,
    image:        { type: Types.CloudinaryImage }
});

Album.defaultColumns = 'title, type, label, releaseDate';
Album.register();
