/* 

Run this script:

node --experimental-modules create.mjs

*/
import YAML from 'yamljs';
import fetch from 'node-fetch';

const surveyJSON = YAML.load('./survey.yaml');
const questionJSON = YAML.load('./question.yaml');

const createFormURL = 'https://api.typeform.com/forms';
const token = 'EjgEahVHbf3ttJhHJuAFJVAnNAbUipmfquAUDCijz6Ly';

const timestamp = new Date();

json.title = `State of JavaScript 2018_${timestamp.getMonth() + 1}/${timestamp.getDate()}_${timestamp.getHours()}:${timestamp.getMinutes()}`;

fetch(createFormURL, { method: 'POST', body: JSON.stringify(surveyJSON), headers: { authorization: `bearer ${token}` } })
  .then(res => res.json())
  .then(json => console.log(json));