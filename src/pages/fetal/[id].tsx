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
      const response = await axios.post(`/api/fetal`, {
        data: `[${input}]`,
      });
      const result = response.data.result;
      await axios.post(`/api/sickness`, {
        name: `Fetal Sickness`,
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
    const response = await axios.post(`/api/fetal`, {
      data: `[52,1,0,125,212,0,1,168,0,1,2,2,3]`,
    });
    const result = response.data.result;
    await axios.post(`/api/sickness`, {
      name: `Fetal Sickness`,
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
          accelerations,fetal_movement,uterine_contractions,light_decelerations,
          severe_decelerations,prolongued_decelerations,abnormal_short_term_variability,
          mean_value_of_short_term_variability,
          percentage_of_time_with_abnormal_long_term_variability
          ,mean_value_of_long_term_variability,histogram_width,
          histogram_min,histogram_max,histogram_number_of_peaks,
          histogram_number_of_zeroes,histogram_mode,histogram_mean,
          histogram_median,histogram_variance,histogram_tendency,fetal_health
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
