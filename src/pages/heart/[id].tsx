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
  const [age, setAge] = useState(0);
  const [sexe, setSexe] = useState(1);
  const [cp, setCp] = useState(0);
  const [bps, setBps] = useState(0);
  const [chol, setChol] = useState(0);
  const [fbs, setFbs] = useState(0);
  const [restecg, setRestecg] = useState(0);
  const [thalach, setThalach] = useState(0);
  const [exang, setExang] = useState(0);
  const [oldpeak, setOldpeak] = useState(0);
  const [slope, setSlope] = useState(0);
  const [ca, setCa] = useState(0);
  const [thal, setThal] = useState(0);

  const submitForm = async (real: boolean) => {
    if (real) {
      const response = await axios.post(`/api/heart`, {
        data: `[${age},${sexe},${cp},${bps},${chol},${fbs},${restecg},${thalach},${exang},${oldpeak},${slope},${ca},${thal}]`,
      });
      const result = response.data.result;
      await axios.post(`/api/sickness`, {
        name: `Heart Sickness`,
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
    const response = await axios.post(`/api/heart`, {
      data: `[52,1,0,125,212,0,1,168,0,1,2,2,3]`,
    });
    const result = response.data.result;
    await axios.post(`/api/sickness`, {
      name: `Heart Sickness`,
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
          Formulaire pour la recherche de cancer du coeur
        </h1>
        <div className="flex flex-col justify-center items-center">
          <Input
            placeholder="Age"
            onChange={(value) => setAge(parseInt(value))}
            value={String(age)}
            type="string"
            required
          />
          <Input
            placeholder="Sexe"
            onChange={(value) => setSexe(value === `h` ? 1 : 0)}
            value={sexe === 1 ? `h` : `f`}
            type="string"
            required
          />
          <Input
            placeholder="chest pain type (1 = typical angina; 2 = atypical angina; 3 = non-anginal pain; 4 = asymptomatic)"
            onChange={(value) => setCp(parseInt(value))}
            value={String(cp)}
            type="string"
            required
          />
          <Input
            placeholder="resting blood pressure (in mm Hg on admission to the hospital)"
            onChange={(value) => setBps(parseInt(value))}
            value={String(bps)}
            type="string"
            required
          />
          <Input
            placeholder="serum cholestoral in mg/dl"
            onChange={(value) => setChol(value === `o` ? 1 : 0)}
            value={chol === 1 ? `o` : `n`}
            type="string"
            required
          />
          <Input
            placeholder="fasting blood sugar > 120 mg/dl (1 = true; 0 = false)"
            onChange={(value) => setFbs(parseInt(value))}
            value={String(fbs)}
            type="string"
            required
          />
          <Input
            placeholder="esting electrocardiographic results (0 = normal; 1 = having ST-T; 2 = hypertrophy)"
            onChange={(value) => setRestecg(parseInt(value))}
            value={String(restecg)}
            type="string"
            required
          />
          <Input
            placeholder="maximum heart rate achieved"
            onChange={(value) => setThalach(parseInt(value))}
            value={String(thalach)}
            type="string"
            required
          />
          <Input
            placeholder="exercise induced angina (1 = yes; 0 = no)"
            onChange={(value) => setExang(parseInt(value))}
            value={String(exang)}
            type="string"
            required
          />
          <Input
            placeholder="ST depression induced by exercise relative to rest"
            onChange={(value) => setOldpeak(parseInt(value))}
            value={String(oldpeak)}
            type="string"
            required
          />
          <Input
            placeholder="the slope of the peak exercise ST segment (1 = upsloping; 2 = flat; 3 = downsloping)"
            onChange={(value) => setSlope(parseInt(value))}
            value={String(slope)}
            type="string"
            required
          />
          <Input
            placeholder="number of major vessels (0-3) colored by flourosopy"
            onChange={(value) => setCa(parseInt(value))}
            value={String(ca)}
            type="string"
            required
          />
          <Input
            placeholder="3 = normal; 6 = fixed defect; 7 = reversable defect"
            onChange={(value) => setThal(parseInt(value))}
            value={String(thal)}
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
