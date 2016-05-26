
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * User schema
 */

var UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '', unique: true },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' }
});

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() { return this._password });

UserSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */
   load: function (options, cb) {
      options.select = options.select;
      this.findOne(options.criteria)
        .select(options.select)
        .exec(cb);
    },
    create: function(data, callback) {
        var user = new this(data);
        user.save(callback);
    },
    get: function(id, callback) {
        this.findOne(id, callback);
    }
}



/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
})

var validatePresenceOf = function (value) {
  return value && value.length;
};

/**
 * Methods
 */

UserSchema.methods = {

  // skipValidation: function() {
  //   return ~oAuthTypes.indexOf(this.provider);
  // },

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
    if (!password){
      return '';
    } 
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
};
/**
 * Register
 */

var user = mongoose.model('User', UserSchema);
/** export schema */
module.exports = {
    User: user
};

