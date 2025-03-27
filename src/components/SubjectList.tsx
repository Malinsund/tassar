import React from "react";

interface Subject {
  id: string;
  title: string;
}

const SubjectList: React.FC<{
  subjects: Subject[];
  onSelect: (subjectId: string) => void;
}> = ({ subjects, onSelect }) => {
  return (
    <div className="bg-cyan-300 p-4">
      <h1 className="text-2xl font-bold">Ämnen</h1>
      <ul>
        {subjects.map((subject) => (
          <li
            key={subject.id}
            onClick={() => onSelect(subject.id)}
            className="cursor-pointer p-2 hover:bg-cyan-400"
          >
            {subject.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectList;
