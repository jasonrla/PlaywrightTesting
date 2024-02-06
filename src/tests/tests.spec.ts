import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import { LanguageKey } from '../utils/utils';
import { config }  from '../utils/configLoader';

test('Capturar language en una variable', async ({page}) => {
 
  const loginPage = new LoginPage(page, 'english' as LanguageKey);
  const locale = test.info().project.name;

  //console.log(locale);
  //console.log(test.info().project.use.locale);
  //console.log(test.info().project.use.timezoneId);

  await loginPage.login(config.userData.username, config.userData.password);

  
});

