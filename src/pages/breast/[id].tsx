import { useState } from 'react';
import { Input, Button } from '../../components';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useUserContext } from '@/providers/userProvider';
import { ROUTER } from '@/lib/utils';

const HeartForm = () => {
  const Router = useRouter();
  const { user } = useUserContext();
  const patientId = Router.query.id;
  const [input, setInput] = useState(``);

  const submitForm = async (real: boolean) => {
    if (real) {
      const response = await axios.post(`/api/breast`, {
        data: `[${input}]`,
      });
      const result = response.data.result;
      await axios.post(`/api/sickness`, {
        name: `Breast Sickness`,
        description: `string`,
        doctor_supposition: `string`,
        doctor_name: user?.pseudo,
        doctor_email: user?.email,
        ai_supposition: parseInt(result[2]) > 5 ? `POSITIVE` : `NEGATIVE`,
        date: new Date().toISOString(),
        result,
        patientId: patientId,
      });
      Router.push(ROUTER.listCustomers);
    }
    const response = await axios.post(`/api/breast`, {
      data: `[17.99,10.38,122.8,1001,0.1184,0.2776,0.3001,0.1471,0.2419,0.07871,1.095,0.9053,8.589,153.4,0.006399,0.04904,0.05373,0.01587,0.03003,0.006193,25.38,17.33,184.6,2019,0.1622,0.6656,0.7119,0.2654,0.4601,0.1189]`,
    });
    const result = response.data.result;
    await axios.post(`/api/sickness`, {
      name: `Breast Sickness`,
      description: `string`,
      doctor_supposition: `string`,
      doctor_name: user?.pseudo,
      doctor_email: user?.email,
      ai_supposition: `POSITIVE`,
      date: new Date().toISOString(),
      result,
      patientId: patientId,
    });
    Router.push(ROUTER.listCustomers);
    console.log(`response :`, response);
    console.log(`FORM`);
  };

  return (
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-xl m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-8 mt-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Formulaire pour la recherche de cancer du foetus
        </h1>
        <p>
          Afin d'obtenir les meilleurs resultats possibles merci de rentrer les
          informations suivantes separer d'une virgule:
          "radius_mean","texture_mean","perimeter_mean","area_mean",
          "smoothness_mean","compactness_mean","concavity_mean",
          "concave points_mean","symmetry_mean","fractal_dimension_mean",
          "radius_se","texture_se","perimeter_se","area_se",
          "smoothness_se","compactness_se","concavity_se",
          "concave points_se","symmetry_se","fractal_dimension_se",
          "radius_worst","texture_worst","perimeter_worst",
          "area_worst","smoothness_worst","compactness_worst",
          "concavity_worst","concave points_worst","symmetry_worst",
          "fractal_dimension_worst",
        </p>
        <div className="flex flex-col justify-center items-center">
          <Input
            placeholder="VALEUR"
            onChange={(value) => setInput(value)}
            value={input}
            type="string"
            required
          />
          <div>
            <Button
              label="Remplissage de test"
              onClick={() => submitForm(false)}
            />
          </div>
          <div className="p-4">
            <Button
              label="Analyser les resultats"
              onClick={() => submitForm(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartForm;
