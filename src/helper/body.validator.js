module.exports = class BodyValidator {
    constructor(_types) {
        this.types = _types
        this.errors = []
    }

    validate(_body) {

        for (let key in this.types) {

            if (_body[key] === undefined) {
                this.errors.push(`${key} is required`)
                continue
            }
            
            switch(this.types[key].toLowerCase()) {
                case "zipcode":
                    this._validateZipcode(_body[key], key)
                    continue;
                case "date":
                    this._validateDate(_body[key], key)
                    continue;
                case "phonenumber":
                    this._validatePhoneNumber(_body[key], key)
                    continue;
                case "email":
                    this._validateEmail(_body[key], key)
                    continue;

            }

            if (this.types[key].toLowerCase() !== _body[key].constructor.name.toLowerCase()) {
                this._errorIncorrectType(key, this.types[key])
                // this.errors.push(`${key} must be a ${this.types[key]}`)
            }
        }

        return this.errors.length ? false : true
    }

    _validateZipcode(zipcode, property = "zipcode") {
        if(/^[1-9][0-9]{3} ?[A-Z]{2}$/.test(zipcode) === false) {
            this._errorIncorrectType(property, "zipcode")
        }
    }

    _validatePhoneNumber(phoneNumber, property = "phoneNumber") {
        if(phoneNumber.length !== 10 && isNaN(Number(phoneNumber))) {
            this._errorIncorrectType(property, "phoneNumber")
        }
    }

    _validateDate(dateString, property = "date") {
        const date = new Date(dateString)

        if (isNaN(date.getTime())) {
            this._errorIncorrectType(property, "date")
        }
    }

    _validateEmail(email, property = "email") {
        const regex = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
        if(regex.test(email) === false) {
            this._errorInccorectType(property, "email")
        }
    }

    _errorIncorrectType(property, type) {
        this.errors.push(`${property} must be of type ${type.toLowerCase()}`)
    }

}