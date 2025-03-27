import React from "react";

interface Response {
  id: string;
  userId: string;
  content: string;
  username: string;
}

const ResponseList: React.FC<{ responses: Response[] }> = ({ responses }) => {
  return (
    <div className="bg-yellow-300 p-4">
      <h1 className="text-2xl font-bold">Inlägg</h1>
      <ul>
        {responses.map((response) => (
          <li key={response.id} className="p-2 border-b">
            <strong>{response.username}:</strong> {response.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResponseList;
