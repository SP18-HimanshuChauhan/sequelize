const path = require('path');
const db = require(path.resolve('./models/index'));
const User = db.User
const { Op } = require("sequelize");

//========================================GET/GET-ALL-USERS===============================================================//

const getAllUsersByProvince = async function (req, res) {
    try {

        let data = req.query
        const { province, userClass } = data
        const whereOptions = {}
        whereOptions["province"] = province
        // whereOptions["userClass"] = userClass

        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) ? Number(req.query.limit) : 10;
        let offset = (page - 1) * limit


        let userAttributes = ['id', 'first_name', 'last_name', 'display_name', 'email', 'phone', 'date_of_birth', 'nationality', 'province', 'city']


        if (("userClass") in data) {

            whereOptions['name'] = name

            let findUsersByFilters = await User.findAll({
                attributes: userAttributes,
                include: { model: School, as: 'schools', where: whereOptions, required: true },
                $sort: { id: 1 }, offset: offset, limit: limit,
            })

            if (!findUsersByFilters.length) return res.status(404).send({ status: "success", message: "No users found as per the filters applied" })

            return res.status(200).send({ status: "success", message: "Users:", users_count: findUsersByFilters.length, data: findUsersByFilters })
        }

        if (Object.keys(req.query).length > 0) {

            let findUsersByFilter = await User.findAll({
                attributes: userAttributes, where: whereOptions, $sort: { id: 1 },
                offset: offset, limit: limit, required: true
            })

            if (findUsersByFilter.length === 0)
                return res.status(404).send({ status: "success", message: "No Users found as per the province enetered" })

            return res.status(200).send({ status: "success", message: "Users as per the province entered:", users_count: findUsersByFilter.length, data: findUsersByFilter })

        } else {

            const userData = await User.findAll({ attributes: userAttributes })

            if (userData.length === 0) {
                return res.status(422).send({ status: "success", message: "No Users Found....." });
            }
            return res.status(200).send({ status: "success", message: 'All Users details:', users_count: userData.length, data: userData })
        }

    } catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: "error", msg: "Something went wrong Please check back again" })
    }
};

module.exports = {
    getAllUsersByProvince,
};