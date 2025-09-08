import catchAsync from '../../utils/catchAsync';
import { getSinglePdfUrl } from '../../utils/getFileUrl';
import sendResponse from '../../utils/sendResponse';
import { JobApplicationServices } from './job-application.service';

const createJobApplication = catchAsync(async (req, res) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const applyData: {
    resume?: string | null;
    coverLetter?: string | null;
  } = {};

  if (files && files['resume'] && files['resume'][0]) {
    applyData.resume = getSinglePdfUrl(req, files['resume'][0]);
  }

  if (files && files['coverLetter'] && files['coverLetter'][0]) {
    applyData.coverLetter = getSinglePdfUrl(req, files['coverLetter'][0]);
  }

  const response = await JobApplicationServices.createJobApplicationIntoDB({
    ...req.body,
    ...applyData,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Job application submitted successfully',
    data: response,
  });
});

const getJobApplications = catchAsync(async (req, res) => {
  const { meta, data } = await JobApplicationServices.getJobApplicationsFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job applications retrieved successfully',
    meta,
    data,
  });
});

const getJobApplication = catchAsync(async (req, res) => {
  const response = await JobApplicationServices.getJobApplicationFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job application retrieved successfully',
    data: response,
  });
});

const updateJobApplication = catchAsync(async (req, res) => {
  const resumeUrl = req.file ? getSinglePdfUrl(req, req.file) : null;

  const response = await JobApplicationServices.updateJobApplicationIntoDB(
    req.params.id,
    {
      ...req.body,
      resume: resumeUrl,
    },
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job application updated successfully',
    data: response,
  });
});

const deleteJobApplication = catchAsync(async (req, res) => {
  const response = await JobApplicationServices.deleteJobApplicationFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job application deleted successfully',
    data: response,
  });
});

const getJobApplicationsByJobCircular = catchAsync(async (req, res) => {
  const { meta, data } =
    await JobApplicationServices.getJobApplicationsByJobCircularFromDB(
      req.params.jobCircularId,
      req.query,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job applications by job circular retrieved successfully',
    meta,
    data,
  });
});

const exportJobApplicationsByJobCircular = catchAsync(async (req, res) => {
  const response =
    await JobApplicationServices.exportJobApplicationsByJobCircularFromDB(
      req.params.id,
    );

  if (!response) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'No job applications found for this job circular',
    });
  }

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=job_applications.csv');
  res.status(200).send(response);
});

export const JobApplicationController = {
  createJobApplication,
  getJobApplications,
  getJobApplication,
  updateJobApplication,
  deleteJobApplication,
  getJobApplicationsByJobCircular,
  exportJobApplicationsByJobCircular,
};
