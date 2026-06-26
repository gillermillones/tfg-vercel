import React from 'react';
import LikeButton from './like-button';

interface HeaderProps {
  title?: string;
}

function Header({ title }: HeaderProps): React.ReactElement {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage(): React.ReactElement {
  const names: string[] = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

  return (
    <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <LikeButton />
    </div>
  );
}