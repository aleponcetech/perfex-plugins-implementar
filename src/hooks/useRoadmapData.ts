import { useState, useEffect } from 'react';
import { Category, roadmapData } from '@/types/roadmap';

export const useRoadmapData = () => {
  const [categories, setCategories] = useState<Category[]>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('perfex-roadmap-data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing saved roadmap data:', error);
      }
    }
    return roadmapData;
  });

  // Save to localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem('perfex-roadmap-data', JSON.stringify(categories));
  }, [categories]);

  const togglePlugin = (categoryId: string, pluginIndex: number) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              plugins: category.plugins.map((plugin, index) =>
                index === pluginIndex
                  ? { ...plugin, completed: !plugin.completed }
                  : plugin
              )
            }
          : category
      )
    );
  };

  const resetData = () => {
    setCategories(roadmapData);
    localStorage.removeItem('perfex-roadmap-data');
  };

  return {
    categories,
    togglePlugin,
    resetData
  };
};