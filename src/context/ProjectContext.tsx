'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BusinessCanvasProject, Trend, SecondaryOpportunity, InnovationSuggestion } from '@/types';
import { Storage, INITIAL_PROJECT } from '@/lib/storage';

interface ProjectContextType {
  projects: BusinessCanvasProject[];
  activeProject: BusinessCanvasProject | null;
  setActiveProject: (proj: BusinessCanvasProject | null) => void;
  createProject: (name: string, category: BusinessCanvasProject['category'], description: string) => BusinessCanvasProject;
  updateActiveProject: (updated: BusinessCanvasProject) => void;
  deleteProject: (id: string) => void;
  attachTrend: (trend: Trend) => void;
  attachOpportunity: (opp: SecondaryOpportunity) => void;
  attachInnovation: (inno: InnovationSuggestion) => void;
  lastSavedTime: string | null;
  refreshProjects: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<BusinessCanvasProject[]>([INITIAL_PROJECT]);
  const [activeProject, setActiveProject] = useState<BusinessCanvasProject | null>(null);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  useEffect(() => {
    const loaded = Storage.getProjects();
    setProjects(loaded);
    if (loaded.length > 0) {
      setActiveProject(loaded[0]);
    }
  }, []);

  const refreshProjects = () => {
    const loaded = Storage.getProjects();
    setProjects(loaded);
    if (activeProject) {
      const refreshedActive = loaded.find((p) => p.id === activeProject.id);
      if (refreshedActive) setActiveProject(refreshedActive);
    }
  };

  const createProject = (
    name: string,
    category: BusinessCanvasProject['category'],
    description: string
  ): BusinessCanvasProject => {
    const created = Storage.createProject(name, category, description);
    setProjects(Storage.getProjects());
    setActiveProject(created);
    setLastSavedTime(new Date().toLocaleTimeString('id-ID'));
    return created;
  };

  const updateActiveProject = (updated: BusinessCanvasProject) => {
    const saved = Storage.saveProject(updated);
    setActiveProject(saved);
    setProjects(Storage.getProjects());
    setLastSavedTime(new Date().toLocaleTimeString('id-ID'));
  };

  const deleteProject = (id: string) => {
    Storage.deleteProject(id);
    const updated = Storage.getProjects();
    setProjects(updated);
    if (activeProject?.id === id) {
      setActiveProject(updated.length > 0 ? updated[0] : null);
    }
  };

  const attachTrend = (trend: Trend) => {
    if (!activeProject) {
      const newProj = Storage.createProject(`Proyek Riset: ${trend.name}`, trend.category, trend.shortDescription);
      Storage.attachTrendToProject(newProj.id, trend);
      refreshProjects();
      setActiveProject(Storage.getProjectById(newProj.id) || null);
    } else {
      Storage.attachTrendToProject(activeProject.id, trend);
      refreshProjects();
    }
    setLastSavedTime(new Date().toLocaleTimeString('id-ID'));
  };

  const attachOpportunity = (opp: SecondaryOpportunity) => {
    if (!activeProject) {
      const newProj = Storage.createProject(opp.businessConcept, opp.category, opp.productIdea);
      Storage.attachOpportunityToProject(newProj.id, opp);
      refreshProjects();
      setActiveProject(Storage.getProjectById(newProj.id) || null);
    } else {
      Storage.attachOpportunityToProject(activeProject.id, opp);
      refreshProjects();
    }
    setLastSavedTime(new Date().toLocaleTimeString('id-ID'));
  };

  const attachInnovation = (inno: InnovationSuggestion) => {
    if (!activeProject) {
      const newProj = Storage.createProject(inno.title, 'Emerging Business Models', inno.description);
      Storage.attachInnovationToProject(newProj.id, inno);
      refreshProjects();
      setActiveProject(Storage.getProjectById(newProj.id) || null);
    } else {
      Storage.attachInnovationToProject(activeProject.id, inno);
      refreshProjects();
    }
    setLastSavedTime(new Date().toLocaleTimeString('id-ID'));
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeProject,
        setActiveProject,
        createProject,
        updateActiveProject,
        deleteProject,
        attachTrend,
        attachOpportunity,
        attachInnovation,
        lastSavedTime,
        refreshProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
