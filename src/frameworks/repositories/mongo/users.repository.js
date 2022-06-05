const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const entityName = 'User';

const {
  schemas: { user: userSchema },
} = require('../../database/mongo');

const repository = () => {
  // Schema
  const User = mongoose.model(entityName, userSchema);
  // CRUD executables
  return {
    add: async (user) => {
      const mongoObject = new User(user);
      return mongoObject.save();
    },
    update: async (user) => {
      const { id } = user;
      delete user.id;
      return User.findByIdAndUpdate(
        id,
        {
          ...user,
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      ).lean();
    },
    delete: async (user) => {
      const { id } = user;
      delete user.id;
      return User.findByIdAndUpdate(
        id,
        {
          deletedAt: new Date(),
        },
        {
          new: true,
        },
      ).lean();
    },
    getById: async (id) => {
      return await User.aggregate([
        {
          $match: {
            _id: ObjectId(id),
            deletedAt: {
              $exists: false,
            },
          },
        },
        {
          $lookup: {
            from: 'logs',
            localField: '_id',
            foreignField: 'userId',
            as: 'logs',
          },
        },
      ]);
    },
  };
};

module.exports = repository();
