// importing required packages and modules
const mongoose = require('mongoose');

// importing required models
const Attendance = require('../models/attendance.model');

// It calculates
// 1 -> minutes a person with specified Id has worked,
// 2 -> number of days he appeared,
// 3 -> days he appeared
// 4 -> _id of person as stored in "users" collection
// 5 -> name of person as stpred in "users" collection
// 6 -> salaryPerMinute of person as stpred in "users" collection
// and finally
// 7 -> total salary based on number of minutes worked within specific time period
const myTimeSheet = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { lte, gte, message } = req.body;
    // if user himself or admin is logged in => then return thr results
    // => else return status of 500 "Not Authorized"
    if (req.user.id === userId || req.user.admin === true) {
      // write mongodb aggregation pipeline query to fetch and calculate results
      const results = await Attendance.aggregate([
        {
          // stage 1 -> find all those documents with given user id
          // and within given time span
          $match: {
            user: mongoose.Types.ObjectId(userId),
            arrivalTime: {
              $lte: new Date(lte),
              $gte: new Date(gte),
            },
          },
        },
        // stage 2 -> group the documents based on their user ids
        {
          $group: {
            _id: '$user',
            numOfDaysAppeared: { $sum: 1 },
            timeWorked: {
              $sum: {
                $subtract: [
                  // '$departureTime',
                  {
                    $cond: {
                      // if: [{ $type: '$departureTime' }, 'missing'],
                      if: { $ne: [{ $type: '$departureTime' }, 'missing'] },
                      then: '$departureTime',
                      else: '$$NOW',
                    },
                  },
                  '$arrivalTime',
                ],
              },
            },
            daysAppeared: { $addToSet: '$arrivalTime' },
          },
        },
        // stage 3 -> find relative object in "users" collection
        // based on "user" fields stored in "workdurations" collection
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'user',
          },
        },
        // stage 4 -> calculate & append some new fields to the result
        {
          $project: {
            minutesWorked: {
              $divide: [{ $divide: ['$timeWorked', 1000] }, 60],
            }, // 1 & true can be used interchangebly
            numOfDaysAppeared: 1, // 1 means: include the "count" filed in result
            user: { $arrayElemAt: ['$user', 0] },
            daysAppeared: 1,
          },
        },
        // stage 5 -> calculate & append "totalSalary" and some other fields from user object
        {
          $project: {
            _id: '$user._id',
            name: '$user.name',
            salaryPerMinute: '$user.salaryPerMinute',
            minutesWorked: 1,
            daysAppeared: 1,
            numOfDaysAppeared: 1,
            totalSalary: {
              $multiply: ['$minutesWorked', '$user.salaryPerMinute'],
            },
          },
        },
      ]);

      if (results.length < 1) {
        return res.status(200).json({ message });
      }

      res.status(200).json(results);
    } else {
      res.status(500).json({ message: 'Not Authorized' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const timeSheet = async (req, res, next) => {
  try {
    const { userIds, lte, gte, message } = req.body;

    // convert user ids array into "objectId" type
    let objectUserIds = userIds.map((userId) => {
      return mongoose.Types.ObjectId(userId);
    });

    // write mongodb aggregation pipeline query to fetch and calculate results
    const results = await Attendance.aggregate([
      // stage 1 -> find all those documents with given user ids
      // and within given time span
      {
        $match: {
          user: {
            $in: objectUserIds,
          },
          arrivalTime: {
            $lte: new Date(lte),
            $gte: new Date(gte),
          },
        },
      },
      // stage 2 -> group the documents based on their user ids
      {
        $group: {
          _id: '$user',
          numOfDaysAppeared: { $sum: 1 },
          timeWorked: {
            $sum: {
              $subtract: [
                {
                  $cond: {
                    if: { $ne: [{ $type: '$departureTime' }, 'missing'] },
                    then: '$departureTime',
                    else: '$$NOW',
                  },
                },
                '$arrivalTime',
              ],
            },
          },
          daysAppeared: { $addToSet: '$arrivalTime' },
        },
      },
      // stage 3 -> find relative object in "users" collection
      // based on "user" fields stored in "workdurations" collection
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      // stage 4 -> calculate & append some new fields to the result
      {
        $project: {
          minutesWorked: {
            $divide: [{ $divide: ['$timeWorked', 1000] }, 60],
          }, // 1 & true can be used interchangebly
          numOfDaysAppeared: 1, // 1 means: include the "count" filed in result
          user: { $arrayElemAt: ['$user', 0] },
          daysAppeared: 1,
        },
      },
      // stage 5 -> calculate & append "totalSalary" and some other fields from user object
      {
        $project: {
          _id: '$user._id',
          name: '$user.name',
          salaryPerMinute: '$user.salaryPerMinute',
          minutesWorked: 1,
          daysAppeared: 1,
          numOfDaysAppeared: 1,
          totalSalary: {
            $multiply: ['$minutesWorked', '$user.salaryPerMinute'],
          },
        },
      },
    ]);

    if (results.length < 1) {
      return res.status(200).json({ message });
    }

    res.status(200).json({ count: results.length, results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  timeSheet,
  myTimeSheet,
};
