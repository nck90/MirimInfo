// src/app/classes/page.tsx
"use client";

import React, { useEffect, useState } from 'react';

interface Class {
  id: string;
  name: string;
  teacherId: number;
}

const ClassesPage: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('/api/classes');  // API 경로에서 학급 정보 가져오기
        if (!response.ok) {
          throw new Error('Failed to fetch classes');
        }
        const data = await response.json();
        setClasses(data);  // 학급 데이터 설정
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      }
    };

    fetchClasses();
  }, []);

  return (
    <div>
      <h1>Classes</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {classes.map(cls => (
          <li key={cls.id}>
            {cls.name} (Teacher ID: {cls.teacherId})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassesPage;
