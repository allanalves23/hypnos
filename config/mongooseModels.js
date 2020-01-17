const MyDate = require('./Date')

module.exports = app => {

    // Schema para os artigos
    const article = new app.mongoose.Schema({
        _id: {type: app.mongoose.Schema.ObjectId, auto: true},
        author: Object,
        title: String,
        theme: Object,
        category: Object,
        shortDescription: String,
        longDescription: String,
        textArticle: String,
        smallImg: String,
        mediumImg: String,
        bigImg: String,
        customURL: {type: String, unique: true},
        viewsCounter: Number,
        rating: Number,
        sharesCounter: Number,
        likesCounter: Number,
        dislikesCounter: Number,
        createdAt: Date,
        updatedAt: Date,
        publishAt: Date,
        published: Boolean,
        boosted: Boolean,
        deleted: Boolean,
        inactivated: Boolean
    })
    
    const Article = app.mongoose.model('articles', article)



    //Schema para os temas dos artigos
    const theme = new app.mongoose.Schema({
        _id: {type: app.mongoose.Schema.ObjectId, auto: true},
        name: {type: String, unique: true},
        alias: String,
        description: String,
        state: String
    })
    
    const Theme = app.mongoose.model('themes', theme)
    


    // Schema para os comentários dos artigos
    const comment = new app.mongoose.Schema({
        _id: {type: app.mongoose.Schema.ObjectId, auto: true},
        article: Object,
        userName: String,
        userEmail: String,
        comment: String,
        confirmed: {type: Boolean, default: false},
        readed: {type: Boolean, default: false},
        answerOf: {type: Object, default: null},
    },{
        timestamps: {
            createdAt: 'created_at'
        }
    })

    const Comment = app.mongoose.model('comments', comment)


    
    // Schema para as visualizações dos artigos
    const view = new app.mongoose.Schema({
        _id: {type: app.mongoose.Schema.ObjectId, auto: true},
        reader: String,
        startRead: Date,
        article: Object,
        viewsQuantity: {type: Number, default: 1}
    })

    const View = app.mongoose.model('views', view)



    const like = new app.mongoose.Schema({
        _id: {type: app.mongoose.Schema.ObjectId, auto: true},
        reader: String,
        article: Object,
        confirmed: Boolean
    },{
        timestamps: {
            createdAt: 'created_at'
        }
    })

    const Like = app.mongoose.model('likes', like)

    
    // Schema para os usuários do sistema. Tanto administradores e autores
    const user = new app.mongoose.Schema({
        _id: {type: app.mongoose.Schema.ObjectId, auto: true},
        name: String,
        gender: String,
        birthDate: Date,
        profilePhoto: String,
        instagram: String,
        twitter: String,
        github: String,
        youtube: String,
        cpf: {type: String, unique: true},
        email: {type: String, unique: true},
        telphone: {type: String, unique: true},
        celphone: {type: String, unique: true},
        address: String,
        number: Number,
        password: String,
        deleted: Boolean,
        expireToken: String,
        rescuePassword: String,
        tagAdmin: String,
        occupation: String,
        especiality: String,
        tagAuthor: String,
    },{
        timestamps: {
            createdAt: 'created_at'
        }
    })

    const User = app.mongoose.model('users', user)

    return { Article, Theme, Comment, View, Like, User }
}