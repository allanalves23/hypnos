module.exports = app => {

    /* Resource for public access */
    app.use('/public', app.express.static('public'))

    app.route('/articles')
        .get(app.api.articles.articles.get)
        .post(app.api.likes.likes.setLike)
    
    app.route('/articles/:resource')
        .get(app.api.articles.articles.getOne)

    app.route('/articles/relateds/:resource')
        .get(app.api.articles.articles.getRelateds)

    app.route('/comments/article')
        .post(app.api.comments.comments.sendComment)
        .get(app.api.comments.comments.get)

    app.route('/comments/answers/:id')
        .get(app.api.comments.comments.getAnswers)

    app.route('/themes')
        .get(app.api.themes.themes.get)

    app.route('/contact')
        .post(app.api.messages.messages.sendMessage)

    app.route('/authors/:id')
        .get(app.api.authors.authors.getAuthor)

}