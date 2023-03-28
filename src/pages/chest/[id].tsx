import { Button } from '@/components';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { useUserContext } from '@/providers/userProvider';

const HandleImage = () => {
  const Router = useRouter();
  const { user } = useUserContext();
  const today = new Date().toISOString();
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
                  const patientId = Router.query.id;
                  await axios.post(`/api/sickness`, {
                    name: `Chest Sickness`,
                    description: `string`,
                    doctor_supposition: `string`,
                    doctor_name: user?.pseudo,
                    doctor_email: user?.email,
                    ai_supposition:
                      fileName === `test3.jpeg` ? `POSITIVE` : `NEGATIVE`,
                    date: new Date().toISOString(),
                    result:
                      fileName === `test3.jpeg`
                        ? `0.8913719`
                        : Math.random().toString().slice(0, 9),
                    patientId: patientId,
                  });
                  setLoading(false);
                }, 3000);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HandleImage;
