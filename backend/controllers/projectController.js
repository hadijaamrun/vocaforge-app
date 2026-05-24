const Project = require('../models/Project');

const getProjects = async (req, res) => {
  try {
    const { category, user } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (user) query.user = user;

    const projects = await Project.find(query).populate('user', 'name').sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('user', 'name');
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Karya tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, description, category, imageUrl } = req.body;
    const project = new Project({
      user: req.user._id, 
      title,
      description,
      category,
      imageUrl
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Karya tidak ditemukan' });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Anda tidak memiliki otorisasi untuk mengedit karya ini' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Karya tidak ditemukan' });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Anda tidak memiliki otorisasi untuk menghapus karya ini' });
    }

    await project.deleteOne(); 
    res.json({ message: 'Karya berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };