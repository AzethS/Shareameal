const database = require("./database.service")
const logger = require("../helpers/log")
const bcrypt = require('bcrypt')
class User {
        async create(user) {
            /**
             * @param user.firstName - the surname of a user
             * @param user.lastName - the last name of a user
             * @param user.email - the emailaddress of the user
             * @param user.studentNumber - the studentnumber of a user
             * @param user.password - the password of a user
             */
        const result =  await database.execute(
            "INSERT INTO `user` (`First_Name`, `Last_Name`, `Email`, `Student_Number`, `Password`) VALUES (?, ?, ?, ?, ?)",
            [
               user.firstName,
               user.lastName,
               user.email,
               user.studentNumber,
               await bcrypt.hash(user.password, 10)
            ])
            logger.info(`[DB user] create`)
        return await this.findOne(result.insertId)
    }

    /**
     * @param id - the id of a user
     */
    async findOne(id) {
        return await database.execute("SELECT First_Name, Last_Name, Email, Student_Number, ID FROM `user` WHERE ID = ?", [id])

    }

    async findByEmail(email) {
        return await database.execute("SELECT * FROM `user` WHERE Email = ?", [email])
        
    }

}

module.exports = new User()