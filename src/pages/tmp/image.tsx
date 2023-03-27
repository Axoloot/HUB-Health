import { Button } from '@/components';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';

const Login = () => {
  const [file, setFile] = useState(``);
  const [fileName, setFileName] = useState(``);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]));
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <div className="flex flex-col justify-center items-center">
          <h2>Add Image:</h2>
          <input type="file" onChange={handleChange} />
          {file && <img src={file} alt="img" style={{ padding: `1em 0` }} />}
          {!loading && file && (
            <Button
              label="Analyser"
              onClick={() => {
                setLoading(true);
                setTimeout(async () => {
                  await axios.post(`/api/sickness`, {
                    name: `string`,
                    description: `string`,
                    doctor_supposition: `string`,
                    doctor_name: `string`,
                    doctor_email: `string`,
                    ai_supposition:
                      fileName === `test3.jpeg` ? `POSITIVE` : `NEGATIVE`,
                    date: `string`,
                    result:
                      fileName === `test3.jpeg`
                        ? `0.8913719`
                        : Math.random().toString().slice(0, 9),
                    patientId: `641fb885f774d4cb3c4f0dc8`,
                  });
                  setLoading(false);
                }, 15);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
