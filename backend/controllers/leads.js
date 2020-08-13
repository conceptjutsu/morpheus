const Lead = require('../models/lead');

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1a) Filtering

    /* use destructuring with the ... */
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 1b) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    // 2) Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limit() {
    // 3) Field Limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  pagination() {
    // 4) Pagination
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

exports.getAllLeads = async (req, res) => {
  try {
    //EXECUTE QUERY
    const features = new APIFeatures(Lead.find(), req.query)
      .filter()
      .sort()
      .limit()
      .pagination();

    const leads = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: leads.length,
      data: {
        leads
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      error
    });
  }
};

exports.getLead = async (req, res) => {
  try {
    // Lead.findOne({ _id: req.params.id })
    const lead = await Lead.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        lead
      }
    });

    console.log(req.params);
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Could not find a lead with that ID'
    });
  }
};

exports.createLead = async (req, res) => {
  try {
    // const newLead = new Lead({})
    // newLead.save()
    const newLead = await Lead.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        lead: newLead
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        lead
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(404).json({
      status: fail,
      message: 'Could not delete lead!'
    });
  }
};

exports.getLeadStats = async (req, res) => {
  try {
    const stats = await Lead.aggregate([
      {
        $match: { gender: { $lt: 1 } }
      },
      {
        group: {
          _id: null,
          avgGender: { $avg: '$gender' },
          avgProvince: { $avg: '$province' }
        }
      }
    ]);

    res.status(204).json({
      status: 'success',
      data: {
        stats
      }
    });

    console.log(stats);
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};

exports.getMonthlyReport = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Lead.aggregate([
      {
        $unwind: '$createdAt'
      },
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      }
    ]);

    res.status(204).json({
      status: 'success',
      data: {
        plan
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};
