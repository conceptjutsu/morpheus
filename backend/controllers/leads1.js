const Lead = require('../models/lead');
const APIFeatures = require('../utilities/features');

exports.getAllLeads = async (req, res) => {
  try {
    //EXECUTE QUERY
    const features = new APIFeatures(Lead.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

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
