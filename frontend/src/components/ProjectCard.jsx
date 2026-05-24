import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

const ProjectCard = ({ project }) => {
  const defaultImage = "https://placehold.co/600x400/e0e0e0/555555?text=No+Image+Available";

  const hasValidImage = project.imageUrl && 
                        typeof project.imageUrl === 'string' && 
                        project.imageUrl.startsWith('http');

  return (
    <Link to={`/project/${project._id}`} className="project-card">
      <img 
        src={hasValidImage ? project.imageUrl : defaultImage} 
        alt={project.title} 
        className="project-img" 
      />
      <div className="project-info">
        <span className="project-category">{project.category}</span>
        <h3 className="project-title">{project.title}</h3>
        
        <div className="project-author">
          <FiUser /> {project.user?.name || 'Siswa Anonim'}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;