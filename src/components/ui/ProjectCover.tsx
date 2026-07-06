import { ImageIcon } from 'lucide-react';
import { useState } from 'react';

type ProjectCoverProps = {
  src?: string;
  title: string;
  kind?: string;
  loading?: 'eager' | 'lazy';
  className?: string;
};

export function ProjectCover({ src, title, kind, loading = 'lazy', className = '' }: ProjectCoverProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className={`project-cover ${className}`}>
      {showImage ? (
        <img src={src} alt={`${title} project cover`} loading={loading} onError={() => setFailed(true)} />
      ) : (
        <div className="project-cover-fallback">
          <div className="project-cover-fallback__screen">
            <ImageIcon size={34} />
            <span>{title}</span>
          </div>
          {kind ? <small>{kind}</small> : null}
        </div>
      )}
    </div>
  );
}
