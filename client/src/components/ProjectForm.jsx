import { Plus, Trash2 } from "lucide-react";
import React from "react";

const ProjectForm = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: [],
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addPoint = (projectIndex) => {
    const updated = [...data];
    updated[projectIndex] = {
      ...updated[projectIndex],
      description: [...(updated[projectIndex].description || []), ""],
    };
    onChange(updated);
  };

  const removePoint = (projectIndex, pointIndex) => {
    const updated = [...data];
    updated[projectIndex] = {
      ...updated[projectIndex],
      description: updated[projectIndex].description.filter((_, i) => i !== pointIndex),
    };
    onChange(updated);
  };

  const updatePoint = (projectIndex, pointIndex, value) => {
    const updated = [...data];
    const points = [...updated[projectIndex].description];
    points[pointIndex] = value;
    updated[projectIndex] = { ...updated[projectIndex], description: points };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3>Project</h3>
            <p className="text-sm text-gray-500">Add your Project details</p>
          </div>
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
          >
            <Plus className="size-4" />
            Add Project
          </button>
        </div>
      </div>

      
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4>Project #{index + 1}</h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid  gap-3">
                <input
                  value={project.name || ""}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  type="text"
                  placeholder="Project Name"
                  className="px-3 py-2 text-sm rounded-lg"
                />
                <input
                  value={project.type || ""}
                  onChange={(e) =>
                    updateProject(index, "type", e.target.value)
                  }
                  type="text"
                  placeholder="Project Type"
                  className="px-3 py-2 text-sm  rounded-lg"
                />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Description Points</label>
                    <button
                      onClick={() => addPoint(index)}
                      className="flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                    >
                      <Plus className="size-3" />
                      Add Point
                    </button>
                  </div>

                  {(project.description || []).map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-center gap-2">
                      <input
                        value={point}
                        onChange={(e) => updatePoint(index, pointIndex, e.target.value)}
                        type="text"
                        placeholder="Describe an achievement or responsibility..."
                        className="flex-1 px-3 py-2 text-sm rounded-lg"
                      />
                      <button
                        onClick={() => removePoint(index, pointIndex)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

    </div>
  );
};

export default ProjectForm;
