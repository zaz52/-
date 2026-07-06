import { useEffect, useMemo, useState } from 'react';
import { hydrateProjects, projects as fallbackProjects } from '../data/projects';
import type { ProjectRecord } from '../data/projectTypes';

export function useProjects() {
  const [records, setRecords] = useState<ProjectRecord[] | null>(null);

  useEffect(() => {
    let ignore = false;

    fetch('/api/projects')
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Failed to load projects')))
      .then((data: ProjectRecord[]) => {
        if (!ignore && Array.isArray(data) && data.length > 0) setRecords(data);
      })
      .catch(() => undefined);

    return () => {
      ignore = true;
    };
  }, []);

  return useMemo(() => records ? hydrateProjects(records) : fallbackProjects, [records]);
}
