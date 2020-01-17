module.exports = app => {

    const {User} = app.config.mongooseModels

    const getAuthor = async (req, res) => {
        const _id = req.params.id

        const user = await User.findOne({_id})

        if(user) user.password = ''

        return res.json(user)
    }

    return {getAuthor}
}